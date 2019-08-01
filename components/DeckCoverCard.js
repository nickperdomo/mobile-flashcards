import React from 'react'
import {
  Card,
  CardItem,
  Body,
  Text 
} from 'native-base'
import Layout from '../constants/Layout'

const deviceWidth = Layout.window.width

export default DeckCoverCard = (props) => {
  const {
    title,
    questionCount,
  } = props

  return (
    <Card style={{maxWidth: deviceWidth * .9, minHeight: 180, justifyContent: 'center'}}>
      <CardItem header style={{justifyContent: 'center', paddingBottom: 10}}>
        <Text style={{fontSize: 28,textAlign: 'center'}}>{title}</Text>
      </CardItem>
      <CardItem style={{paddingTop: 0}}>
        <Body style={{alignItems: 'center'}}>
          <Text style={{color: '#bbb', textAlign: 'center'}}>{questionCount} {questionCount !== 1  ? 'cards' : 'card'}</Text>
        </Body>
      </CardItem>
    </Card>
  )
}
