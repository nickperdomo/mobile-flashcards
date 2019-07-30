import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DecksScreen from '../screens/DecksScreen';
import AddDeckScreen from '../screens/AddDeckScreen';


const DeckStack = createStackNavigator(
  {
    Decks: DecksScreen,
  },
  // config
);

DeckStack.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-photos'
    />
  ),
};
DeckStack.path = '';

const AddDeckStack = createStackNavigator(
  {
    AddDeck: AddDeckScreen,
  },
  // config
);

AddDeckStack.navigationOptions = {
  tabBarLabel: 'Add Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add-circle' : 'add-circle'} />
  ),
};
AddDeckStack.path = '';


const tabNavigator = createBottomTabNavigator({
  DeckStack,
  AddDeckStack,
});
tabNavigator.path = '';

export default tabNavigator;