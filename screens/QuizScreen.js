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

export default class QuizScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('deckTitle', 'Quiz')} Quiz`,
      
    }
  }

  render() {
    const { deckTitle, questionCount } = this.props.navigation.state.params

    return (
      <Container style={[globalStyles.Container]}>
        <View style={[globalStyles.contentContainer, {flex: 1, justifyContent: 'center'}]}>
          <DeckCoverCard
            title={deckTitle}
            questionCount={questionCount}
          />
          <Button light rounded style={{alignSelf: 'center', marginTop: 15}}>
            <Text>Add Card</Text>
          </Button>
        </View>  
        <Button success full style={{justifyContent: 'center'}}>
            <Text>Start Quiz</Text>
        </Button>
      </Container>
    )
  }
}