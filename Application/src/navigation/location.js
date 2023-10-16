// src/navigation/location.js

// Importation des dépendances nécessaires
import { View, Text, Image, TouchableOpacity, FlatList, Button, ScrollView } from 'react-native';
import locationStyle from '../styles/locationStyle';
import { useState, useEffect } from 'react';

// Composant représentant l'écran de gestion des locations
function LocationScreen({ route, navigation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (route.params?.title) {
      setLocations(prev => [...prev, route.params.title]);
    }
  }, [route.params?.title]);


  // Rendu du composant
  return (
    // Conteneur principal avec défilement


  <View style={locationStyle.container}>
    <Button title="Ajouter une nouvelle location" onPress={() => navigation.navigate('CreateLocation')} />

      <FlatList
        data={locations}
        renderItem={({ item }) =>
        <Text style={locationStyle.text}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />


    {/* Section pour voir un aperçu de la location */}
    <TouchableOpacity onPress={() => navigation.navigate('ApLocation')}>
      <View style={locationStyle.textLocal}>
        <Text style={locationStyle.text}>Voir un aperçus du rendu Final et voilà
        que j'écris une longue phrase juste pour voir si ça fonctionne !
        Je doute qu'il y aura autant de place disponible !</Text>
      </View>
    </TouchableOpacity>

    {/* Section pour créer une nouvelle location */}
    <Text style={locationStyle.text}>Créer une nouvelle Location</Text>
    <TouchableOpacity onPress={() => navigation.navigate('CreateLocation')}>
      <Image source={require('../../assets/images/Nouveau.png')} style={locationStyle.addLocation} />
    </TouchableOpacity>
  </View>
  );
}

// Exportation du composant pour une utilisation dans d'autres fichiers
export default LocationScreen;
