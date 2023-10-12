// src/navigation/signUpScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import stylesSignUp from '../styles/signUp';
import stylesBulText from '../styles/bulText';
import stylesScrollView from '../styles/scrollView';
import ScreenWrapper from '../components/screenWrapper';
import { readUserDataFromFile, saveUserDataToFile } from '../utils/fileManager';


const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [userfirstname, setUserFirstName] = useState('');
  const [userpseudoname, setUserPseudoName] = useState('');
  const [useremail, setEmail] = useState('');
  const [userpassword, setPassword] = useState('');
  const [hidePassword] = useState(true); //

  const [usernameError, setUsernameError] = useState('');
  const [userfirstnameError, setUserFirstNameError] = useState('');
  const [userpseudonameError, setUserPseudoNameError] = useState('');
  const [useremailError, setEmailError] = useState('');
  const [userpasswordError, setPasswordError] = useState('');

  // Utilisation du contexte d'authentification
  const { setUserLoggedIn } = useContext(AuthContext);

  const validateForm = () => {
    let isValid = true;

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

  const handleSignUp = async () => {
    if (validateForm()) {
      const existingUsers = await readUserDataFromFile();
      console.log("Stored Data:", existingUsers);

      const userExists = existingUsers.some(user => user.userpseudoname === userpseudoname || user.useremail === useremail);
      if (userExists) {
        alert("Ce pseudo ou cet e-mail existe déjà !");
        return;
      }

      const userData = {
        username: username,
        userfirsname: userfirstname,
        userpseudoname: userpseudoname,
        useremail: useremail,
        userpassword: userpassword
      };

      await saveUserDataToFile(userData);
      setUserLoggedIn(true);
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView style={stylesScrollView.scrollView} contentContainerStyle={stylesSignUp.contentContainer}>
      <ScreenWrapper>

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

        <View style={stylesSignUp.container}>
        {usernameError ? <Text style={stylesSignUp.errorText}>{usernameError}</Text> : null}
          <TextInput
            placeholder="Nom"
            selectionColor="#264A4A"
            value={username}
            onChangeText={setUsername}
            style={[stylesSignUp.input, usernameError ? { borderColor: 'red' } : {}]}
          />

          {userfirstnameError ? <Text style={stylesSignUp.errorText}>{userfirstnameError}</Text> : null}
          <TextInput
            placeholder="Prénom"
            selectionColor="#264A4A"
            value={userfirstname}
            onChangeText={setUserFirstName}
            style={[stylesSignUp.input, userfirstnameError ? { borderColor: 'red' } : {}]}
          />

          {userpseudonameError ? <Text style={stylesSignUp.errorText}>{userpseudonameError}</Text> : null}
          <TextInput
            placeholder="Pseudo"
            selectionColor="#264A4A"
            value={userpseudoname}
            onChangeText={setUserPseudoName}
            style={[stylesSignUp.input, userpseudonameError ? { borderColor: 'red' } : {}]}
          />

          {useremailError ? <Text style={stylesSignUp.errorText}>{useremailError}</Text> : null}
          <TextInput
            placeholder="Email"
            value={useremail}
            onChangeText={setEmail}
            selectionColor="#264A4A"
            style={[stylesSignUp.input, useremailError ? { borderColor: 'red' } : {}]}
          />

          {userpasswordError ? <Text style={stylesSignUp.errorText}>{userpasswordError}</Text> : null}
          <TextInput
            style={[stylesSignUp.input, userpasswordError ? { borderColor: 'red' } : {}]}
            selectionColor="#264A4A"
            placeholder="Mot de passe"
            value={userpassword}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Button title="S'inscrire" onPress={handleSignUp} />
        </View>
      </ScreenWrapper>
    </ScrollView>
  );
};

export default SignUpScreen;
