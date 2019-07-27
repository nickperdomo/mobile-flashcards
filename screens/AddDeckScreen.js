import React from 'react';
import { 
  StyleSheet,
  Text,
  View, 
} from 'react-native';

export default function AddDeckScreen() {
  return (
    <View style={styles.container}>
      <Text>Add Deck Screen</Text>
    </View>
  );
}

AddDeckScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
