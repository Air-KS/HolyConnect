// src/utils/fileManager.js

import * as FileSystem from 'expo-file-system';

export const saveUserDataToFile = async (newUserData) => {
  const fileUri = FileSystem.documentDirectory + 'userData.json';

  let users = [];

  // Essayez de lire les utilisateurs existants
  try {
    const jsonString = await FileSystem.readAsStringAsync(fileUri);
    const existingUsers = JSON.parse(jsonString);
    if (Array.isArray(existingUsers)) {
      users = existingUsers;
    }
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier", err);
  }

  // Ajoutez le nouvel utilisateur à la liste
  users.push(newUserData);

  // Enregistrez la liste mise à jour dans le fichier
  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(users));
    console.log('Fichier écrit avec succès');
  } catch (err) {
    console.error("Erreur lors de l'écriture du fichier", err);
  }
};

export const readUserDataFromFile = async () => {
  const fileUri = FileSystem.documentDirectory + 'userData.json';

  try {
    const jsonString = await FileSystem.readAsStringAsync(fileUri);
    const data = JSON.parse(jsonString);
    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Le fichier userData.json ne contient pas un tableau valide.");
      return [];
    }
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier", err);
    return [];
  }
};
