// src/styles/searchBar.js

// Importation de la dépendance nécessaire pour créer des styles
import { StyleSheet } from 'react-native';

// Définition des styles pour la barre de recherche
const searchStyle = StyleSheet.create({

  // Style pour le conteneur principal de la barre de recherche
  container: {
    marginTop: '10%',
    marginBottom: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },

  // Style pour le champ de saisie de la barre de recherche
  input: {
    fontFamily: "CheeseBurger",
    fontSize: 30,
    width: '65%',
    height: 55,
    borderRadius: 25,
    borderColor: 'gray',
    backgroundColor: '#E9E9E9',
    borderWidth: 3,
    paddingHorizontal: '5%',
  },

  // Style pour le bouton de recherche
  button: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#C3C3C3',
    borderRadius: 25,
    width: 35,
    height: 35,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Style pour l'image du bouton de recherche
  image: {
    width: 40,
    height: 40,
  },
});

// Exportation des styles pour une utilisation dans d'autres fichiers
export default searchStyle;
