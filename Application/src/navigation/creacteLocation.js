// src/navigation/createLocation.js

// Importation des modules nécessaires
import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import scrollView from '../screens/scrollView';
import tabStyle from '../styles/tabBar';
import baseStyle from '../styles/baseStyle';
import formStyle from '../styles/formStyle';
import locationStyle from '../styles/locationStyle';

// Les composants de chaque onglet
function InfoGeneral({ titreLocation, setTitreLocation }) {

  const [localTitre] = useState(titreLocation);

    return (
    <ScrollView style={scrollView.scrollView}>
      <View style={[tabStyle.scene]}>
        <Text>Informations générales</Text>
        <Text style={{...baseStyle.text, fontSize: 20}}>Titre</Text>
        <View style={formStyle.input}>
          <TextInput
            style={formStyle.text}
            placeholder="Titre"
            value={localTitre}
            onChangeText={text => setTitreLocation(text)}
            autoCapitalize="none"
            selectionColor="#264A4A"
            returnKeyType="next"

          />
        </View>

      </View>
    </ScrollView>
    );
}

function Adresse() {
    return (
    <ScrollView style={scrollView.scrollView}>
      <View style={[tabStyle.scene]}>
        <Text>Adresse</Text>
        </View>
    </ScrollView>
    );
}

const initialLayout = { width: '100%' };

// Composant représentant l'écran d'accueil
function CreateLocation({ navigation }) {

  const [titreLocation, setTitreLocation] = useState('');

  const [index, setIndex] = useState(0);
  const [routes] = useState([
      { key: 'infoGeneral', title: 'Info Générale' },
      { key: 'adresse', title: 'Adresse' },
      // ... Ajoute d'autres routes pour les autres onglets
  ]);

  const renderScene = SceneMap({
    infoGeneral: () => <InfoGeneral titreLocation={titreLocation} setTitreLocation={setTitreLocation} />,
      adresse: Adresse,

      // ... Ajoute d'autres mappings pour les autres onglets
  });

  // Rendu du composant
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
      onPress={() => {
        navigation.navigate('Location', { title: titreLocation });
      }}
    />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});

export default CreateLocation;
