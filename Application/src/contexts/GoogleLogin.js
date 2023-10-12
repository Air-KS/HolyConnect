import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

// Configurez Google Signin
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // Remplacez par votre Web Client ID
});

export const handleGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // Vous avez maintenant les informations de l'utilisateur dans userInfo
    // Vous pouvez mettre à jour votre contexte ou l'état de l'application ici
  } catch (error) {
    console.error(error);
  }
};
