// src/navigation/loginScreen.js

// Importation des dépendances nécessaires
import React, { useState, useRef, useContext } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { AuthContext } from '../contexts/AuthContext';
// import { handleGoogleLogin } from '../contexts/GoogleLogin';
// import { handleFacebookLogin } from '../contexts/FacebookLogin';
import loginStyles from '../styles/stylesLogin';
import { FontAwesome } from '@expo/vector-icons';
import { readUserDataFromFile } from '../utils/fileManager';

// Composant principal de la page de connexion
const LoginScreen = ({ navigation }) => {

  // Initialisation des états locaux
  const [userpseudoname, setUserPseudoName] = useState(''); // Etat pour l'identifiant
  const [password, setPassword] = useState(''); // Etat pour le password
  const [hidePassword, setHidePassword] = useState(true); //

    // Utilisation du contexte d'authentification
    const { setUserLoggedIn } = useContext(AuthContext);

  // Référence pour le champ du mot de passe
  const passwordRef = useRef(null);

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    const validUsername = "id"
    const validPassword = "pw"

    // Lisez les données du fichier
    const storedData = await readUserDataFromFile();
    console.log("Stored Data:", storedData);

        // Vérification des identifiants & Mot de Passe
        if (userpseudoname === validUsername && password === validPassword) {
          setUserLoggedIn(true);
          navigation.navigate('Home');
          return;
        }

        const users = await readUserDataFromFile();
        const userExists = users.some(user => (user.userpseudoname === userpseudoname || user.useremail === userpseudoname) && user.userpassword === password);

        if (userExists) {
          setUserLoggedIn(true);
          navigation.navigate('Home');
        } else {
          alert('Erreur : Identification ou mot de passe incorrect. Veuillez réessayer.');
        }
      };

  // Rendu du composant
  return (
    <View style={loginStyles.loginContainer}>
      <Text style={{...loginStyles.loginTextScreen, fontSize: 30}}>Connectez-vous !{"\n"}</Text>
      <Text style={loginStyles.loginTextScreen}>Identification</Text>

      {/* Champ pour l'identifiant */}
      <TextInput
      style={loginStyles.textInputLogin}
      placeholder="Email ou Identifiant"
      value={userpseudoname}
      onChangeText={setUserPseudoName}
      autoCapitalize="none" // Première lettre de chaque phrase en Maj
      selectionColor="#264A4A"
      returnKeyType="next"
      onSubmitEditing={() => passwordRef.current.focus()}
      />

      {/* Champ pour le Pot de Passe */}
      <Text style={loginStyles.loginTextScreen}>Mot de Passe</Text>
      <View style={loginStyles.textInputWrapper}>
        <TextInput
          ref={passwordRef}
          style={loginStyles.textInputPassword}
          placeholder="Mot de Passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword} // Cache le Mot de Passe
          autoCapitalize="none"
          selectionColor="#264A4A"
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        {/* Bouton pour afficher/masquer le Mot de Passe */}
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <FontAwesome name={hidePassword ? "eye-slash" : "eye"} size={20} color="grey"/>
        </TouchableOpacity>
      </View>
        <Text style={loginStyles.text}> {'\n'}</Text>

      {/* Bouton pour se connecter */}
      <Button
        title="Connecter"
        onPress={handleLogin}
      />

    </View>
  );
};

export default LoginScreen;
