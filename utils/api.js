import { AsyncStorage } from 'react-native'
import starterDecks from './starterDecks'

const STORAGE_KEY = 'udaciMobileFlashCards'
const DEBUG_MODE = false


// API Helpers
const formatKey = (str) => {
  return str.replace(/[^A-Za-z0-9\s]/g,"").replace(/\s+/g, '')
}

const hasDecks = (decks) => {
  return decks === null
    ? AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(starterDecks))
    : JSON.parse(decks)
}


// API Methods
export const getAllDecks = async () => {
  try {
    DEBUG_MODE && AsyncStorage.clear()

    const decks = await AsyncStorage.getItem(STORAGE_KEY)
    return hasDecks(decks)

  } catch(error) {
    console.log("Can't getDecks", error)
  }
}


export const getDeck = async (id) => {
  try {
    const deckStorage = await AsyncStorage.getItem(STORAGE_KEY)
    const decks = await JSON.parse(deckStorage)    
    return decks[id]

  } catch(error) {
    console.log("Can't getDeck", error)
  }
}


export function saveDeckTitle (title) {
  const formattedTitle = formatKey(title)
  const emptyDeck = {
    title: formattedTitle,
    questions: []
  }

  try {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [formattedTitle]: emptyDeck
    }))
    
  } catch(error) {
    console.log("Can't saveDeckTitle", error)
  }
}


export function addCardToDeck (id, card) {
  const formattedTitle = formatKey(id)
  
  try {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [formattedTitle]: {
        questions: card
      }
    }))

  } catch(error) {
    console.log("Can't addCardToDeck", error)
  }
}