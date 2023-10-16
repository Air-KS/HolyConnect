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
  // Fonction pour déconnecter l'utilisateur
  const logOut = () => {
    setUserLoggedIn(false);
    setUserId(null);
  };

  // Fournir l'état et les fonctions associées aux composants enfants via le contexte
  return (
    <AuthContext.Provider value={{ isUserLoggedIn, setUserLoggedIn, userId, setUserId, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
