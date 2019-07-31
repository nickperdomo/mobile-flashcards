import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View, 
} from 'react-native';

export default class DeckDetailScreen extends Component {
  static navigationOptions = {
    title: 'Deck Detail Screen',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Deck Detail Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
