// src/navigation/loginn.js

// Importation des dépendances nécessaires
import React, { useState, useRef, useContext } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from '../contexts/AuthContext';
import baseStyle from '../styles/baseStyle';
import formStyle from '../styles/formStyle';
import scrollView from '../screens/scrollView';
import Footer from '../components/footer';
import { FontAwesome } from '@expo/vector-icons';
import { readUserDataFromFile } from '../utils/fileManager';

// Composant principal de la page de connexion
const LoginScreen = ({ navigation }) => {

  // États pour suivre les valeurs entrées par l'utilisateur
  const [userpseudoname, setUserPseudoName] = useState('');
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true); // État pour masquer/afficher le mot de passe

  // Utilisation du contexte d'authentification
  const { setUserLoggedIn, setAuthContextUserId, setUserPseudo, updateUserPseudo } = useContext(AuthContext);

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

    // Vérifiez si l'utilisateur existe dans le fichier
    const users = await readUserDataFromFile();
    const userExists = users.some(user => (user.userpseudoname === userpseudoname || user.useremail === userpseudoname) && user.userpassword === password);
    console.log("userExists:", userExists);

    // Si l'utilisateur existe, connectez-vous, sinon affichez une erreur
    if (userExists) {
      console.log("Utilisateur trouvé avant mise à jour:", userFound);
      setUserLoggedIn(true);
      const userFound = users.find(user => (user.userpseudoname === userpseudoname || user.useremail === userpseudoname) && user.userpassword === password);
      console.log("Utilisateur trouvé avant mise à jour:", userFound);
      setUserId(userFound.id);
      setAuthContextUserId(userFound.id);
      setUserPseudo(userFound.userpseudo);
      updateUserPseudo(userFound.userpseudoname);
      console.log("Utilisateur trouvé après mise à jour:", userFound);
      navigation.navigate('Home');
    } else {
      alert('Erreur : Identification ou mot de passe incorrect. Veuillez réessayer.');
    }
  };

  // Rendu du composant
  return (
    <ScrollView style={scrollView.scrollView}>
      <View style={baseStyle.container}>

        {/* Texte d'instruction pour l'utilisateur */}
        <Text style={{...baseStyle.text, fontSize: 40, marginTop: '5%'}}>{'\n'}HOLYCONNECT</Text>
        <Text style={{...baseStyle.text, fontSize: 25}}>ESPACE PROFESSIONNEL {'\n'}{'\n'}</Text>

        {/* Champ pour l'identifiant */}
        <Text style={{...baseStyle.text, fontSize: 20}}>Identification</Text>
        <View style={formStyle.input}>
          <TextInput
            style={formStyle.text}
            placeholder="Email ou Identifiant"
            value={userpseudoname}
            onChangeText={setUserPseudoName}
            autoCapitalize="none"
            selectionColor="#264A4A"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
        </View>

        {/* Champ pour le mot de passe */}
        <Text style={{...baseStyle.text, fontSize: 20}}>Mot de Passe</Text>
        <View style={formStyle.input}>
          <TextInput
            ref={passwordRef}
            style={formStyle.text}
            placeholder="Mot de Passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            autoCapitalize="none"
            selectionColor="#264A4A"
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          {/* Bouton pour afficher/masquer le mot de passe */}
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <FontAwesome name={hidePassword ? "eye-slash" : "eye"} size={20} color="grey"/>
          </TouchableOpacity>
        </View>

        {/* Bouton pour se connecter */}
        <Button
          title="Connecter"
          onPress={handleLogin}
        />
      </View>

      <Text>{'\n'}{'\n'}{'\n'}</Text>

      <Footer />
    </ScrollView>
  );
};

// Exportation du composant pour une utilisation dans d'autres fichiers
export default LoginScreen;
