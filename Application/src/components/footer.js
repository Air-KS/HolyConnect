// src/components/footer.js

import React from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import stylesFooter from "../styles/footer";

const Footer = () => {

  const openURL = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Ne peu pas ouvrire l'URL" + url);
      }
    });
  };

  const sendEmail = (email, subject = '', body = '') => {
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    openURL(url);
  };

  return (
    <View style={stylesFooter.footerContainer}>


      <View style={stylesFooter.leftContainer}>
      <Text style={stylesFooter.title}>Pour en savoir plus :</Text>
      <Text style={stylesFooter.leftText}>
      Cette application est actuellement en développement. {'\n'}
      Elle est réalisée dans le cadre de l'école Holberton School
      et conclut la fin de la première année.
      </Text>

      </View>

      <View style={stylesFooter.sidebar}></View>

      <View style={stylesFooter.rightContainer}>

      <Text style={stylesFooter.title}>Nous contacter :</Text>
      <Text style={stylesFooter.rightText}>Mail : {'\n'}
      <TouchableOpacity onPress={() => sendEmail('zanamelodie@gmail.com')}>
            <Text style={{color: 'blue'}}>zanamelodie@gmail.com</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sendEmail('sebastienlenne@gmail.com')}>
            <Text style={{color: 'blue'}}>sebastienlenne@gmail.com{'\n'}</Text>
      </TouchableOpacity>

      <Text>Notre GitHub :{'\n'}</Text>

      <TouchableOpacity onPress={() => openURL('https://github.com/Air-KS/HolyConnect')}>
            <Text style={{color: 'blue'}}>HolyConnect</Text>
      </TouchableOpacity>

      </Text>
      </View>
    </View>
  )
}

export default Footer;
