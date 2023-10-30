// src/navigation/profil.js

// Importation des dépendances nécessaires
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import formStyle from '../styles/formStyle';
import baseStyle from '../styles/baseStyle';
import tabStyle from '../styles/tabBar';

// Composant pour l'onglet "Profile"
const ProfilTab = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Rendu du composant
  return (
    <View style={baseStyle.container}>
      {/* Section des informations personnelles */}
      <Text style={{...baseStyle.text, fontSize: 18}}>Information Personnel{'\n'}</Text>
        <View style={formStyle.input}>
          <TextInput
          style={formStyle.text}
          placeholder="Nom"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={formStyle.input}>
        <TextInput
          style={formStyle.text}
          placeholder="Prénom"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <Text>{'\n'}</Text>

      {/* Section de l'adresse postale */}
      <Text style={{...baseStyle.text, fontSize: 18}}>Adresse postal{'\n'}</Text>
      <View style={formStyle.input}>
        <TextInput
          style={formStyle.text}
          placeholder="Nom de rue complète"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={formStyle.input}>
        <TextInput
          style={formStyle.text}
          placeholder="Code postal"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
    </View>
  );
};

// Composant pour l'onglet "Paramètres"
const Settings = () => {
  return (
    <Text>Paramètre</Text>
  );
};

// Composant principal de la page de profil
const ProfilScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'profil', title: 'Profil' },
    { key: 'settings', title: 'Paramètres' },
    { key: 'social', title: 'Social' },
  ]);

  // Fonction pour rendre les scènes des onglets
  const renderScene = SceneMap({
    profil: ProfilTab,
    settings: Settings,
    social: () => <View style={styles.scene}><Text>Text 3</Text></View>,
  });

  // Rendu du composant
  return (
      <View style={tabStyle.tabViewContainer}>
        {/* Vue des onglets */}
        <TabView
          style={{flex: 1}}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: '100%' }}
          renderTabBar={props => <TabBar {...props} />}
          swipeEnabled={true}
        />
    </View>
  );
};

// Styles spécifiques à ce composant
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

// Exportation du composant pour une utilisation dans d'autres fichiers
export default ProfilScreen;
