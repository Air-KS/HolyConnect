import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export const handleFacebookLogin = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }
    // Vous avez maintenant le jeton d'accès de l'utilisateur dans data.accessToken
    // Vous pouvez mettre à jour votre contexte ou l'état de l'application ici
  } catch (error) {
    console.error(error);
  }
};
