import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
  StyleSheet,
  TouchableOpacity,
  View, 
} from 'react-native';
import {
  Container,
  Button,
  Text 
} from 'native-base'
import DeckCoverCard from '../components/DeckCoverCard'
import { getDeck } from '../utils/api'
import { receiveDeck } from '../actions'
import globalStyles from '../styles/global'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

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

  goToNextCard = () => {
    const { 
      deck,
      currentIndex,
      correct,
    } = this.state
    const cardCount = deck.questions.length

    if(currentIndex < cardCount - 1) {
      this.setState((prevState)=> ({
        currentIndex: prevState.currentIndex + 1
      }))
    } else if(currentIndex === cardCount - 1) {
      this.props.navigation.navigate(
        'QuizResults',
        {
          deckTitle: deck.title,
          questionCount: cardCount,
          correctPct: `${(correct / cardCount * 100).toFixed()}%`
        }
      )
      this.resetQuiz()
      
      clearLocalNotification()
        .then(setLocalNotification())
    } 
  }
  
  resetQuiz = () => {
    this.setState(()=> ({
      currentIndex: 0,
      currentSide: 'front',
      correct: 0,
    }))
  }

  markCorrect = () => {
    this.setState((prevState)=> ({
      correct: prevState.correct + 1
    }))
    this.goToNextCard()
  }

  markIncorrect = () => {
    this.goToNextCard()
  }

  toggleSide = () => {
    const { currentSide } = this.state
    this.setState(()=> ({
      currentSide: currentSide === 'front' ? 'back' : 'front'
    })) 
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
        <Container style={[globalStyles.container]}>
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