/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import StackNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#2ecc71" />
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
};

export default App;
