import React, { Component } from "react";
import { Text, KeyboardAvoidingView, TextInput, StyleSheet } from "react-native";
import TouchButton from "./TouchButton";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { handleAddCardToDeck } from "../actions";

/**
 * Form to add question and answer to deck 
 *  - set text of question and answer
 *  - add question to store and api
 */
class AddCard extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
		handleAddDeckTitle: PropTypes.func
	};

	state = {
		question: "",
		answer: ""
	};

	handleQuestionText = (question) => {
		this.setState({
			question
		});
	};

	handleAnswerText = (answer) => {
		this.setState({
			answer
		});
	};

	// add question to deck and route to DeckList view
	addCard = () => {
		const { title } = this.props;

		this.props.handleAddCardToDeck(title, this.state);
		this.setState({ question: "", answer: "" });
		this.props.navigation.goBack();
	};

	render() {
		const { title } = this.props;

		return (
			<KeyboardAvoidingView style={styles.container}>
				<Text>Add a Question to the {title} deck</Text>
				<TextInput
					style={styles.input}
					placeholder="Question"
					value={this.state.question}
					onChangeText={this.handleQuestionText}
				/>
				<TextInput
					style={styles.input}
					placeholder="Answer"
					value={this.state.answer}
					onChangeText={this.handleAnswerText}
				/>
				<TouchButton onPress={this.addCard}>Add Card</TouchButton>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		padding: 16
	},

	input: {
		borderWidth: 1,
		borderColor: "gray",
		backgroundColor: "#fff",
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 5,
		fontSize: 20,
		height: 40,
		margin: 20
	}
});

// get the title of deck that was passed in and store it in props
function mapStateToProps(decks, { navigation }) {
	const { title } = navigation.state.params;
	return {
		title
	};
}
export default connect(mapStateToProps, { handleAddCardToDeck })(AddCard);
