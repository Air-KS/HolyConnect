// src/components/menuProfil.js
import React, { useContext } from 'react';
import { View } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import stylesMenuProfil from '../styles/stylesMenuProfil';

// Composant pour le menu du profil utilisateur
const MenuProfil = () => {
  // Hooks pour la navigation et le contexte d'authentification
  const navigation = useNavigation();
  const { isUserLoggedIn, logOut } = useContext(AuthContext);

  // Rendu du menu profil
  return (
    <View style={stylesMenuProfil.iconContainer}>
      <Menu>
        { /* Déclencheur pour afficher le menu */ }
        <MenuTrigger>
          <Icon name={isUserLoggedIn ? "md-person" : "md-settings"} size={30} color="black"/>
        </MenuTrigger>
        { /* Options du menu */ }
        <MenuOptions customStyles={{ optionsContainer: stylesMenuProfil.menuContainer }}>
          {isUserLoggedIn ? (
            <>
              { /* Naviguer vers le profil */ }
              <MenuOption onSelect={() => {
                console.log("Bouton Profile");
                // navigation.navigate('Profile');
              }}
                text='Profile' />
              { /* Les paramètres utilisateur */ }
              <MenuOption onSelect={() => {
                console.log("Bouton Options");
                // fonction pour les options
              }}
                text='Options' />
              { /* Pour se déconnecter */ }
              <MenuOption onSelect={logOut} text='Déconnexion' />
            </>
          ) : (
            <>
              { /* Pour naviguer vers la connexion */ }
              <MenuOption onSelect={() => navigation.navigate('Login')} text='Connexion' />
              { /* Pour naviguer vers la connexion */ }
              <MenuOption onSelect={() => navigation.navigate('SignUp')} text='Inscription' />
              { /* Les paramètres utilisateur */ }
              <MenuOption onSelect={() => {/* fonction pour les options */}} text='Options'/>
            </>
          )}
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default MenuProfil;
