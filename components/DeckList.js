import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { View, Text, StyleSheet, FlatList, AsyncStorage } from "react-native";
import { handleInitialData } from "./../utils/helpers";
import Deck from "./Deck";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDecks } from "../utils/api";
const DECKS_STORAGE_KEY = "MOBILE_FLASHCARDS:deck";

/**
 * Deck Dashboard: 
 *  - display all the decks 
 *  - navigate to DeckDetails on press 
 */
class DeckList extends Component {
	// static propTypes = {
	// 	navigation: PropTypes.object.isRequired,
	// 	deckList: PropTypes.array.isRequired,
	// 	handleInitialData: PropTypes.func.isRequired
	// };

	componentDidMount() {
		//Here is the Trick
		const { navigation } = this.props;
		//Adding an event listner om focus
		//So whenever the screen will have focus it will set the state to zero
		this.focusListener = navigation.addListener("didFocus", () => {
			console.log("Focus");
			this.props.dispatch(handleInitialData());
		});
		// AsyncStorage.removeItem(DECKS_STORAGE_KEY);
	}

	// shouldComponentUpdate(prevProps) {
	// 	console.log("decklist UPDATE");
	// 	return prevProps.decks !== getDecks()
	// 	// this.props.dispatch(handleInitialData());
	// 	// AsyncStorage.removeItem(DECKS_STORAGE_KEY);
	// }

	render() {
		const { deckList } = this.props;
		console.log(this.props.decks);
		if (!deckList || deckList.length === 0) {
			return (
				<View style={styles.noDeck}>
					<Text>There are no decks available</Text>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<FlatList
					data={deckList}
					keyExtractor={(item) => item.deckId}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() =>
								this.props.navigation.navigate("DeckDetails", {
									title: item.title
								})}>
							<Deck title={item.title} questionCount={item.questionCount} />
						</TouchableOpacity>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center"
	},
	noDeck: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 30,
		marginLeft: 30,
		textAlign: "center",
		fontSize: 22
	}
});

/**
 * Array with deck information why not same as leaderboard array?
 */
const mapStateToProps = (decks) => {
	const deckList = Object.keys(decks).map((deckId) => ({
		deckId,
		questionCount: decks[deckId].questions.length,
		title: decks[deckId].title
	}));
	return {
		deckList,
		decks
	};
};
export default connect(mapStateToProps)(DeckList);
