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
    borderColor: '#264A4A',
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
    borderColor: '#264A4A',
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
    borderColor: '#264A4A',
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
  },

  // Style pour le conteneur d'image
  imageContainer: {
    borderColor: '#264A4A',
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
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB', // Couleur de fond
  },

  // Style pour les images des pannaux
  commonImage: {
    width: '90%',
    height: '90%',
    borderRadius: 15,
  },

  listItem: {
    borderColor: 'grey',
    width: 250,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E9E9',
    borderRadius: 15,
    borderWidth: 3,
    marginBottom: '5%',
  },

  buttonsContainer: {
    borderColor: '#264A4A',
    width: 220,
    backgroundColor: '#E9E9E9',
    flexDirection: 'row', // Pour aligner horizontalement les boutons
    justifyContent: 'space-between', // Pour espacer les boutons à gauche et à droite
    margingLeft: 20,
    fontWeight: 'bold'
  },

  buttonText: {
    fontWeight: 'bold',
  },

});

// Exportation des styles pour une utilisation dans d'autres fichiers
export default locationStyle;
