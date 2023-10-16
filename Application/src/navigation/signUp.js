// src/navigation/signUp.js

// Importation des dépendances nécessaires
import React, { useState, useRef, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { readUserDataFromFile, saveUserDataToFile } from '../utils/fileManager';
import { FontAwesome } from '@expo/vector-icons';
import stylesBulText from '../styles/bulText';
import scrollView from '../screens/scrollView';
import Footer from '../components/footer';
import formStyle from '../styles/formStyle';

// Composant principal de la page d'inscription
const SignUpScreen = ({ navigation }) => {

  // Initialisation des états pour les champs du formulaire
  const [username, setUsername] = useState('');
  const [userfirstname, setUserFirstName] = useState('');
  const [userpseudoname, setUserPseudoName] = useState('');
  const [useremail, setEmail] = useState('');
  const [userpassword, setPassword] = useState('');

  // État pour gérer la visibilité du mot de passe
  const [hidePassword, setHidePassword] = useState(true);

  // Initialisation des états pour les erreurs de validation
  const [usernameError, setUsernameError] = useState('');
  const [userfirstnameError, setUserFirstNameError] = useState('');
  const [userpseudonameError, setUserPseudoNameError] = useState('');
  const [useremailError, setEmailError] = useState('');
  const [userpasswordError, setPasswordError] = useState('');

  // Références pour la gestion du focus entre les champs du formulaire
  const usernameRef = useRef(null);
  const userfirstnameRef = useRef(null);
  const userpseudonameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Utilisation du contexte d'authentification pour gérer la connexion
  const { setUserLoggedIn } = useContext(AuthContext);

  // Fonction pour valider les champs du formulaire
  const validateForm = () => {
    let isValid = true;

    // Vérification de chaque champ et mise à jour des erreurs si nécessaire
    if (!username) {
      setUsernameError('Nom requis');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!userfirstname) {
      setUserFirstNameError('Prénom requis');
      isValid = false;
    } else {
      setUserFirstNameError('');
    }

    if (!userpseudoname) {
      setUserPseudoNameError('Pseudo requis');
      isValid = false;
    } else {
      setUserPseudoNameError('');
    }

    if (!useremail) {
      setEmailError('Email requis');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!userpassword) {
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
      const existingUsers = await readUserDataFromFile();

      // Vérification si l'utilisateur existe déjà
      const userExists = existingUsers.some(user => user.userpseudoname === userpseudoname || user.useremail === useremail);
      if (userExists) {
        alert("Ce pseudo ou cet e-mail existe déjà !");
        return;
      }

      // Création de l'objet utilisateur
      const userData = {
        username: username,
        userfirsname: userfirstname,
        userpseudoname: userpseudoname,
        useremail: useremail,
        userpassword: userpassword
      };

      // Enregistrement des données de l'utilisateur
      await saveUserDataToFile(userData);
      setUserLoggedIn(true);
      navigation.navigate('Home');
    }
  };

  // Rendu du composant
  return (
    <ScrollView style={scrollView.scrollView}>
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
      <Text> {'\n'} </Text>

      {/* Formulaire d'inscription */}
      <View style={formStyle.container}>

        {/* Nom */}
        {usernameError ? <Text style={formStyle.errorText}>{usernameError} </Text> : null}
        <View style={[formStyle.input, usernameError ? { borderColor: 'red' } : {}]}>
          <TextInput
            style={formStyle.text}
            ref={usernameRef}
            placeholder="Nom"
            selectionColor="#264A4A"
            value={username}
            onChangeText={setUsername}
            onSubmitEditing={() => userfirstnameRef.current.focus()}
          />
        </View>

        {/* Prenom */}
        {userfirstnameError ? <Text style={formStyle.errorText}>{userfirstnameError}</Text> : null}
        <View style={[formStyle.input, userfirstnameError ? { borderColor: 'red' } : {}]}>
          <TextInput
            style={formStyle.text}
            ref={userfirstnameRef}
            placeholder="Prénom"
            selectionColor="#264A4A"
            value={userfirstname}
            onChangeText={setUserFirstName}
            onSubmitEditing={() => userpseudonameRef.current.focus()}
          />
        </View>

        {/* Pseudo */}
        {userpseudonameError ? <Text style={formStyle.errorText}>{userpseudonameError}</Text> : null}
        <View style={[formStyle.input, userpseudonameError ? { borderColor: 'red' } : {}]}>
          <TextInput
            style={formStyle.text}
            ref={userpseudonameRef}
            placeholder="Pseudo"
            selectionColor="#264A4A"
            value={userpseudoname}
            onChangeText={setUserPseudoName}
            onSubmitEditing={() => emailRef.current.focus()}
          />
        </View>

        {/* Email */}
        {useremailError ? <Text style={formStyle.errorText}>{useremailError}</Text> : null}
        <View style={[formStyle.input, useremailError ? { borderColor: 'red' } : {}]}>
          <TextInput
            style={formStyle.text}
            ref={emailRef}
            placeholder="Email"
            value={useremail}
            onChangeText={setEmail}
            selectionColor="#264A4A"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
        </View>

        {/* Password */}
        {userpasswordError ? <Text style={formStyle.errorText}>{userpasswordError}</Text> : null}
        <View style={[formStyle.input, useremailError ? { borderColor: 'red' } : {}]}>
          <TextInput
            style={formStyle.text}
            ref={passwordRef}
            placeholder="Mot de Passe"
            value={userpassword}
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
