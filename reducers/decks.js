// deck state in store

import { RECIEVE_DECKS, ADD_CARD, ADD_DECK, REMOVE_DECK } from "../actions";

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
			return Object.assign(
				{},
				...Object.entries(state)
					.filter(
						(
							[
								deckId
							]
						) => deckId !== action.title
					)
					.map(([ deckId, value
					]) => ({ [deckId]: value }))
			);

		default:
			return state;
	}
}

export default decks;
