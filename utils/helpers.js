// Asynchronous Actions

import { getDecks, saveCardToDeck, saveDeckTitle, removeDeckAS, getDeck } from "./api";
import { recieveDecks, addCardToDeck, addDeck, removeDeck } from "./../actions";
import { showLoading, hideLoading } from "react-redux-loading";

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
