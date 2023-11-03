// src/styles/formStyles.js

// Importation de la dépendance nécessaire pour créer des styles
import { StyleSheet } from 'react-native';

// Définition des styles pour les formulaires de l'application
const createLocation = StyleSheet.create({

  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    fontFamily: "CheeseBurger",
    width: '80%',
    borderRadius: 20,
    borderColor: 'gray',
    backgroundColor: '#E9E9E9',
    borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },

  text: {
    fontFamily: "CheeseBurger",
    color: '#264A4A',
    fontSize: 20,
    paddingLeft: '3%',
    paddingRight: '3%',
    textAlign: 'left',
    //flex: 1,
  },

  nameLocation: {
    height: 50,
  },

  adresseLocation: {
    height: 100,
  },

  infoLocation: {
    height: 150,
  },

});


// Exportation des styles pour une utilisation dans d'autres fichiers
export default createLocation;
