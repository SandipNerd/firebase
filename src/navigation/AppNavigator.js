import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import AddFoodScreen from '../screens/AddFoodScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Food"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2ecc71',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Food_List"
        component={HomeScreen}
        options={{headerTitle: 'Food List'}}
      />
      <Stack.Screen
        name="New_Food"
        component={AddFoodScreen}
        options={{headerTitle: 'New Food'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
