// src/styles/menuProfil.js

// Importation de la dépendance nécessaire pour créer des styles
import { StyleSheet } from 'react-native';

// Définition des styles pour le menu du profil
const menuProfil = StyleSheet.create({

  // Style pour le conteneur de l'icône du menu
  iconContainer: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  // Style pour le conteneur du menu déroulant
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    width: 140,
    alignItems: 'center',
    borderRadius: 15,
    padding: 5,
  },

});

// Exportation des styles pour une utilisation dans d'autres fichiers
export default menuProfil;
