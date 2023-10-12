// src/styles/styles.js

import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Conteneur principal de l'écran
  homePage: {
    flex: 1,
    backgroundColor: '#A6D2D2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Style pour l'image en arrière-plan
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  // Conteneur pour le texte central
  textContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Style pour le texte central
  text: {
    fontSize: 28,
    color: '#264A4A',
    textAlign: 'center',
  },

  // Conteneur pour les éléments en haut à droite
  topRightContainer: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    zIndex: 1
  },

});

export default styles;
