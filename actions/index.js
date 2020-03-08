/*
Deck Actions:
 1. recieve decks from api 
 2. add deck
 3. add question to deck 
 4. remove deck 
*/

import { getDecks, saveCardToDeck, saveDeckTitle, removeDeckAS, getDeck } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECIEVE_DECKS = "RECIEVE_DECKS";
export const ADD_CARD = "ADD_CARD";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";

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

export function handleInitialData() {
	return (dispatch) => {
		dispatch(showLoading());
		return getDecks()
			.then((decks) => {
				dispatch(recieveDecks(decks));
			})
			.then(() => dispatch(hideLoading()));
	};
}

export function handleAddCardToDeck(title, card) {
	return (dispatch) => {
		dispatch(showLoading());
		return saveCardToDeck(title, card)
			.then(() => {
				dispatch(addCardToDeck(title, card));
			})
			.then(() => dispatch(hideLoading()));
	};
}

export function handleAddDeckTitle(title) {
	return (dispatch) => {
		dispatch(showLoading());
		return saveDeckTitle(title)
			.then(() => {
				dispatch(addDeck(title));
			})
			.then(() => dispatch(hideLoading()));
	};
}

export function handleRemoveDeck(title) {
	return (dispatch) => {
		dispatch(showLoading());
		return removeDeckAS(title)
			.then(() => {
				dispatch(removeDeck(title));
			})
			.then(() => dispatch(hideLoading()));
	};
}
