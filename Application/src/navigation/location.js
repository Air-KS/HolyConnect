// src/navigation/location.js

// Importations nécessaires
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import locationStyle from '../styles/locationStyle';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LocationScreen({ route, navigation }) {
  const { userId, userPseudo } = useContext(AuthContext);
  const [locations, setLocations] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(true);

  // Fonction pour charger les locations en utilisant le token stocké
  const loadUserLocations = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error("Le token de l'utilisateur est absent ou vide.");
      return;
    }

    console.log("Page Mes Location ID:", userId, "- Username:", userPseudo, "- Token:", token)

    try {
      const response = await fetch(`http://192.168.1.17:3000/api/homelocation/getloc?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Locations chargées:', data);
        setLocations(data);
      } else {
        console.error('Erreur de statut:', response.status);
        const text = await response.text();
        console.error('Réponse brute:', text);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des emplacements:', error);
    }
  };

  // Fonction pour gérer la suppression d'une location
  const handleDeleteLocation = async (item) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error("Le token de l'utilisateur est absent ou vide.");
      return;
    }

    console.log("Tentative de suppression de la location avec l'ID:", item.id); // Ajouter ce log

    try {
      const response = await fetch(`http://192.168.1.17:3000/api/homelocation/deleteloc/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          //'Content-Type': 'application/json',
        },
        //body: JSON.stringify({ id: item.id }),
      });

      if (response.ok) {
        console.log(`Location avec ID ${item.id} supprimée.`);
        setLocations(prevLocations => prevLocations.filter(location => location.id !== item.id));
      } else {
        console.error('Erreur lors de la suppression:', await response.text());
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'emplacement:', error);
    }
  };

  // Effet pour charger les locations au démarrage
  useEffect(() => {
    loadUserLocations();
  }, [userId]);

  return (
    <View style={locationStyle.container}>
      <Button
        title="Ajouter une nouvelle location"
        onPress={() => navigation.navigate('CreateLocation')}
      />
      <Button
        title="Charger mes locations"
        onPress={loadUserLocations}
      />
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <View style={locationStyle.listItem}>
            <TouchableOpacity
              onPress={() => {
                console.log('Navigating to UiInterface with params:', {
                  adresslocation: item.adresslocation,
                  namelocation: item.namelocation,
                  infolocation: item.infolocation,
                });
                navigation.navigate('UiInterface', {
                  id: item.id,
                  adresslocation: item.adresslocation,
                  namelocation: item.namelocation,
                  infolocation: item.infolocation,
                });
              }}
            >
              <Text style={locationStyle.text}>{item.namelocation}</Text>
            </TouchableOpacity>
            <View style={locationStyle.buttonsContainer}>
            <Text style={locationStyle.buttonText}> ID: {item.id || 'Aucun ID'} </Text>
              {showDeleteButton && (
                <TouchableOpacity
                  style={locationStyle.button}
                  onPress={() => {
                    handleDeleteLocation(item);
                  }}
                >
                  <Text style={{ ...locationStyle.buttonText, color: 'red' }}>Supprimer</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
      />
    </View>
  );
}

export default LocationScreen;
