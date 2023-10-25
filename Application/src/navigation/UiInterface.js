// src/navigation/apLocation.js

// Importation des dépendances nécessaires
import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Swiper from 'react-native-swiper';
import locationStyle from '../styles/locationStyle';
import baseStyle from '../styles/baseStyle';


import * as Location from 'expo-location';

// Composant pour afficher un aperçu de la location
function UiInterface({ route, navigation }) {

  // comment
  const address = route.params?.locationAddress || "Adresse ici !";

  // État pour suivre le slide actif dans le Swiper
  const [activeSlide, setActiveSlide] = useState(0);

  // Images pour la pagination
  const inactivePagination = require('../../assets/images/pagination/inactivePagination.png');
  const activePagination = require('../../assets/images/pagination/activePagination.png');

  // Images pour les panneaux
  const maLocation = require('../../assets/images/panel/maLocation.png');
  const commerce = require('../../assets/images/panel/commerce.png');
  const transport = require('../../assets/images/panel/transport.png');
  const urgence = require('../../assets/images/panel/urgence.png');

  // Mettre à jour le slide actif lors du changement de slide
  const onIndexChanged = (index) => {
    setActiveSlide(index);
  };

  // Cette fonction sera déclenchée lorsque l'utilisateur cliquera sur "Commerce"
  const handleCommerceClick = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
    // Obtention de la localisation actuelle de l'utilisateur et ouverture de Google Maps
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const query = "Leclerc|Carrefour|Match|Aldi|Lidl";
    const url = `https://www.google.com/maps/search/Commerce+à+proximité+${query}/@${latitude},${longitude},15z`;
    Linking.openURL(url);
};

  // Cette fonction sera déclenchée lorsque l'utilisateur cliquera sur "Transport"
  const handleTransportClick = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
    // Obtention de la localisation actuelle de l'utilisateur et ouverture de Google Maps
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const query = "Metro|Gare|Taxi|";
    const url = `https://www.google.com/maps/search/transports+à+proximité+${query}"/@${latitude},${longitude},15z`;
    Linking.openURL(url);
  };

    // Cette fonction sera déclenchée lorsque l'utilisateur cliquera sur "Urgence"
    const handleUrgenceClick = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      // Obtention de la localisation actuelle de l'utilisateur et ouverture de Google Maps
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const url = `https://www.google.com/maps/search/hôpitaux+à+proximité/@${latitude},${longitude},15z`;
      Linking.openURL(url);
    };

  // Rendu du composant
  return (
    <View style={baseStyle.container}>

      {/* Image principale */}
      <View style={locationStyle.imageContainer}>
        <Image source={require('../../assets/images/ImageTest.png')} style={locationStyle.imageTitle} />
      </View>

      {/* Adresse de la location */}
      <View style={locationStyle.addressContainer}>
        <ScrollView>
          <Text style={locationStyle.adressText}>
            {address}
          </Text>
        </ScrollView>
      </View>

      {/* Swiper pour afficher les informations supplémentaires */}
      <Swiper
        style={locationStyle.wrapper}
        showsButtons={false}
        showsPagination={false} // Cache la pagination par défaut
        onIndexChanged={onIndexChanged}
        loop={false}>

        {/* Les différentes sections */}
        <View style={locationStyle.panelSettting}>
          <View style={locationStyle.panelContainer}>

            {/* Section "Ma location" */}
            <View style={locationStyle.panelLeft}>
              <Image source={maLocation} style={locationStyle.commonImage}/>
            </View>
            <Text style={locationStyle.panelText}>MA LOCATION</Text>

            {/* Section "Transport" */}
            <TouchableOpacity style={locationStyle.panelLeft} onPress={handleTransportClick}>
              <Image source={transport} style={locationStyle.commonImage}/>
            </TouchableOpacity>
            <Text style={locationStyle.panelText}>TRANSPORT</Text>
          </View>

          <View style={locationStyle.panelContainer}>

            {/* Section "Commerce" */}
            <TouchableOpacity style={locationStyle.panelRight} onPress={handleCommerceClick}>
              <Image source={commerce} style={locationStyle.commonImage}/>
            </TouchableOpacity>
            <Text style={locationStyle.panelText}>COMMERCE</Text>

            {/* Section "Urgence" */}
            <TouchableOpacity style={locationStyle.panelRight} onPress={handleUrgenceClick}>
              <Image source={urgence} style={locationStyle.commonImage}/>
            </TouchableOpacity>
            <Text style={locationStyle.panelText}>URGENCE</Text>
          </View>
        </View>

        {/* Autres slides pour d'autres informations */}
        <View style={[locationStyle.panelSettting, {justifyContent: 'center'}, {alignItems: 'center'}]}>
          <Text style={{fontSize: 50}}> A venir !</Text>
        </View>
        <View style={[locationStyle.panelSettting, {justifyContent: 'center'}, {alignItems: 'center'}]}>
          <Text style={{fontSize: 50}}> A venir !</Text>
        </View>
      </Swiper>

      {/* Pagination personnalisée pour le Swiper */}
      <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', flexDirection: 'row' }}>
        <Image source={inactivePagination} style={{ width: 80, height: 80 }} />
        <Image source={activePagination}
          style={{
          position: 'absolute', bottom: 30, width: 20, height: 20,
          left: activeSlide === 0 ? 3 : activeSlide === 1 ? 30 : 58 }}/>
      </View>
    </View>
  );
}

// Exportation du composant pour une utilisation dans d'autres fichiers
export default UiInterface;
