// src/styles/tab.js

// Importation de la dépendance nécessaire pour créer des styles
import {StyleSheet } from 'react-native';

// Définition des styles pour les onglets (tabs) de l'application
const tabStyle = StyleSheet.create({

  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    marginRight: '2%',
    marginLeft: '2%',
  },

  // Style pour le conteneur principal des onglets
  container: {
    flex: 1,
  },

  // Style pour le conteneur de la vue des onglets
  tabViewContainer: {
    flex: 1,
    backgroundColor: '#A6D2D2',
  }
});

// Exportation des styles pour une utilisation dans d'autres fichiers
export default tabStyle;
