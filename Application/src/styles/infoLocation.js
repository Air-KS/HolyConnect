// src/styles/infoLocation.js

// Importation de la dépendance nécessaire pour créer des styles
import {StyleSheet } from 'react-native';

// Définition des styles pour la location
const infoLocation = StyleSheet.create({

  // Style pour le conteneur principal de l'écran de location
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#264A4A',
    width: '90%',
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    borderWidth: 5,
    marginTop: '10%',
    marginBottom: '10%',
  },

  // Style pour le texte d'adresse
  titreLocation: {
    fontSize: 25,
    color: '#264A4A',
    fontWeight: 'bold',
    margin: '5%',
  },

  // Style pour le texte d'adresse
  infoText: {
    fontSize: 20,
    color: '#264A4A',
    marginLeft: '4%',
    marginRight: '4%',
  },


});

// Exportation des styles pour une utilisation dans d'autres fichiers
export default infoLocation;
