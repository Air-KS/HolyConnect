// src/styles/formStyles.js

// Importation de la dépendance nécessaire pour créer des styles
import { StyleSheet } from 'react-native';

// Définition des styles pour les formulaires de l'application
const formStyle = StyleSheet.create({

  // Style pour le conteneur principal des formulaires
  container: {
    flex: 1,
    backgroundColor: '#A6D2D2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Style pour le texte des champs de formulaire
  text: {
    fontFamily: "CheeseBurger",
    color: '#264A4A',
    fontSize: 20,
    paddingLeft: '3%',
    paddingRight: '3%',
    flex: 1,
  },

  // Style pour les champs de saisie des formulaires
  input: {
    fontFamily: "CheeseBurger",
    height: 50,
    width: '60%',
    borderRadius: 25,
    borderColor: 'gray',
    backgroundColor: '#E9E9E9',
    borderWidth: 3,
    marginBottom: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },

  // Style pour le texte d'erreur des formulaires
  errorText: {
    color: 'red',
  },

});


// Exportation des styles pour une utilisation dans d'autres fichiers
export default formStyle;
