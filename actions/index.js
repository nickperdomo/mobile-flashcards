export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_DECK = 'RECEIVE_DECK'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function receiveDeck(id, deck) {
  return {
    type: RECEIVE_DECK,
    id,
    deck,
  }
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCard(id, card) {
  return {
    type: ADD_CARD,
    id,
    card,
  }
}