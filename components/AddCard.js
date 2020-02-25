import React, { Component, Fragment } from "react";
import { Text, KeyboardAvoidingView, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import TouchButton from "./TouchButton";
import { addCardToDeck } from "../actions";
import { connect } from "react-redux";
import { saveCardToDeck } from "../utils/api";
import { PropTypes } from "prop-types";
import { handleAddCardToDeck } from "../utils/helpers";

/**
 * Form to add question and answer to deck 
 *  - set text of question and answer
 *  - add question to store and api
 */
class AddCard extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired
	};

	state = {
		question: "",
		answer: "",
		ready: false
	};

	componentDidUpdate(prevProps) {
		if (prevProps.loadingBar.default !== 0) {
			this.props.navigation.goBack();
		}
	}

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

	addCard = () => {
		const { title, navigation } = this.props;

		this.props.dispatch(handleAddCardToDeck(title, this.state));
		this.setState({ question: "", answer: "" });
		// this.props.navigation.goBack();

		{
			// this.props.loadingBar.default !== 1 && navigation.goBack();
		}
	};
	render() {
		const { title, loadingBar } = this.props;

		return (
			<Fragment>
				{loadingBar.default === 1 ? (
					<ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
				) : (
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
						<TouchButton onPress={this.addCard}>Submit</TouchButton>
					</KeyboardAvoidingView>
				)}
			</Fragment>
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

// decks is not being used? - which is better to get title from navigation twice or put it in props?
function mapStateToProps({ decks, loadingBar }, { navigation }) {
	const { title } = navigation.state.params;
	return {
		title,
		loadingBar
	};
}
export default connect(mapStateToProps)(AddCard);
