// src/styles/locationStyle.js

// Importation de la dépendance nécessaire pour créer des styles
import {StyleSheet } from 'react-native';

// Définition des styles pour la location
const locationStyle = StyleSheet.create({

  // Style pour le conteneur principal de l'écran de location
  container: {
    flex: 1,
    backgroundColor: '#A6D2D2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Style pour les textes principaux
  text: {
    fontSize: 20,
    color: '#264A4A',
    //textAlign: 'center',
  },
  textLocal: {
    borderRadius: 15,
    borderWidth: 3,
    margin: '5%',
    padding: '2%',
    backgroundColor: '#E9E9E9',
  },
  // Style pour ajouter une location
  addLocation: {
    width: 50,
    height: 50,
    marginTop: '2%',
    marginBottom: '7%',
  },

  // Style pour le conteneur d'adresse
  addressContainer: {
    width: '70%',
    height: 100,
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    borderWidth: 5,
    marginBottom: '5%',
  },
  // Style pour le texte d'adresse
  adressText: {
    fontSize: 20,
    color: '#264A4A',
    marginLeft: '4%',
    marginRight: '4%',

    //textAlign: 'center',
  },

  // Style pour le conteneur des paramètres du panneau
  panelSettting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  // Style pour le conteneur du panneau
  panelContainer: {
    width: '45%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Style pour les panneaux gauche
  panelLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '35%',
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    borderWidth: 5,
  },
  /// Style pour les panneaux droit
  panelRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '35%',
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    borderWidth: 5,
  },
  // Style pour le texte du panneau
  panelText: {
    fontSize: 16,
    color: '#264A4A',
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '5%',
    marginBottom: '5%',
    //textAlign: 'center',
  },

  // Style pour le conteneur d'image
  imageContainer: {
    width: 200,
    height: 150,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    borderWidth: 5,
    marginTop: '10%',
    marginBottom: '5%',
  },
  // Style pour le l'image de présentation
  imageTitle: {
  borderRadius: 10,
  width: '100%',
  height: '100%',
  backgroundColor: '#E9E9E9',
  },

  // Styles pour le swiper
  wrapper: {}, // Styles pour le swiper
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB', // Exemple de couleur de fond
  },

  // Style pour les images des pannaux
  commonImage: {
    width: '90%',
    height: '90%',
    borderRadius: 15,
  },

});

// Exportation des styles pour une utilisation dans d'autres fichiers
export default locationStyle;
