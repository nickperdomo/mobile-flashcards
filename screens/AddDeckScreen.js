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
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

class AddDeckScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add New Deck',  
    }
  }

  state = {
    deckTitle: '',
    disabled: true,
  }

  handleChangeText = (text) => {
    this.setState(() => ({
      deckTitle: text,
      disabled: text.length > 0 ? false : true
    }))
  }

  handleSubmit = () => {
    const { dispatch } = this.props
    const { deckTitle } = this.state

    saveDeckTitle(deckTitle)
      .then( deck => {
        dispatch(addDeck(deckTitle))
        this.props.navigation.navigate(
          'DeckDetail',
          {
            deckTitle: deckTitle,
            questionCount: 0
          }
        )
        this.clearInput()
      })
  }

  clearInput = () => {
    this.setState(() => ({
      deckTitle: '',
      disabled: true,
    }))

  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={{top:0}}>Deck Title</Label>
              <Input
                onChangeText={this.handleChangeText}
                value={this.state.deckTitle}
                blurOnSubmit
                returnKeyType='done'
              />
            </Item>
          </Form>
          <Button onPress={this.handleSubmit} disabled={this.state.disabled} rounded style={{alignSelf: 'center', marginTop: 45}}>
            <Text>Create Deck</Text>
          </Button>
        </Content>
      </View>
    )
  }
}

export default connect()(AddDeckScreen)