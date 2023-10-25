// src/context/AuthContext.js

// Importation des dépendances nécessaires
import React, { createContext, useState } from 'react';

// Création du contexte d'authentification
export const AuthContext = createContext();

// Composant fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
  // État pour suivre si l'utilisateur est connecté ou non
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userPseudo, setUserPseudo] = useState(null);
  const [userData, setUserData] = useState(null);

  // Fonction pour connecter l'utilisateur
  const login = async (user) => {
    setUserLoggedIn(true);
    setUserId(user.id);
    setUserPseudo(user.pseudo);

    // Chargez les données de l'utilisateur depuis le fichier JSON et stockez-les dans userData
    const userDataFromJson = await loadUserDataFromFile(user.id); // Assurez-vous que loadUserDataFromFile est une fonction asynchrone
    setUserData(userDataFromJson);
  };

  // Fonction pour déconnecter l'utilisateur
  const logOut = () => {
    setUserLoggedIn(false);
    setUserId(null);
    setUserPseudo(null);
    setUserData(null);
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
      isUserLoggedIn, userId, userPseudo, userData,
      updateUserPseudo, setUserLoggedIn, setUserId, setAuthContextUserId, setUserPseudo, setUserData,
      login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
