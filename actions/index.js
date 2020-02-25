/*
Two Actions:
 1. calendar view - recieve entries 
 2. add entry 
*/

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

// add new entry
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
	console.log(title);
	return {
		type: REMOVE_DECK,
		title
	};
}
