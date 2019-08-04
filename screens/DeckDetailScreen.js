import React, { Component } from 'react';
import { 
  View, 
} from 'react-native';
import {
  Container,
  Button,
  Text 
} from 'native-base'
import DeckCoverCard from '../components/DeckCoverCard'
import { getDeck } from '../utils/api'
import globalStyles from '../styles/global'

export default class DeckDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('cardTitle', 'Deck'),
    }
  }
  
  state = {
    deck: null,
    id: '',
  }

  componentDidMount() {
    const { deckTitle } = this.props.navigation.state.params
    getDeck(deckTitle)
      .then( deck => {
        this.setState(() => ({
          deck: deck,
          id: deck.title,
        }))
      })
  }

  handleStart = () => {
    const { deckTitle } = this.props.navigation.state.params

    this.props.navigation.navigate(
      'Quiz',
      { deckTitle }
    )
  }

  handleAddCard = () => {
    const { deck, id } = this.state

    this.props.navigation.navigate(
      'AddCard',
      { 
        deckTitle: id,
        deck,
      }
    )
  }

  render() {
    const { deckTitle, questionCount } = this.props.navigation.state.params
    let btnProps
    questionCount > 0
      ? btnProps = {success: true, disabled: false}
      : btnProps = {success: false, disabled: true}

    return (
      <Container style={[globalStyles.container]}>
        <View style={[globalStyles.contentContainer, {flex: 1, justifyContent: 'center'}]}>
          <DeckCoverCard
            mode='cover'
            title={deckTitle}
            questionCount={questionCount}
          />
          <Button 
            onPress={this.handleAddCard}
            light
            rounded
            style={{alignSelf: 'center', marginTop: 15}}>
            <Text>Add Card</Text>
          </Button>
        </View>  
        <Button
          onPress={this.handleStart}
          full
          style={{justifyContent: 'center'}}
          {...btnProps}
          >
          <Text>Start Quiz</Text>
        </Button>
      </Container>
    )
  }
}