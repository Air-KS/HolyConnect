// src/styles/footer.js

import { StyleSheet } from 'react-native';

const stylesFooter = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row', // Pour positionner la barre latérale à gauche
    height: 170,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E9E9E9',
    borderWidth: 1,
    borderTopColor:'#000',
    width: '100%',
    marginTop: '10%',
  },
  sidebar: {
    width: 2,
    height: '80%',
    backgroundColor: '#000',
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: '#264A4A',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  },
  leftText: {
    color: '#264A4A',
    fontSize: 14,
    textAlign: 'left',
    flex: 1,
    paddingLeft: '5%',
  },
  rightText: {
    color: '#264A4A',
    fontSize: 14,
    textAlign: 'left',
    flex: 1,
    paddingLeft: '5%',
  },

});
export default stylesFooter;
