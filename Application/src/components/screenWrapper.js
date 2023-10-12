import React from 'react';
import { View, ScrollView } from 'react-native'
import Footer from './footer';
import stylesScreenWrapper from "../styles/screenWrapper";
import stylesScrollView from '../styles/scrollView';

function ScreenWrapper({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={stylesScrollView.scrollView}>
        <View style={stylesScreenWrapper.wrapperContainer}>
          {children}
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}

export default ScreenWrapper;
