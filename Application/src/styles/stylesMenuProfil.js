// src/styles/stylesMenuProfil.js

import { StyleSheet } from 'react-native';

const stylesMenuProfil = StyleSheet.create({
  // Conteneur pour l'icône du menu
  iconContainer: {
    marginRight: 20,
    //marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  // Conteneur pour le menu déroulant
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 50,
    backgroundColor: '#f5f5f5',
    width: 130,
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
  },

  // Style pour chaque option du menu
  menuOption: {
    alignItems: 'center',
  },
});

export default stylesMenuProfil;
