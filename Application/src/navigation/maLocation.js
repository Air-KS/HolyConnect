// src/navigation/maocation.js

// Importations nécessaires
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import infoLocation from '../styles/infoLocation';
import baseStyle from '../styles/baseStyle';

function MaLocation({ route, navigation }) {

  const { namelocation, infolocation } = route.params;

  return (
    <View style={baseStyle.container}>
    <View style={infoLocation.infoContainer}>
      <Text style={infoLocation.titreLocation}>
      {namelocation ? namelocation : 'Chargement...'}
      </Text>

      <ScrollView>
        <Text style={infoLocation.infoText}>
        {infolocation ? infolocation : 'Chargement...'}
        </Text>
      </ScrollView>
    </View>
    </View>
  );

}

export default MaLocation;
