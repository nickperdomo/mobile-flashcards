import React from 'react'
import { 
  StyleSheet,
} from 'react-native';
import {
  Card,
  CardItem,
  Body,
  Text 
} from 'native-base'
import Layout from '../constants/Layout'

const deviceWidth = Layout.window.width

export default DeckCoverCard = (props) => {
  const { mode } = props

  if (mode === 'cover'){
    const {
      title,
      questionCount,
    } = props

    return (
      <Card style={styles.card}>
        <CardItem header style={{justifyContent: 'center', paddingBottom: 10}}>
          <Text style={{fontSize: 28, textAlign: 'center'}}>{title}</Text>
        </CardItem>
        <CardItem style={{paddingTop: 0}}>
          <Body style={{alignItems: 'center'}}>
            <Text style={{color: '#bbb', textAlign: 'center'}}>{questionCount} {questionCount !== 1  ? 'cards' : 'card'}</Text>
          </Body>
        </CardItem>
      </Card>
    )
  }

  if (mode === 'quiz'){
    const {
      question,
      answer,
      side,
    } = props

    return (
      <Card style={[styles.card]}>
        <CardItem header style={{justifyContent: 'center', paddingBottom: 0}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>{side === 'front' ? question : answer}</Text>
        </CardItem>
        <CardItem footer style={{alignSelf: 'center'}}>
          <Text style={{color: '#bbb', fontSize: 12, textAlign: 'center'}}>See {side === 'front' ? 'Answer' : 'Question'}</Text>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    maxWidth: deviceWidth * .9,
    minHeight: 180,
    justifyContent: 'center'
  },
});