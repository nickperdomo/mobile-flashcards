import React, { Component } from 'react';
import {
  // StyleSheet,
  View, 
} from 'react-native';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Button, 
} from 'native-base'
import globalStyles from '../styles/global'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';

class AddCardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add New Card',  
    }
  }

  state = {
    questionText: '',
    answerText: '',
    disabled: true,
  }

  handleChangeText = (text, inputKey) => {
    const { questionText, answerText } = this.state
    let stateUpdates

    inputKey === 'questionText'
      ? stateUpdates = { questionText: text }
      : stateUpdates = { answerText: text }

    this.setState(() => ({
      ...stateUpdates,
      disabled: questionText.length === 0 || answerText.length === 0,
    }))
  }

  handleSubmit = () => {
    const { dispatch, deck } = this.props
    const { questionText, answerText } = this.state
    const { deckTitle } = this.props.navigation.state.params
    const card = {
      question: questionText,
      answer: answerText,
    }
    const backAction = NavigationActions.back()

    deck.questions.push(card)
    addCardToDeck(deckTitle, deck.questions)
      .then( () => {
        // console.log('results:', results)
        dispatch(addCard(deckTitle, card))
      //   // this.props.navigation.navigate(
      //   //   'DeckDetail',
      //   //   {
      //   //     deckTitle: deckTitle,
      //   //     questionCount: 0
      //   //   }
      //   // )
        this.props.navigation.dispatch(backAction)
        this.clearInput()
      })
  }

  clearInput = () => {
    this.setState(() => ({
      questionText: '',
      answerText: '',
      disabled: true,
    }))

  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label style={{top:0}}>Question</Label>
              <Input
                onChangeText={(text) => this.handleChangeText(text, 'questionText')}
                value={this.state.questionText}
                blurOnSubmit={false}
                returnKeyType='done'
              />
            </Item>
            <Item stackedLabel>
              <Label style={{top:0}}>Answer</Label>
              <Input
                onChangeText={(text) => this.handleChangeText(text, 'answerText')}
                value={this.state.answerText}
                blurOnSubmit
                returnKeyType='done'
              />
            </Item>
          </Form>
          <Button onPress={this.handleSubmit} disabled={this.state.disabled} rounded style={{alignSelf: 'center', marginTop: 45}}>
            <Text>Add Card</Text>
          </Button>
        </Content>
      </View>
    )
  }
}


function mapStateToProps (state, { navigation }) {
  const { deck, id } = navigation.state.params
  return { deck, id }
}

export default connect(mapStateToProps)(AddCardScreen)