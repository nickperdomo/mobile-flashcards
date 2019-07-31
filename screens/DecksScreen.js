import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  // Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getAllDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import DeckCoverCard from '../components/DeckCoverCard'

const deviceWidth = Dimensions.get('window').width

class DecksScreen extends Component {
  static navigationOptions = {
    header: null,
    title: 'Decks',
  }

  state = {}

  componentDidMount() {
    const { dispatch } = this.props
    getAllDecks()
      .then( decks => dispatch(receiveDecks(decks)) )
  }

  renderDeck = ({item}) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail')}>
      <DeckCoverCard
        key={item.id}
        title={item.title}
        questionCount={item.questions.length}
      />
    </TouchableOpacity>  
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


const styles = StyleSheet.create({
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

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DecksScreen)