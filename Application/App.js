// App.js

// Importation des modules nécessaires
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import HomeScreen from './src/navigation/homeScreen';
import LoginScreen from './src/navigation/loginScreen';
import SignUpScreen from './src/navigation/signUpScreen';
import MenuProfil from './src/components/menuProfil';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';

// Initialisation du navigateur
const Stack = createStackNavigator();

// Composant principal de l'application
export default function App() {

  // État pour le chargement des polices
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Chargement des polices lors du démarrage de l'application
  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'MysticeTimes': require('./assets/fonts/MysticeTimes.otf'),
          'CartoonStar': require('./assets/fonts/CartoonStar.ttf'),
          'CartoonEmpire': require('./assets/fonts/CartoonEmpire.otf'),
          'CartoonComical': require('./assets/fonts/CartoonComical.ttf'),
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
    return null; // Ou retournez un composant de chargement si vous en avez un
  }

// comment
  return (
    <AuthProvider>
      <MenuProvider>
        <NavigationContainer>
          {/* Comment */}
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitle: "HolyConnect - Home",
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />
            {/* comment */}
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerTitle: "Login",
                headerStyle: {backgroundColor: '#E9E9E9'},
                headerShown: true,
                headerRight: () => <MenuProfil />
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                headerTitle: "Inscription",
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
