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

  // ID fictif pour la démonstration
  const FICTIVE_ID = "123ABC456";

  // Fonction pour gérer la soumission de la recherche
  const handleSearchSubmit = () => {
    if (searchID === FICTIVE_ID) {
      // Si l'ID est correct, naviguer vers l'écran 'ApLocation'
      navigation.navigate('ApLocation');
    } else {
      // Si l'ID est incorrect, afficher une alerte
      Alert.alert('Erreur', 'Votre Identifiant est incorrecte, merci de renseigner un ID Valable');
    }
  }

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
