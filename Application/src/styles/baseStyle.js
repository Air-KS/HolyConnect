// src/styles/baseStyle.js

// Importation de la dépendance nécessaire pour créer des styles
import {StyleSheet } from 'react-native';

// Définition des styles de base pour l'application
const baseStyle = StyleSheet.create({
  // Style pour les conteneurs principaux
  container: {
    flex: 1,
    backgroundColor: '#A6D2D2',
    alignItems: 'center',
  },

  // Style pour les textes principaux
  text: {
    fontSize: 28,
    color: '#264A4A',
    textAlign: 'center',
  },
  // Style pour le conteneur de texte
  textContainer: {
    marginTop: '5%',
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Style pour les images d'arrière-plan
  imageBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

// Exportation des styles pour une utilisation dans d'autres fichiers
export default baseStyle;
