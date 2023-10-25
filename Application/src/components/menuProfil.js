// src/components/menuProfil.js

// Importation des dépendances nécessaires
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import menuProfil from '../styles/menuProfil';

// Composant représentant le menu du profil utilisateur
const MenuProfil = () => {

  // Utilisation des hooks pour la navigation et l'accès au contexte d'authentification
  const navigation = useNavigation();
  const route = useRoute();

  // Récupération des fonctions et états depuis le contexte d'authentification
  const { isUserLoggedIn, logOut, userId, userPseudo } = useContext(AuthContext);

  // Titres par défaut pour les différentes routes
  const defaultTitles = {
    Home: 'Accueil',
    Login: 'Connexion',
    SignUp: 'Inscription',
    Location: 'Mes Locations',
    CreateLocation: 'Création de Location',
    UiInterface: 'Interface',
    ApLocation: 'Aperçus Final',
    Profil: 'Mon Profile',
    // ... autres écrans ...
  };

  // Récupération du titre de la route actuelle
  const title = route.params?.title || defaultTitles[route.name] || route.name;

  // Rendu du composant
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

      {/* Icône pour naviguer vers l'accueil */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="md-home" size={30} color="black" style={{ marginLeft: 0 }} />
      </TouchableOpacity>

      {/* Affichage du titre de la page actuelle */}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>

      <View style={menuProfil.iconContainer}>
        <Menu>
          {/* Icône pour déclencher l'affichage du menu */}
          <MenuTrigger>
            <Icon name={isUserLoggedIn ? "md-person" : "md-settings"} size={30} color="black" style={{ marginRight: 10 }}/>
          </MenuTrigger>

          {/* Options du menu */}
          <MenuOptions customStyles={{ optionsContainer: menuProfil.menuContainer }}>
            {isUserLoggedIn ? (
              <>

              <Text style={{ textAlign: 'center' }}>
                {userPseudo ? 'Bonjour, ' : 'Non connecté'}
                {userPseudo &&<Text style={{ fontWeight: 'bold' }}>{userPseudo}</Text>} {'\n'} </Text>

                {/* Options pour les utilisateurs connectés */}
                <MenuOption onSelect={() => {
                  navigation.navigate('Profil');
                  console.log("Bouton Profile");
                }}
                  text={'> Mon Profile'} />

                <MenuOption onSelect={() => {
                  navigation.navigate('Location');
                  console.log("Bouton Mes Locations");
                }}
                  text='> Mes Locations' />

                <MenuOption onSelect={() => {
                  console.log("Bouton Options");
                  // fonction pour les options
                }}
                  text='> Options' />

                <MenuOption onSelect={ () => {
                  logOut();
                  navigation.navigate('Home');
                  console.log("Déconnexion");
                }}
                  text='> Déconnexion' />
              </>
            ) : (
              <>
                {/* Options pour les utilisateurs non connectés */}
                <MenuOption onSelect={() => navigation.navigate('Login')} text='Connexion' />
                <MenuOption onSelect={() => navigation.navigate('SignUp')} text='Inscription' />
              </>
            )}
          </MenuOptions>

        </Menu>
      </View>
    </View>
  );
};

// Exportation du composant pour une utilisation dans d'autres fichiers
export default MenuProfil;
