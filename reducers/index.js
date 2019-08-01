import { 
  RECEIVE_DECKS,
  RECEIVE_DECK, 
  ADD_DECK,
  ADD_CARD,
} from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...action.decks
      }
    case RECEIVE_DECK :
      return {
        ...state,
        [action.id]: action.deck
      }
    case ADD_DECK :
      return {
        ...state,
        [action.title]: {
          title: action.title,
          cards: []
        }
      }
    case ADD_CARD :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: [...state[action.id].questions, action.card]
        }
      }  
    default :
      return state
  }
}

export default decks