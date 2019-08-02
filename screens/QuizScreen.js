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
    currentIndex: 0,
    currentSide: 'front',
    correct: 0,
    incorrect: 0,
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { deckTitle } = this.props.navigation.state.params

    getDeck(deckTitle)
      .then( deck => {
        // dispatch(receiveDeck(deckTitle, deck))
        this.setState(() => ({
          deck,
        }))
      })
  }

  toggleSide = () => {
    const { currentSide } = this.state
    this.setState(()=> ({
      currentSide: currentSide === 'front' ? 'back' : 'front'
    })) 
  }

  goToNextCard = () => {
    const { deck, currentIndex } = this.state
    const cardCount = deck.questions.length

    if(currentIndex < cardCount - 1) {
      this.setState(()=> ({
        currentIndex: currentIndex + 1
      }))
    } 
  }

  markCorrect = () => {
    const { correct } = this.state
    this.setState(()=> ({
      correct: correct + 1
    }))
    this.goToNextCard()
  }

  markIncorrect = () => {
    const { incorrect } = this.state
    this.setState(()=> ({
      incorrect: incorrect + 1
    }))
    this.goToNextCard()
  }

  render() {
    const { 
      deck,
      currentIndex,
      currentSide
    } = this.state

    if(deck !== null) {
      const currentQuestion = deck.questions[currentIndex].question
      const currentAnswer = deck.questions[currentIndex].answer
      const cardCount = deck.questions.length

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
            <Text style={{color: '#bbb', fontSize: 12, textAlign: 'center'}}>{cardCount - currentIndex} {currentIndex !== 1  ? 'cards' : 'card'} left</Text>
            <Button onPress={this.markCorrect} success rounded style={[styles.markBtn, {marginTop: 50}]}>
              <Text>Mark Correct</Text>
            </Button>
            <Button onPress={this.markIncorrect} danger rounded style={[styles.markBtn, {marginTop: 15}]}>
              <Text>Mark Incorrect</Text>
            </Button>
          </View>  
        </Container>
      )
    }

    return null
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