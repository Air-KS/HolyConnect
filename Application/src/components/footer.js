// src/components/footer.js

// Importation des dépendances nécessaires
import React from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import stylesFooter from "../styles/footer";

// Composant Footer qui affiche le pied de page de l'application
const Footer = () => {

  // Fonction pour ouvrir une URL dans le navigateur par défaut
  const openURL = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Ne peut pas ouvrir l'URL: " + url);
      }
    });
  };

  // Fonction pour envoyer un e-mail en utilisant le client de messagerie par défaut
  const sendEmail = (email, subject = '', body = '') => {
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    openURL(url);
  };

  return (
    // Conteneur principal du pied de page
    <View style={stylesFooter.footerContainer}>

      {/* Section d'information à gauche */}
      <View style={stylesFooter.leftContainer}>
        <Text style={stylesFooter.title}>Pour en savoir plus :</Text>
        <Text style={stylesFooter.leftText}>
          Cette application est actuellement en développement. {'\n'}
          Elle est réalisée dans le cadre de l'école Holberton School
          et conclut la fin de la première année.
        </Text>
      </View>

      {/* Barre latérale de séparation */}
      <View style={stylesFooter.sidebar}></View>

      {/* Section de contact à droite */}
      <View style={stylesFooter.rightContainer}>
        <Text style={stylesFooter.title}>Nous contacter :</Text>

        {/* Liens d'e-mails pour contacter les développeurs */}
        <Text style={stylesFooter.rightText}>Mail : {'\n'}
          <TouchableOpacity onPress={() => sendEmail('zanamelodie@gmail.com')}>
            <Text style={{color: 'blue'}}>zanamelodie@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sendEmail('sebastienlenne@gmail.com')}>
            <Text style={{color: 'blue'}}>sebastienlenne@gmail.com{'\n'}</Text>
          </TouchableOpacity>
          {/* Lien vers le dépôt GitHub du projet */}
          <Text>Notre GitHub :{'\n'}</Text>
          <TouchableOpacity onPress={() => openURL('https://github.com/Air-KS/HolyConnect')}>
            <Text style={{color: 'blue'}}>HolyConnect</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  )
}

// Exportation du composant Footer pour une utilisation dans d'autres fichiers
export default Footer;
