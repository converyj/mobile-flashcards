import { AsyncStorage } from "react-native";
import { decks } from "./_DATA";

const DECKS_STORAGE_KEY = "MOBILE_FLASHCARDS:deck";
/**
 * get all decks 
 */
export async function getDecks() {
	try {
		return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
			return data === null
				? AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
				: JSON.parse(data);
		});
	} catch (error) {
		console.log(error);
	}
}

// be able to get specific deck to use in saveCardToDeck method
export function getDeck(id) {
	try {
		return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => JSON.parse(data)[id]);
	} catch (error) {
		console.log(error);
	}
}

// add new deck title
export function saveDeckTitle(title) {
	try {
		return AsyncStorage.mergeItem(
			DECKS_STORAGE_KEY,
			JSON.stringify({
				[title]: {
					title,
					questions: []
				}
			})
		);
	} catch (error) {
		console.log(error);
	}
}

// get decks and add card to deck title
export function saveCardToDeck(title, card) {
	try {
		return getDeck(title).then((deck) => {
			AsyncStorage.mergeItem(
				DECKS_STORAGE_KEY,
				JSON.stringify({
					[title]: {
						questions: [
							...deck.questions,
							{ ...card }
						]
					}
				})
			);
		});
	} catch (err) {
		console.log(err);
	}
}

// remove specific deck
// - set the new storage after the deleted deck
export function removeDeckAS(title) {
	try {
		return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
			const data = JSON.parse(results);
			data[title] = undefined;
			delete data[title];
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
		});
	} catch (error) {
		console.log(error);
	}
}
