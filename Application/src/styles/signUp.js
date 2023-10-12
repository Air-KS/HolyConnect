// src/styles/signUp.js

import { screenWidth, screenHeight } from './dimensions';
import { StyleSheet } from 'react-native';


const stylesSignUp = StyleSheet.create({
  signUp: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
  },

  input: {
    fontSize: screenWidth * 0.05,
    fontFamily: "CheeseBurger",
    height: 50,
    width: '70%',
    borderRadius: 25,
    borderWidth: 3,
    backgroundColor: '#E9E9E9',
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginLeft: '20%',
},

});


export default stylesSignUp;
