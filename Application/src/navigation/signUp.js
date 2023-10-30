// src/navigation/signUp.js

// Importation des dépendances nécessaires
import React, { useState, useRef, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import stylesBulText from '../styles/bulText';
import scrollView from '../screens/scrollView';
import Footer from '../components/footer';
import formStyle from '../styles/formStyle';
import baseStyle from '../styles/baseStyle';

// Composant principal de la page d'inscription
const SignUpScreen = ({ navigation }) => {

  // Initialisation des états pour les champs du formulaire
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // État pour gérer la visibilité du mot de passe
  const [hidePassword, setHidePassword] = useState(true);

  // Initialisation des états pour les erreurs de validation
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Références pour la gestion du focus entre les champs du formulaire
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // État pour gérer les erreurs générales
  const [generalError, setGeneralError] = useState('');

  // Utilisation du contexte d'authentification pour gérer la connexion
  const { setUserLoggedIn, updateUserPseudo } = useContext(AuthContext);

  // Fonction pour valider les champs du formulaire
  const validateForm = () => {
    let isValid = true;
    // Validation du champ 'Nom utilisateur'
    if (!username) {
      setUsernameError('Nom utilisateur requis');
      isValid = false;
    } else {
      setUsernameError('');
    }
    // Validation du champ 'Email'
    if (!email) {
      setEmailError('Email requis');
      isValid = false;
    } else {
      setEmailError('');
    }
    // Validation du champ 'Mot de passe'
    if (!password) {
      setPasswordError('Mot de passe requis');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  // Fonction pour gérer l'inscription de l'utilisateur
  const handleSignUp = async () => {
    if (validateForm()) {

      // Création de l'objet utilisateur avec les données saisies
      const userData = {
        username: username,
        email: email,
        password: password
      };

      // Tentative d'enregistrement de l'utilisateur via l'API
      try {
        const response = await fetch("http://192.168.1.17:3000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        });

        const result = await response.json();

        // Ajoute un log pour voir la réponse du Statut
        console.log("Statut:", response.status);

        // Si la réponse est positive, l'utilisateur est redirigé vers la page d'accueil
        if (response.status >= 200 && response.status < 300 && result) {
          console.log("Enregistrement réussi");
          setUserLoggedIn(true);
          updateUserPseudo(username);
          navigation.navigate('Home');
          console.log("Réponse du serveur:", result, userData);
        } else {
          // Gestion des erreurs potentielles renvoyées par l'API
          if (result && result.error) {
            setGeneralError(result.error);
            alert(result.error);
          }
          console.log("Enregistrement échoué");
        }
      } catch (error) {
        // Gestion des erreurs de réseau
        console.log("Erreur réseau lors de l'enregistrement");
        setGeneralError("Erreur réseau");
        alert("Erreur réseau");
      }
    }
  };

  // Rendu du composant
  return (
    <ScrollView style={scrollView.scrollView}>

      <Text style={{...baseStyle.text, fontSize: 40}}>{'\n'}HOLYCONNECT</Text>
      <Text style={{...baseStyle.text, fontSize: 25}}>INSCRIVEZ-VOUS</Text>

      {/* Informations pour l'utilisateur */}
      <View style={stylesBulText.infoText}>
        <Text style={{fontWeight: 'bold', textAlign: 'center', width: '100%'}}>
          Informations pour l'inscription :{'\n'}
        </Text>
        <Text>
          Veuillez saisir vos informations.{'\n'}
          <Text style={{textDecorationLine: 'underline'}}>
            Les données entrées ici sont fictives
          </Text>
            , et sont enregistrées en local à titre d'exemple pour le portfolio.{'\n'}
        </Text>
      </View>
      <Text></Text>

      {/* Formulaire d'inscription */}
      <View style={formStyle.container}>

        {/* Pseudo */}
        {usernameError ? <Text style={formStyle.errorText}>{usernameError}</Text> : null}
        <View style={[formStyle.input, usernameError ? { borderColor: 'red' } : {}]}>
          <TextInput
            style={formStyle.text}
            ref={usernameRef}
            placeholder="Nom d'utilisateur"
            selectionColor="#264A4A"
            value={username}
            onChangeText={setUsername}
            onSubmitEditing={() => emailRef.current.focus()}
          />
        </View>

        {/* Email */}
        {emailError ? <Text style={formStyle.errorText}>{emailError}</Text> : null}
        <View style={[formStyle.input, emailError ? { borderColor: 'red' } : {}]}>
          <TextInput
            style={formStyle.text}
            ref={emailRef}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            selectionColor="#264A4A"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
        </View>

        {/* Password */}
        {passwordError ? <Text style={formStyle.errorText}>{passwordError}</Text> : null}
        <View style={[formStyle.input, emailError ? { borderColor: 'red' } : {}]}>
          <TextInput
            style={formStyle.text}
            ref={passwordRef}
            placeholder="Mot de Passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword} // Cache le Mot de Passe
            autoCapitalize="none"
            selectionColor="#264A4A"
            returnKeyType="done"
            onSubmitEditing={handleSignUp}
          />

          {/* Bouton pour afficher/masquer le Mot de Passe */}
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <FontAwesome name={hidePassword ? "eye-slash" : "eye"} size={20} color="grey"/>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bouton pour s'inscrire */}
      <Button title="S'inscrire" onPress={handleSignUp} />

      <Footer />
    </ScrollView>
  );
};

// Exportation du composant pour une utilisation dans d'autres fichiers
export default SignUpScreen;
