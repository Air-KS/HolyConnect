// src/navigation/homeScreen.js

// Importation des modules nécessaires
import { View, ScrollView, Text, Image, TextInput, Alert, TouchableOpacity, } from 'react-native';
import { useState } from 'react';
import stylesHomePage from '../styles/homePage';
import stylesScrollView from '../styles/scrollView';
import ScreenWrapper from '../components/screenWrapper';
import stylesBulText from '../styles/bulText';

// Composant représentant l'écran d'accueil
function HomeScreen({ navigation }) {

  const [searchID, setSearchID] = useState(''); // État pour suivre la valeur entrée
  const FICTIVE_ID = "123ABC456"; // ID fictif

  // Fonction pour gérer la soumission
  const handleSearchSubmit = () => {
    if (searchID === FICTIVE_ID) {
      navigation.navigate('Login'); // Redirige vers un autre écran si l'ID est correct
    } else {
      Alert.alert('Erreur', 'Votre Identifiant est incorrecte, merci de renseigner un ID Valable'); // Affiche une alerte si l'ID est incorrect
    }
  }

  // Rendu du composant
  return (

    <ScrollView style={stylesScrollView.scrollView} contentContainerStyle={stylesHomePage.contentContainer}>
    <ScreenWrapper>
      <View style={stylesHomePage.homePage}>
        <View style={stylesHomePage.search}>
          <View style={stylesHomePage.searchContainer}>
            <TextInput
              style={stylesHomePage.textInputSearch}
              placeholder="Entrez l'ID"
              value={searchID}
              onChangeText={setSearchID}
              maxLength={9}
              selectionColor="#264A4A"
              onSubmitEditing={handleSearchSubmit}
              keyboardType="default"
              autoCapitalize="characters"
            />
            <TouchableOpacity style={stylesHomePage.searchButton} onPress={handleSearchSubmit}>
            <Image source={require('../../assets/images/go.png')} style={stylesHomePage.searchImage} />
            </TouchableOpacity>
          </View>
        </View>

      <View style={stylesHomePage.page}>
      { /* Image de localisation (Accueil) */}
      <Image source={require('../../assets/images/Localisation.png')}
        style={{ width: 180, height: 180 }}
        resizeMode="contain" />
      </View>

      {/* Texte d'instruction pour l'utilisateur */}
      <View style={stylesHomePage.textContainer}>
        <Text style={stylesHomePage.text}>
          {"\n"}BIENVENUE{"\n"}HOLBERTON SCHOOL{"\n"}{"\n"}
        </Text>
      </View>

    </View>
    </ScreenWrapper>
    </ScrollView>
  );
}

export default HomeScreen;
