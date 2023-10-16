// src/styles/bulText.js

// Importation de la dépendance nécessaire pour créer des styles
import { StyleSheet } from 'react-native';

// Définition des styles pour les textes en forme de bulle
const stylesBulText = StyleSheet.create({
  // Style pour le conteneur principal
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  // Style pour le texte informatif
  infoText: {
    fontSize: 16,
    color: '#264A4A',
    marginTop: 50,
    marginVertical: 10,
    width: '75%',
    borderRadius: 25,
    borderWidth: 3,
    backgroundColor: '#E9E9E9',
    borderColor: 'gray',
    alignSelf: 'center',
    padding: 10,
  },

});


// Exportation des styles pour une utilisation dans d'autres fichiers
export default stylesBulText;
