import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getAllDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'

class DecksScreen extends Component {
  state = {}

  componentDidMount() {
    const { dispatch } = this.props
    
    getAllDecks()
      .then( decks => dispatch(receiveDecks(decks)) )
  }

  renderDeck = ({item}) => (
    <View key={item.id}>
      <Text>{'Decks: ' + item.title}</Text>
    </View>
  )

  render() {
    const { decks } = this.props
    const decksList = Object.keys(decks).map( deckId => {     
      return {
        key: deckId,
        deck: decks[deckId],
        title: decks[deckId].title,
        questions: decks[deckId].questions,
      }
    })

    return (
      <View style={styles.container}>
        <FlatList
          data={decksList}
          renderItem={this.renderDeck}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    )
  }
}

DecksScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
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

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DecksScreen)