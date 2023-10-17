// src/navigation/createLocation.js

// Importation des modules nécessaires
import React, { useState, useContext } from 'react';
import { View, ScrollView, Text, TextInput, Button } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { AuthContext } from '../contexts/AuthContext';
import scrollView from '../screens/scrollView';
import tabStyle from '../styles/tabBar';
import baseStyle from '../styles/baseStyle';
import formStyle from '../styles/formStyle';

// Les composants de chaque onglet
function InfoGeneral({ localTitre, setLocalTitre }) {
    return (
        <ScrollView style={scrollView.scrollView}>
            <View style={[tabStyle.scene]}>
                <Text>Informations générales</Text>
                <Text style={{ ...baseStyle.text, fontSize: 20 }}>Nom de location</Text>
                <View style={formStyle.input}>
                    <TextInput
                        style={formStyle.text}
                        placeholder="Nom de location"
                        value={localTitre}
                        onChangeText={setLocalTitre}
                        autoCapitalize="none"
                        selectionColor="#264A4A"
                        returnKeyType="next"
                    />
                </View>
            </View>
        </ScrollView>
    );
}

function Adresse({ address, setAddress }) {
    return (
        <ScrollView style={scrollView.scrollView}>
            <View style={[tabStyle.scene]}>
                <Text>Adresse</Text>
                <Text style={{ ...baseStyle.text, fontSize: 20 }}>Adresse Complète</Text>
                <View style={formStyle.input}>
                    <TextInput
                        style={formStyle.text}
                        placeholder="Adresse Complète"
                        value={address}
                        onChangeText={setAddress}
                        autoCapitalize="none"
                        selectionColor="#264A4A"
                        returnKeyType="next"
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const initialLayout = { width: '100%' };

// Composant représentant l'écran d'accueil
function CreateLocation({ navigation }) {

    const [localTitre, setLocalTitre] = useState('');
    const [address, setAddress] = useState('');

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'infoGeneral', title: 'Info Générale' },
        { key: 'adresse', title: 'Adresse' }
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'infoGeneral':
                return <InfoGeneral localTitre={localTitre} setLocalTitre={setLocalTitre} />;
            case 'adresse':
                return <Adresse address={address} setAddress={setAddress} />;
            default:
                return null;
        }
    };

    return (
        <View style={{ flex: 1 }}>
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
                      //await saveUserLocationFromFile(userId, localTitre);
                      navigation.navigate('Location', {
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
