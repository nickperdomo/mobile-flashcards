import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
  StyleSheet,
  TouchableOpacity,
  View, 
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text 
} from 'native-base'
import DeckCoverCard from '../components/DeckCoverCard'
import { getDeck } from '../utils/api'
import { receiveDeck } from '../actions'
import globalStyles from '../styles/global'

class QuizScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = `${navigation.getParam('deckTitle', '')}`
    return {
      title: `${title} Quiz`,  
    }
  }
  
  state = {
    deck: null,
    currentCard: null,
    currentQuestion: null,
    currentAnswer: null,
    currentSide: 'front',
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { deckTitle } = this.props.navigation.state.params

    getDeck(deckTitle)
      .then( deck => {
        // dispatch(receiveDeck(deckTitle, deck))
        this.setState(() => ({
          deck,
          currentCard: deck.questions[0],
          currentQuestion: deck.questions[0].question,
          currentAnswer: deck.questions[0].answer,
        }))
      })
  }

  toggleSide = () => {
    const { currentSide } = this.state
    this.setState(()=> ({
      currentSide: currentSide === 'front' ? 'back' : 'front'
    })) 
  }

  render() {
    const { deckTitle, questionCount } = this.props.navigation.state.params
    const { currentQuestion, currentAnswer, currentSide } = this.state

    return (
      <Container style={[globalStyles.Container]}>
        <View style={[globalStyles.contentContainer, {flex: 1, justifyContent: 'center'}]}>
          <TouchableOpacity onPress={this.toggleSide}>
            <DeckCoverCard
              mode='quiz'
              question={currentQuestion}
              answer={currentAnswer}
              side={currentSide}
            />
          </TouchableOpacity> 
          <Button success rounded style={[styles.markBtn, {marginTop: 50}]}>
            <Text>Mark Correct</Text>
          </Button>
          <Button danger rounded style={[styles.markBtn, {marginTop: 15}]}>
            <Text>Mark Incorrect</Text>
          </Button>
        </View>  
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  markBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    minWidth: 150
  },
});

export default connect()(QuizScreen)