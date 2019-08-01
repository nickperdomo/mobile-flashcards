import React from 'react'
import {
  Platform,
  StyleSheet,
} from 'react-native';
import Layout from '../constants/Layout'

const deviceWidth = Layout.window.width

export default globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    contentContainer: {
      paddingTop: 30,
      paddingLeft: deviceWidth * .05,
      paddingRight: deviceWidth * .05,
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
  
  });
