import { getDecks, saveCardToDeck, saveDeckTitle } from "./api";
import { recieveDecks, addCardToDeck, addDeck } from "./../actions";

export function handleInitialData() {
	return (dispatch) => {
		return getDecks().then((decks) => {
			dispatch(recieveDecks(decks));
		});
	};
}

export function handleAddCardToDeck(title, card) {
	return (dispatch) => {
		return saveCardToDeck(title, card).then(() => {
			dispatch(addCardToDeck(title));
		});
	};
}

export function handleAddDeckTitle(title) {
	return (dispatch) => {
		return saveDeckTitle(title).then(() => {
			dispatch(addDeck(title));
		});
	};
}
