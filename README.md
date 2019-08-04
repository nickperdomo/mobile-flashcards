# Mobile Flashcards Project

This is the final assessment project for Udacity's React Native course.

## Installation

At the root level of the project folder, run the following commands:

`yarn install`


## Running The App

At the root level of the project folder, run the following commands:

1. Launch a simulator or, if using a phone, launch the Expo app.
2. `yarn start` or `expo start`
3. Press `a` for the Android simulator, or `i` for the iOS simulator. If using a phone, scan the QR code with your phone's Expo app.

The app may not display any decks on the first load. Restart the Expo app if this happens.


## Data

`api.js` represents a local database and methods that let you access data via React Native's AsyncStorage.

`starterDeck.js` contains a couple example decks to test functionality.

The database is very flat and only contains an object of decks, with each key being a deck's title.

### Decks

Each Deck includes:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| title                 | String           | The name of the deck |
| questions | Array | A list of card objects which contain a question and an answer|


API methods:

* `getAllDecks()`
* `getDeck(id)`
* `saveDeckTitle(title)`
* `addCardToDeck(id, card)`

1) `getAllDecks()` Method

*Description*: Get all of the existing decks from the database.  
*Return Value*: Object where the keys are the deck ids and their value is the deck object.

2) `getDeck(id)` Method

*Description*: Get one of the existing decks from the database by passing in an id as a string. 
*Parameters*:  (string) 
*Return Value*: Object with keys for the deck's title and questions.

3) `saveDeckTitle(title)` Method

*Description*: Put a new deck into the database.
*Parameters*:  (string)  

4) `addCardToDeck(id, card)` Method

*Description*: Put a new card into an existing deck in the database.  
*Parameters*:  (string, object). More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The title of an existing deck |
| card | Object | Contains two keys, `question` (String)  and `answer` (String) |


## Supported Platforms

This app will run on iPhones and Android phones, and their respective simulators. There may be minor visual defects on Android, however those defects do not impact functionality.


## Contributing

This repository is a student project for evaluation and will not accept pull requests.