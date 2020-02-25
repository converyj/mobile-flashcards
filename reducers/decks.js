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
			console.log(action.title);
			return Object.assign(
				{},
				...Object.entries(state)
					.filter(
						(
							[
								deck
							]
						) => deck !== action.title
					)
					.map(([ deck, value
					]) => ({ [deck]: value }))
			);
		// return Object.keys(state)
		// 	.filter((deck) => deck.title !== action.title)
		// 	.reduce((results, currentValue) => {
		// 		results[currentValue] = state[currentValue];
		// 		console.log("results ", results);
		// 		return results;
		// 	}, {});

		default:
			return state;
	}
}

export default decks;
