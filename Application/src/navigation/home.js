// src/navigation/home.js

// Importation des dépendances nécessaires
import { View, ScrollView, Text, Image, TextInput, Alert, TouchableOpacity, } from 'react-native';
import { useState } from 'react';
import baseStyles from '../styles/baseStyle';
import searchStyles from '../styles/searchBar';
import scrollView from '../screens/scrollView';
import Footer from '../components/footer';

// Composant représentant l'écran d'accueil
function HomeScreen({ navigation }) {

  // État pour suivre la valeur de l'ID entré par l'utilisateur
  const [searchID, setSearchID] = useState('');

  // Fonction pour gérer la soumission de la recherche
  const handleSearchSubmit = async () => {
    const trimmedSearchID = searchID.trim();

    // Vérifier que l'ID n'est pas vide
    if (trimmedSearchID === "") {
        Alert.alert('Erreur', 'Veuillez entrer un ID.');
        return;
    }
    try {
        console.log(`Recherche en cours pour l'ID: ${trimmedSearchID}`);
        const response = await fetch(`http://192.168.1.17:3000/api/homelocation/getlocId/${trimmedSearchID}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Vérification de la réponse du serveur
        if (response.ok) {
          const data = await response.json();
          console.log('Data reçue de l\'API:', data);

          // Assurez-vous que data contient les informations de la location
          if (data && data.id) {
              navigation.navigate('UiInterface', {
                  id: data.id,
                  namelocation: data.namelocation,
                  adresslocation: data.adresslocation,
                  infolocation: data.infolocation,
              });
          } else {
              console.error('Format de données inattendu:', data);
          }
        } else {
          console.error('Erreur de statut:', response.status);
          Alert.alert('Erreur', 'ID non trouvé, veuillez vérifier et réessayer.');
        }
      } catch (error) {
        console.error('Erreur lors de la recherche de l’ID:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la recherche.');
      }
    };

  // Rendu du composant
  return (
    // Conteneur principal
    <ScrollView style={scrollView.scrollView}>

      {/* Section de recherche */}
      <View style={baseStyles.container}>
        {/* Barre de recherche */}
        <View style={searchStyles.container}>
          <TextInput
            style={searchStyles.input}
            placeholder="Entrez l'ID"
            value={searchID}
            onChangeText={setSearchID}
            maxLength={9}
            selectionColor="#264A4A"
            onSubmitEditing={handleSearchSubmit}
            keyboardType="default"
            autoCapitalize="characters"
          />
          {/* Bouton de recherche */}
          <TouchableOpacity style={searchStyles.button} onPress={handleSearchSubmit}>
            <Image source={require('../../assets/images/go.png')} style={searchStyles.image} />
          </TouchableOpacity>
        </View>

        {/* Image de localisation */}
        <View style={baseStyles.img}>
          <Image source={require('../../assets/images/Localisation.png')}
          style={{ width: 180, height: 180 }}
          resizeMode="contain" />
        </View>

        {/* Message de bienvenue */}
        <View style={baseStyles.textContainer}>
          <Text style={baseStyles.text}>
            BIENVENUE{"\n"}HOLBERTON SCHOOL{"\n"}{"\n"}
          </Text>
        </View>
      </View>

      {/* Pied de page */}
      <Footer />
    </ScrollView>
  );
}

// Exportation du composant pour une utilisation dans d'autres fichiers
export default HomeScreen;
