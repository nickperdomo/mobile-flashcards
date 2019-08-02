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

export default class DeckDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('cardTitle', 'Deck'),
    }
  }
  
  handleStart = () => {
    const { deckTitle } = this.props.navigation.state.params

    this.props.navigation.navigate(
      'Quiz',
      { deckTitle }
    )
  }

  render() {
    const { deckTitle, questionCount } = this.props.navigation.state.params

    return (
      <Container style={[globalStyles.container]}>
        <View style={[globalStyles.contentContainer, {flex: 1, justifyContent: 'center'}]}>
          <DeckCoverCard
            mode='cover'
            title={deckTitle}
            questionCount={questionCount}
          />
          <Button light rounded style={{alignSelf: 'center', marginTop: 15}}>
            <Text>Add Card</Text>
          </Button>
        </View>  
        <Button onPress={this.handleStart} success full style={{justifyContent: 'center'}}>
            <Text>Start Quiz</Text>
        </Button>
      </Container>
    )
  }
}