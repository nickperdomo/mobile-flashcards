import React, { Component } from 'react';
import {
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
} from 'native-base'
import Layout from '../constants/Layout'
import globalStyles from '../styles/global'
import { getAllDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import DeckCoverCard from '../components/DeckCoverCard'

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
    <TouchableOpacity onPress={() => this.props.navigation.navigate(
      'DeckDetail',
      {
        deckTitle: item.title,
        questionCount:  item.questions.length
      }
      )}>
      <DeckCoverCard
        mode='cover'
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
    }).sort((a,b) => (a.title > b.title) ? 1 : -1)

    return (
      <Container>
        <Content>
          <FlatList
            data={decksList}
            renderItem={this.renderDeck}
            style={globalStyles.container}
            contentContainerStyle={globalStyles.contentContainer}
          />
        </Content>
      </Container>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DecksScreen)