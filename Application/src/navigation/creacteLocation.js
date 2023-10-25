// src/navigation/createLocation.js

// Importation des modules nécessaires
import React, { useState, useContext } from 'react';
import { View, ScrollView, Text, TextInput, Button } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { AuthContext, userId } from '../contexts/AuthContext';
import { saveUserLocationToFile } from '../utils/fileManager';
import scrollView from '../screens/scrollView';
import tabStyle from '../styles/tabBar';
import baseStyle from '../styles/baseStyle';
import formStyle from '../styles/formStyle';

// Les composants de chaque onglet
function InfoGeneral({ localTitre, setLocalTitre }) {
    // Composant pour les informations générales
}

// Composant pour l'adresse
function Adresse({ address, setAddress }) {
    // Composant pour l'adresse
}

// Layout initial pour l'onglet
const initialLayout = { width: '100%' };

// Composant représentant l'écran de création de location
function CreateLocation({ navigation }) {
    const { userId } = useContext(AuthContext);

    // États locaux pour le titre de la location et l'adresse
    const [localTitre, setLocalTitre] = useState('');
    const [address, setAddress] = useState('');

    // États pour l'onglet actif
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'infoGeneral', title: 'Info Générale' },
        { key: 'adresse', title: 'Adresse' }
    ]);

    // Fonction pour rendre le contenu de chaque onglet
    const renderScene = ({ route }) => {
        // Rendre le contenu en fonction de l'onglet actif
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Composant de TabView pour gérer les onglets */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        style={{ backgroundColor: '#2A6FC7' }}
                    />
                )}
            />
            <View style={{ padding: 30, backgroundColor: '#A6D2D2' }}>
                <Button
                    title="Sauvegarder"
                    onPress={async () => {
                        // Sauvegarder les informations de la nouvelle location
                        const newLocation = {
                            title: localTitre,
                            address: address,
                        };
                        await saveUserLocationToFile(userId, newLocation);
                        // Naviguer vers une autre interface avec les données de la location
                        navigation.navigate('UiInterface', {
                            locationTitle: localTitre,
                            locationAddress: address
                        });
                    }}
                />
            </View>
        </View>
    );
}

export default CreateLocation;
