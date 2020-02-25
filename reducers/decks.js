// entry state in store

import { RECIEVE_DECKS, ADD_CARD, ADD_DECK, REMOVE_DECK } from "../actions";

// entries will be an object with the key representing a specific day with the value being the metric for specific day
function decks(state = {}, action) {
	switch (action.type) {
		case RECIEVE_DECKS:
			return {
				...state,
				...action.decks
			};

		case ADD_CARD:
			const { title, card } = action;
			return {
				...state,
				[title]: {
					...state[title],
					questions: [
						...state[title].questions,
						{ ...card }
					]
				}
			};
		case ADD_DECK:
			return {
				...state,
				[action.title]: {
					title: action.title,
					questions: []
				}
			};
		case REMOVE_DECK:
			console.log(action.title);
			return Object.keys(state)
				.filter((deck) => deck.title === action.title)
				.reduce((results, currentValue) => {
					results[currentValue] = state[currentValue];
					return results;
				}, {});

		default:
			return state;
	}
}

export default decks;
