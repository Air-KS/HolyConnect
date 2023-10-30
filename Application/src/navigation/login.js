// src/navigation/login.js

// Importation des dépendances nécessaires
import React, { useState, useRef, useContext } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from '../contexts/AuthContext';
import baseStyle from '../styles/baseStyle';
import formStyle from '../styles/formStyle';
import scrollView from '../screens/scrollView';
import Footer from '../components/footer';
import { FontAwesome } from '@expo/vector-icons';

// Composant principal de la page de connexion
const LoginScreen = ({ navigation }) => {

  // États pour suivre les valeurs entrées par l'utilisateur
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true); // État pour masquer/afficher le mot de passe

  // Utilisation du contexte d'authentification
  const { setUserLoggedIn, setAuthContextUserId, setUserPseudo, updateUserPseudo } = useContext(AuthContext);

  // Référence pour le champ du mot de passe
  const passwordRef = useRef(null);

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.17:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

    // Logg pour la connexion au serveur et les donnée envoyées
      console.log("Code de statut:", response.status);
      console.log("Données envoyées:", { email, password, username });

      const data = await response.json();

      console.log("Mot de passe envoyé:", password);

      // Vérification de la réponse du serveur
      if (response.ok && data.token) {
        console.log("Réponse du serveur:", data);
        setUserLoggedIn(true);
        setUserId(data.userId);
        setAuthContextUserId(data.userId);
        updateUserPseudo(data.username);
        navigation.navigate('Home');
      } else {
        console.log("Data:", data);
        alert('Erreur : Identification ou mot de passe incorrect. Veuillez réessayer.');
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert('Une erreur s’est produite. Veuillez réessayer.');
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
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
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
