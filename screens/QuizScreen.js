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

  render() {
    const { deckTitle, questionCount } = this.props.navigation.state.params

    return (
      <Container style={[globalStyles.Container]}>
        <View style={[globalStyles.contentContainer, {flex: 1, justifyContent: 'center'}]}>
          <TouchableOpacity>
            <DeckCoverCard
              mode='quiz'
              title={deckTitle}
              questionCount={questionCount}
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