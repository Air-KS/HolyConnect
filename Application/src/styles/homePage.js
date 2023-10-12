// src/styles/stylesHomePage.js

import {StyleSheet } from 'react-native';

const commonStyles = {
  backgroundColor: '#A6D2D2',
  alignItems: 'center',
}

const stylesHomePage = StyleSheet.create({
  homePage: {
    flex: 1,
    ...commonStyles,
  },

  search: {
    // position: 'absolute',
    marginTop: '10%',
    left: 0,
    right: 0,
    zIndex: 1,
    ...commonStyles,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },

  textInputSearch: {
    fontFamily: "CheeseBurger",
    fontSize: 30,
    width: '55%',
    height: 55,
    borderRadius: 25,
    borderColor: 'gray',
    backgroundColor: '#E9E9E9',
    borderWidth: 3,
    paddingHorizontal: 28,
  },


  searchButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#C3C3C3',
    borderRadius: 25,
    width: 35,
    height: 35,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchImage: {
    width: 40,
    height: 40,
  },
  page: {
    flex: 1,
    //...commonStyles,
    alignItems: 'center',
    marginTop: '15%',

  },

  text: {
    fontSize: 28,
    color: '#264A4A',
    textAlign: 'center',
  },
});

export default stylesHomePage;
