import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Deck from "./Deck";
import { connect } from "react-redux";
import TouchButton from "./TouchButton";
import { gray, darkGray, red } from "../utils/colors";
import { PropTypes } from "prop-types";
import { removeDeck } from "../utils/api";
import { NavigationActions } from "react-navigation";
import { handleRemoveDeck } from "../utils/helpers";

/**
 * Deck Details: 
 *  - show the specific deck that was pressed
 *  - option to add question to deck 
 *  - option to start quiz
 *  - option to delete deck 
 * Use TouchButton Component to hold the stardard styles of buttons and pass parameters to it 
 */
class DeckDetails extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
		deck: PropTypes.object
	};
	// show title of deck on the header of navigation
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;

		return {
			title,
			headerBackTitleVisible: false
		};
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.deck !== undefined;
	}

	handleRemoveDeck = (title) => {
		this.props.handleRemoveDeck(title).then(() => this.props.navigation.navigate("DeckList"));
	};
	render() {
		const { deck, title, navigation } = this.props;
		console.log(deck);
		return (
			<View style={styles.container}>
				<Deck title={deck.title} questionCount={deck.questions.length} />
				<View style={styles.btnContainer}>
					<TouchButton
						btnStyle={{ backgroundColor: darkGray, borderColor: gray }}
						onPress={() => navigation.navigate("AddCard", { title })}>
						<Text txtStyle={{ color: gray }}>Add Card</Text>
					</TouchButton>
					<TouchButton onPress={() => navigation.navigate("Quiz", { title })}>
						<Text>Start Quiz</Text>
					</TouchButton>
					<TouchButton
						btnStyle={{ backgroundColor: red }}
						onPress={() => this.handleRemoveDeck(title, deck)}>
						<Text>Delete Deck</Text>
					</TouchButton>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

/**
 * Get specific deck to pass to Deck Component from the title that was passed 
 */
function mapStateToProps({ decks }, { navigation }) {
	const { title } = navigation.state.params;
	console.log(decks);
	return {
		title,
		deck: decks[title]
	};
}
export default connect(mapStateToProps, { handleRemoveDeck })(DeckDetails);
