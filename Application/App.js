// App.js

// Importation des dépendances nécessaires
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';
import Home from './src/navigation/home';
import Login from './src/navigation/login';
import SignUp from './src/navigation/signUp';
import MenuProfil from './src/components/menuProfil';
import Location from './src/navigation/location';
import createLocation from './src/navigation/createLocation';
import apLocation from './src/navigation/apLocation';
import Profil from './src/navigation/profil';
import UiInterface from './src/navigation/UiInterface';
import MaLocation from './src/navigation/maLocation';

// Initialisation du navigateur Stack
const Stack = createStackNavigator();

// Composant principal de l'application
export default function App() {

  // État pour vérifier si les polices sont chargées
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Chargement des polices lors du montage du composant
  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'CheeseBurger': require('./assets/fonts/CheeseBurger.otf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts", error);
      }
    }

    // Appel de la fonction de chargement des polices
    loadFonts();
  }, []);

  // Si les polices ne sont pas chargées, ne rien afficher
  if (!fontsLoaded) {
    return null;
  }

  // Rendu du composant principal
  return (
    <AuthProvider>
      <MenuProvider>
        <NavigationContainer>

          {/* Configuration du navigateur Stack */}
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: '',
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />

            {/* Écran de connexion */}
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: '',
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />

            {/* Écran d'inscription */}
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerTitle: '',
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />

            {/* Écran de location */}
            <Stack.Screen
              name="Location"
              component={Location}
              options={{
                headerTitle:'',
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />

            {/* Écran de création de location */}
            <Stack.Screen
              name="CreateLocation"
              component={createLocation}
              options={{
                headerTitle:'',
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />

            {/* Écran de Ma Location */}
            <Stack.Screen
              name="MaLocation"
              component={MaLocation}
              options={{
                headerTitle:'',
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />

            {/* Écran de location (Aperçus Final) */}
            <Stack.Screen
              name="ApLocation"
              component={apLocation}
              options={{
                headerTitle:'',
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />

            {/* Écran de location */}
            <Stack.Screen
              name="UiInterface"
              component={UiInterface}
              options={{
                headerTitle:'',
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />

            {/* Écran de profile */}
            <Stack.Screen
              name="Profil"
              component={Profil}
              options={{
                headerTitle:'',
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />

            {/* ... autres écrans ... */}

          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </AuthProvider>
  )
}
