// src/context/AuthContext.js

// Importation des dépendances nécessaires
import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Création du contexte d'authentification
export const AuthContext = createContext();

// Composant fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
  // État pour suivre si l'utilisateur est connecté ou non
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userPseudo, setUserPseudo] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  // Fonction pour connecter l'utilisateur
  const login = async (user) => {
    const token = await generateTokenForUser(user);
    //localStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userToken', token);

    setUserLoggedIn(true);
    setUserId(user.id);
    setUserPseudo(user.pseudo);
  };

  // Fonction pour déconnecter l'utilisateur
  const logOut = async () => {
    try {
      // suppresssion du token lors de la deconnexion
      await AsyncStorage.removeItem('userToken');

      setUserLoggedIn(false);
      setUserId(null);
      setUserPseudo(null);
      setUserData(null);
      setToken(null);
    } catch (err) {
      console.error("Erreur lors de la deconnexion", err);
    }
  };
  // Fonction pour mettre à jour le pseudo de l'utilisateur
  const updateUserPseudo = (pseudo) => {
    setUserPseudo(pseudo);
  };

  // Fonction pour définir l'ID de l'utilisateur dans le contexte d'authentification
  const setAuthContextUserId = (id) => {
    setUserId(id);
  };

  // Fournir l'état et les fonctions associées aux composants enfants via le contexte
  return (
    <AuthContext.Provider value={{
      isUserLoggedIn, userId, userPseudo, userData, token, setToken,
      updateUserPseudo, setUserLoggedIn, setUserId, setAuthContextUserId, setUserPseudo, setUserData,
      login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
