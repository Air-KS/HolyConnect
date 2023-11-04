// src/navigation/createLocation.js

// Importation des modules nécessaires
import React, { useState, useContext } from 'react';
import { View, ScrollView, Text, TextInput, Button } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { AuthContext, userId } from '../contexts/AuthContext';
import scrollView from '../screens/scrollView';
import tabStyle from '../styles/tabBar';
import baseStyle from '../styles/baseStyle';
import formStyle from '../styles/formStyle';
import createLocation from '../styles/createLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Composant InfoGeneral pour les informations générales
function InfoGeneral({ namelocation, setNamelocation, adresslocation, setAdresslocation, infolocation, setInfolocation }) {
    return (
        <ScrollView style={scrollView.scrollView}>
            <View style={[createLocation.scene]}>
                <Text> </Text>
                <Text style={{ ...baseStyle.text, fontSize: 18 }}>Nommer votre Location</Text>
                <View style={[createLocation.input, createLocation.nameLocation]}>
                    <TextInput
                        style={formStyle.text}
                        placeholder="Nom de location"
                        value={namelocation}
                        onChangeText={setNamelocation}
                        maxLength={30}
                        autoCapitalize="none"
                        selectionColor="#264A4A"
                        returnKeyType="next"
                    />
                </View>
            </View>

            {/* Adresse */}
            <View style={[createLocation.scene]}>
                <Text> </Text>
                <Text style={{ ...baseStyle.text, fontSize: 18 }}>Adresse de votre Location</Text>
                <View style={[createLocation.input, createLocation.adresseLocation]}>
                    <TextInput
                        style={createLocation.text}
                        placeholder="Adresse complète de votre location"
                        value={adresslocation}
                        onChangeText={setAdresslocation}
                        maxLength={100}
                        multiline={true}
                        numberOfLines={5}
                        autoCapitalize="none"
                        selectionColor="#264A4A"
                    />
                </View>
            </View>
            {/* Information de location ! */}
            <View style={[createLocation.scene]}>
            <Text> </Text>
                <Text style={{ ...baseStyle.text, fontSize: 18 }}>Information complémentaire</Text>
                <View style={[createLocation.input, createLocation.infoLocation]}>
                    <TextInput
                        style={createLocation.text}
                        placeholder="Ajouter autant d'information nécessaire - 350 caractère maximum"
                        value={infolocation}
                        onChangeText={setInfolocation}
                        maxLength={350}
                        multiline={true}
                        numberOfLines={10}
                        autoCapitalize="none"
                        selectionColor="#264A4A"
                    />
                </View>
            </View>
        </ScrollView>
    );
}

// Composant Adresse pour l'adresse
/*
function Adresse({ adresslocation, setAdresslocation }) {
    return (
        <ScrollView style={scrollView.scrollView}>
            <View style={[tabStyle.scene]}>
                <Text>Adresse</Text>
                <Text style={{ ...baseStyle.text, fontSize: 20 }}>Adresse Complète</Text>
                <View style={formStyle.input}>
                    <TextInput
                        style={formStyle.text}
                        placeholder="Adresse Complète"
                        value={adresslocation}
                        onChangeText={setAdresslocation}
                        maxLength={100}
                        autoCapitalize="none"
                        selectionColor="#264A4A"
                        returnKeyType="next"
                    />
                </View>
            </View>
        </ScrollView>
    );
}

// Composant InfoGeneral pour les informations générales
function InfoLocation({ infolocation, setInfolocation }) {
  return (
      <ScrollView style={scrollView.scrollView}>
          <View style={[tabStyle.scene]}>
              <Text>Informations générales</Text>
              <Text style={{ ...baseStyle.text, fontSize: 20 }}>Information de Location</Text>
              <View style={formStyle.input}>
                  <TextInput
                      style={formStyle.text}
                      placeholder="Information de Location"
                      value={infolocation}
                      onChangeText={setInfolocation}
                      maxLength={350}
                      autoCapitalize="none"
                      selectionColor="#264A4A"
                      returnKeyType="next"
                  />
              </View>
          </View>
      </ScrollView>
  );
}
*/
// Layout initial
const initialLayout = { width: '100%' };

// Fonction pour sauvegarder la location dans la base de données
const saveLocationToDatabase = async (userId, newLocation) => {
  const token = await AsyncStorage.getItem('userToken');
  if (!token) {
      console.error("Le token de l'utilisateur est absent ou vide.");
      return;
  }
  try {
      const response = await fetch(`http://192.168.1.17:3000/api/homelocation/newloc`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              namelocation: newLocation.namelocation,
              adresslocation: newLocation.adresslocation,
              infolocation: newLocation.infolocation
          }),
      });
      if (response.ok) {
          return await response.json();
      } else {
          console.error('Erreur lors de l\'enregistrement:', await response.text());
      }
  } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la location:', error);
  }
};

// Composant représentant l'écran de création de location
function CreateLocation({ navigation }) {
    // Contexte de l'utilisateur
    const { userId } = useContext(AuthContext);
    //console.log("Recherche de l'utilisateur avec l'ID:", userId);

    // États pour le titre de la location et l'adresse
    const [namelocation, setNamelocation] = useState('');
    const [adresslocation, setAdresslocation] = useState('');
    const [infolocation, setInfolocation] = useState('');

    // Index et routes pour l'onglet
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'infoGeneral', title: 'Info Générale' },
        // { key: 'adresse', title: 'Adresse' },
        // { key: 'infoLocation', title: 'Ma Location' }
    ]);

    // Fonction pour rendre la scène en fonction de la route
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'infoGeneral':
                return <InfoGeneral
                  namelocation={namelocation} setNamelocation={setNamelocation}
                  adresslocation={adresslocation} setAdresslocation={setAdresslocation}
                  infolocation={infolocation} setInfolocation={setInfolocation}
                 />;
            default:
                return null;
        }
    };

    // Rendu de la vue
    return (
        <View style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        style={{ backgroundColor: '#2A6FC7' }}
                    />
                )}
            />
            <View style={{ padding: 30, backgroundColor: '#A6D2D2' }}>
              <Button
                title="Sauvegarder"
                onPress={async () => {
                  const result = await saveLocationToDatabase(userId, {
                    namelocation: namelocation,
                    adresslocation: adresslocation,
                    infolocation: infolocation
                    });
                      if (result) {
                        navigation.navigate('UiInterface', {
                          namelocation: namelocation,
                          adresslocation: adresslocation,
                          infolocation: infolocation,
                    });
                  }
                }}
              />
            </View>
        </View>
    );
}

// Exportation du composant pour une utilisation dans d'autres fichiers
export default CreateLocation;
