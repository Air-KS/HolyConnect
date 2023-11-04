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

  // Fonction pour modifier la location
  const handleUpdateLocation = async (item, newDetails) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error("Le token de l'utilisateur est absent ou vide.");
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.17:3000/api/homelocation/updateloc`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item.id,
          ...newDetails // Ici, tu devras passer les nouvelles informations à mettre à jour
        }),
      });

      if (response.ok) {
        // Mise à jour de l'état local après la mise à jour réussie
        setLocations(prevLocations =>
          prevLocations.map(location =>
            location.id === item.id ? { ...location, ...newDetails } : location
          )
        );
      } else {
        console.error('Erreur lors de la mise à jour:', await response.text());
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'emplacement:', error);
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

// Dans LocationScreen
useEffect(() => {
  if (route.params?.isEditing) {
    handleUpdateLocation({
      id: route.params.id,
      namelocation: route.params.namelocation,
      adresslocation: route.params.adresslocation,
      infolocation: route.params.infolocation,
    })
  }
}, [route.params]); // Dépendance à route.params.namelocation

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
                navigation.navigate('UiInterface', {adresslocation: item.adresslocation});
              }}
            >
              <Text style={locationStyle.text}>{item.namelocation}</Text>
            </TouchableOpacity>
            <View style={locationStyle.buttonsContainer}>
            <TouchableOpacity
              style={locationStyle.button}
              onPress={() => {
              // Directement naviguer et passer les paramètres nécessaires
              navigation.navigate('CreateLocation', {
                id: item.id, // Passer l'ID pour la mise à jour
                namelocation: item.namelocation,
                adresslocation: item.adresslocation,
                infolocation: item.infolocation,
                isEditing: true,
              });
            }}
            >
            <Text style={locationStyle.buttonText}>Modifier</Text>
            </TouchableOpacity>

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
