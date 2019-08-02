import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DecksScreen from '../screens/DecksScreen';
import DeckDetailScreen from '../screens/DeckDetailScreen';
import AddDeckScreen from '../screens/AddDeckScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizResultsScreen from '../screens/QuizResultsScreen';


const DeckStack = createStackNavigator(
  {
    Decks: DecksScreen,
    DeckDetail: DeckDetailScreen,
    Quiz: QuizScreen,
    QuizResults: QuizResultsScreen,
  },
  {
    initialRouteName: "Decks"
  }
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
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} />
  ),
};
AddDeckStack.path = '';


const tabNavigator = createBottomTabNavigator({
  DeckStack,
  AddDeckStack,
});
tabNavigator.path = '';

export default tabNavigator;
