// src/navigation/location.js

// Importation des dépendances nécessaires
import { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Button, ScrollView } from 'react-native';
import locationStyle from '../styles/locationStyle';
//import { getUserLocations, deleteLocation } from '../utils/fileManager';
import { AuthContext } from '../contexts/AuthContext';

// Composant représentant l'écran de gestion des locations
function LocationScreen({ route, navigation }) {
  const { userId } = useContext(AuthContext);

  // État pour stocker les locations de l'utilisateur
  const [locations, setLocations] = useState([]);

  // État pour afficher ou masquer le bouton de suppression
  const [showDeleteButton, setShowDeleteButton] = useState(true);

  // Effet pour charger les locations de l'utilisateur
  useEffect(() => {
    const loadUserLocations = async () => {
      // Chargez les locations de l'utilisateur actuel (utilisez le userId du contexte)
      const userLocations = await getUserLocations(userId);
      setLocations(userLocations);
    };

    // Appel de la fonction de chargement
    loadUserLocations();
  }, [userId]);

  // Effet pour ajouter une nouvelle location à la liste
  useEffect(() => {
    if (route.params?.locationTitle && !locations.includes(route.params?.locationTitle)) {
      setLocations(prev => [...prev, route.params?.locationTitle]);
    }
  }, [route.params?.locationTitle]);

  // Fonction pour gérer la suppression d'une location
  const handleDeleteLocation = async (item) => {
    console.log("Emplacement supprimé :", item.title);
    try {
      // Supprimer l'élément du fichier JSON
      await deleteLocation(item.id);

      // Mettre à jour la liste des locations (en excluant l'élément supprimé)
      setLocations((prevLocations) => prevLocations.filter((location) => location.id !== item.id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'emplacement", error);
    }
  };

  // Rendu du composant
  return (
    <View style={locationStyle.container}>
      <Button
        title="Ajouter une nouvelle location"
        onPress={() => {
          navigation.navigate('CreateLocation');
        }}
      />

      {/* Liste des locations */}
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <View style={locationStyle.listItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UiInterface');
                console.log("Location cliquée :", item.title);
              }}
            >
              <Text style={locationStyle.text}>{item.title}</Text>
            </TouchableOpacity>
            <View style={locationStyle.buttonsContainer}>
              <TouchableOpacity
                style={locationStyle.button}
                onPress={() => {
                  // Action de modification
                  // Vous pouvez naviguer vers la page de modification ici
                }}
              >
                <Text style={locationStyle.buttonText}>Modifier</Text>
              </TouchableOpacity>

              {/* Bouton de suppression */}
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

        // Fonction pour obtenir un identifiant unique pour chaque élément
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
      />
    </View>
  );
}

// Exportation du composant pour une utilisation dans d'autres fichiers
export default LocationScreen;
