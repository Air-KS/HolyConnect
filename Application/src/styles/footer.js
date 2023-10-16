// src/styles/footer.js

// Importation de la dépendance nécessaire pour créer des styles
import { StyleSheet } from 'react-native';

// Définition des styles pour le pied de page (footer) de l'application
const stylesFooter = StyleSheet.create({

  // Style pour le conteneur principal du pied de page
  footerContainer: {
    flexDirection: 'row',
    height: 170,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E9E9E9',
    borderWidth: 1,
    borderTopColor:'#000',
    width: '100%',
    marginTop: '10%',
  },

  // Style pour le titre du pied de page
  title: {
    color: '#264A4A',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  },

  // Style pour le conteneur gauche du pied de page
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  // Style pour le conteneur droit du pied de page
  rightContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },

  // Style pour le texte du conteneur Gauche
  leftText: {
    color: '#264A4A',
    fontSize: 14,
    textAlign: 'left',
    flex: 1,
    paddingLeft: '5%',
  },
  // Style pour le texte du conteneur Droit
  rightText: {
    color: '#264A4A',
    fontSize: 14,
    textAlign: 'left',
    flex: 1,
    paddingLeft: '5%',
  },

  // Style pour la barre latérale entre les conteneurs gauche et droit
  sidebar: {
    width: 2,
    height: '80%',
    backgroundColor: '#000',
  },

});

// Exportation des styles pour une utilisation dans d'autres fichiers
export default stylesFooter;
