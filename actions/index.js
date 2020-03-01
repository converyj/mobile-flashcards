/*
Deck Actions:
 1. recieve decks from api 
 2. add deck
 3. add question to deck 
 4. remove deck 
*/

export const RECIEVE_DECKS = "RECIEVE_DECKS";
export const ADD_CARD = "ADD_CARD";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";

import { showLoading, hideLoading } from "react-redux-loading";
import { getDecks, saveCardToDeck, saveDeckTitle, removeDeckAS, getDeck } from "../utils/api";

export function handleInitialData() {
	console.log("handleInitialData");

	return (dispatch) => {
		dispatch(showLoading());
		return getDecks()
			.then((decks) => {
				dispatch(recieveDecks(decks));
			})
			.then(() => dispatch(hideLoading()));
	};
}

// recieve all decks from storage and add to store
export function recieveDecks(decks) {
	return {
		type: RECIEVE_DECKS,
		decks
	};
}

// add new deck
export function addDeck(title) {
	return {
		type: ADD_DECK,
		title
	};
}

export function addCardToDeck(title, card) {
	return {
		type: ADD_CARD,
		title,
		card
	};
}

export function removeDeck(title) {
	return {
		type: REMOVE_DECK,
		title
	};
}
