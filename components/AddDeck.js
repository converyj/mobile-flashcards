import React, { Component, Fragment } from "react";
import { Text, KeyboardAvoidingView, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import TouchButton from "./TouchButton";
import { addCardToDeck } from "../actions";
import { connect } from "react-redux";
import { saveCardToDeck } from "../utils/api";
import { PropTypes } from "prop-types";
import { handleAddDeckTitle } from "../utils/helpers";

/**
 * Form to add new deck  
 *  - set text of deck
 *  - add deck title to store and api
 */
class AddDeck extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired
	};

	state = {
		title: ""
	};

	componentDidUpdate(prevProps) {
		console.log(prevProps.loadingBar.default);
		if (prevProps.loadingBar.default !== 0) {
			console.log("updated (not 0)", prevProps.loadingBar.default);
			this.props.navigation.goBack();
		}
	}

	handleDeckText = (title) => {
		this.setState({
			title
		});
	};

	addDeck = () => {
		const { navigation, loadingBar } = this.props;
		const { title } = this.state;

		console.log(loadingBar);

		this.props.dispatch(handleAddDeckTitle(title));

		this.setState({ title: "" });
		// navigation.goBack();
	};
	toHome = () => {
		this.props.navigation.dispatch(NavigationActions.back({ key: "Home" }));
	};
	render() {
		const { title } = this.state;
		console.log(title);
		const { loadingBar } = this.props;

		return (
			<Fragment>
				{loadingBar.default === 1 ? (
					<ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
				) : (
					<KeyboardAvoidingView style={styles.container}>
						<TextInput
							style={styles.input}
							placeholder="Deck Title"
							value={this.state.title}
							onChangeText={this.handleDeckText}
						/>
						<TouchButton onPress={this.addDeck}>Submit</TouchButton>
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
function mapStateToProps({ loadingBar }, { navigation }) {
	// const { title } = navigation.state.params;
	return {
		loadingBar
	};
}
export default connect(mapStateToProps)(AddDeck);
