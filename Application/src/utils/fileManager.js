// src/utils/fileManager.js

import * as FileSystem from 'expo-file-system';

const userFileUri = FileSystem.documentDirectory + 'userData.json';

export const generateUniqueID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
};

export const generateUniqueLocationID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
};

export const ensureFileExists = async (fileUri) => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([]));
    }
};

export const saveUserDataToFile = async (newUserData) => {
  await ensureFileExists(userFileUri);

  let users = [];

  try {
    const jsonString = await FileSystem.readAsStringAsync(userFileUri);
    users = JSON.parse(jsonString);
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier", err);
  }

  // Attribuer un ID unique au nouvel utilisateur
  newUserData.id = generateUniqueID();

  // Assurez-vous que l'utilisateur a une liste vide de locations au départ
  newUserData.locations = [];

  users.push(newUserData);

  try {
    await FileSystem.writeAsStringAsync(userFileUri, JSON.stringify(users));
    console.log('Fichier écrit avec succès');
  } catch (err) {
    console.error("Erreur lors de l'écriture du fichier", err);
  }
};

export const saveUserLocationToFile = async (userId, newLocationData) => {
  await ensureFileExists(userFileUri);

  let users = [];

  try {
    const jsonString = await FileSystem.readAsStringAsync(userFileUri);
    users = JSON.parse(jsonString);
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier", err);
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    console.error("Utilisateur non trouvé");
    return;
  }

  if (!user.locations) {
    user.locations = [];
  }

  // Générez un ID unique pour la nouvelle location
  newLocationData.id = generateUniqueLocationID();
  console.log('ID unique généré :', newLocationData.id);

  // Assurez-vous d'associer l'ID de l'utilisateur à la nouvelle location
  newLocationData.userId = userId;

  user.locations.push(newLocationData);

  try {
    await FileSystem.writeAsStringAsync(userFileUri, JSON.stringify(users));
    console.log('Fichier écrit avec succès');

    // Ajout : vérification que la donnée a été enregistrée
    const checkData = await FileSystem.readAsStringAsync(userFileUri);
    console.log('Données après écriture:', checkData);

  } catch (err) {
    console.error("Erreur lors de l'écriture du fichier", err);
  }
};

export const getUserLocations = async (userId) => {
  const users = await readUserDataFromFile();
  const user = users.find((u) => u.id === userId);
  return user ? user.locations || [] : [];
};

export const readUserDataFromFile = async () => {
  await ensureFileExists(userFileUri);

  try {
    const jsonString = await FileSystem.readAsStringAsync(userFileUri);
    const users = JSON.parse(jsonString);

    // Assurez-vous que chaque utilisateur a une propriété 'locations' initialisée comme un tableau vide
    users.forEach((user) => {
      if (!user.locations) {
        user.locations = [];
      }
    });

    return users;
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier", err);
    return [];
  }
};

export const deleteLocation = async (locationId) => {
  try {
    // Récupérez les données utilisateur actuelles
    const users = await readUserDataFromFile();

    // Recherchez l'utilisateur qui possède la location à supprimer
    const userIndex = users.findIndex((user) => user.locations.some((location) => location.id === locationId));

    if (userIndex === -1) {
      // L'utilisateur ou la location n'a pas été trouvé
      console.error("Utilisateur ou emplacement non trouvé");
      return Promise.reject("Utilisateur ou emplacement non trouvé");
    }

    // Trouvez la location dans les données de l'utilisateur
    const locationIndex = users[userIndex].locations.findIndex((location) => location.id === locationId);

    if (locationIndex === -1) {
      // La location n'a pas été trouvée
      console.error("Emplacement non trouvé");
      return Promise.reject("Emplacement non trouvé");
    }

    const deletedLocation = users[userIndex].locations[locationIndex]; // Ajoutez cette ligne

    // Supprimez la location de la liste des locations de l'utilisateur
    users[userIndex].locations.splice(locationIndex, 1);

    // Écrivez les données mises à jour dans le fichier
    await FileSystem.writeAsStringAsync(userFileUri, JSON.stringify(users));

    console.log('Emplacement supprimé avec succès');

    // Ajoutez ce log pour identifier la location supprimée
    console.log('Emplacement supprimé :', deletedLocation.title);

    return Promise.resolve(); // La suppression a réussi
  } catch (error) {
    console.error("Erreur lors de la suppression de l'emplacement", error);
    return Promise.reject(error);
  }
};
