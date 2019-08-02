import React, { Component } from 'react';
import { 
  StyleSheet,
  View, 
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text 
} from 'native-base'
import DeckCoverCard from '../components/DeckCoverCard'
import globalStyles from '../styles/global'

export default class QuizResultsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('deckTitle', '') + ' Quiz Results',
      headerLeft: null,
    }
  }
  
  handleRestart = () => {
    const { deckTitle } = this.props.navigation.state.params

    this.props.navigation.navigate(
      'Quiz',
      { deckTitle }
    )
  }

  backToDeck = () => {
    const {
      deckTitle,
      questionCount,
    } = this.props.navigation.state.params

    this.props.navigation.navigate(
      'DeckDetail',
      {
        deckTitle,
        questionCount,
      }
    )
  }


  render() {
    const { correctPct } = this.props.navigation.state.params

    return (
      <Container style={[globalStyles.container]}>
        <View style={[globalStyles.contentContainer, {flex: 1, justifyContent: 'center'}]}>
          <Text style={{marginBottom: -20, fontSize: 112, textAlign: 'center'}}>{correctPct}</Text>
          <Text style={{fontSize: 56, textAlign: 'center', textTransform: 'uppercase'}}>correct</Text>
          <Button onPress={this.backToDeck} light rounded style={{alignSelf: 'center', marginTop: 45}}>
            <Text>Back to Deck</Text>
          </Button>
        </View>  
        <Button onPress={this.handleRestart} success full style={{justifyContent: 'center'}}>
            <Text>Restart Quiz</Text>
        </Button>
      </Container>
    )
  }
}