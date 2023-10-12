// src/styles/stylesLogin.js

import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  // Style du conteneur principal pour l'écran de connexion
  loginContainer: {
    flex: 1,
    backgroundColor: '#A6D2D2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Style du conteneur pour le champ de mot de passe
  passwordConteainer: {
      flex: 1,
      backgroundColor: '#A6D2D2',
  },

  // Style du texte sur l'écran de connexion
  loginTextScreen: {
    fontFamily: "CheeseBurger",
    color: '#264A4A',
    fontSize: 15,
  },

  // Style pour le champ de saisie de l'identifiant
  textInputLogin: {
    fontFamily: "CheeseBurger",
    width: '60%',
    height: 40,
    borderRadius: 25,
    borderColor: 'gray',
    backgroundColor: '#E9E9E9',
    borderWidth: 1,
    marginBottom: '10%',
    paddingHorizontal: 10,
  },

  // Style pour le champ de saisie du mot de passe
  textInputPassword: {
    fontFamily: "CheeseBurger",
    flex: 1,
    height: '100%',
  },

  // Style du conteneur enveloppant le champ de saisie
  textInputWrapper: {
    backgroundColor: '#E9E9E9',
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    height: 40,
    borderRadius: 25,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },

});

export default loginStyles;
