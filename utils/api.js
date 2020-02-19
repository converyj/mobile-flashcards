import { AsyncStorage } from "react-native";
import { decks } from "./_DATA";

const DECKS_STORAGE_KEY = "MOBILE_FLASHCARDS:deck";
/**
 * fetch calendar from storage with formatted results 
 * why is formatCalendarResults not method with () and accepting results?
 */
export async function getDecks() {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
		return data === null
			? AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
			: JSON.parse(data);
	});
	// try {
	// 	const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

	// 	if (storeResults === null) {
	// 		AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
	// 	}

	// 	return storeResults === null ? decks : JSON.parse(storeResults);
	// } catch (err) {
	// 	console.log(err);
	// }
}
// submitting new entry for a specific day - key = date, entry = entire metrics
// - merge existing value with new value of entry on calendar key
export function getDeck(id) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => JSON.parse(data)[id]);
}

export function saveDeckTitle(title) {
	return AsyncStorage.mergeItem(
		DECKS_STORAGE_KEY,
		JSON.stringify({
			[title]: {
				title,
				questions: []
			}
		})
	);
}

export function saveCardToDeck(title, card) {
	try {
		return getDeck(title).then((deck) => {
			AsyncStorage.mergeItem(
				DECKS_STORAGE_KEY,
				JSON.stringify({
					[title]: {
						questions: [
							...deck.questions
						].concat(card)
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
export function removeDeck(title) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
		const data = JSON.parse(results);
		data[title] = undefined;
		delete data[title];
		AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
	});
}
