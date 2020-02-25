import React, { Component, Fragment } from "react";
import { Text, KeyboardAvoidingView, TextInput, StyleSheet } from "react-native";
import TouchButton from "./TouchButton";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { handleAddDeckTitle } from "../utils/helpers";

/**
 * Form to add new deck  
 *  - set text of deck
 *  - add deck title to store and api
 */
class AddDeck extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		handleAddDeckTitle: PropTypes.func
	};

	state = {
		title: ""
	};

	// componentDidUpdate(prevProps) {
	// 	console.log(prevProps.loadingBar.default);
	// 	if (prevProps.loadingBar.default !== 0) {
	// 		console.log("updated (not 0)", prevProps.loadingBar.default);
	// 		this.props.navigation.goBack();
	// 		console.log("updated (not 0)", prevProps.loadingBar.default);
	// 	}
	// }

	handleDeckText = (title) => {
		this.setState({
			title
		});
	};

	// add deck to store and api
	addDeck = () => {
		const { navigation, loadingBar } = this.props;
		const { title } = this.state;

		this.props.handleAddDeckTitle(title);

		this.setState({ title: "" });
		navigation.goBack();
	};

	render() {
		const { title } = this.state;
		const { loadingBar } = this.props;

		return (
			<Fragment>
				{/* {loadingBar.default === 1 ? (
					<ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
				) : ( */}
				<KeyboardAvoidingView style={styles.container}>
					<Text>Add a New Deck</Text>
					<TextInput
						style={styles.input}
						placeholder="Deck Title"
						value={this.state.title}
						onChangeText={this.handleDeckText}
					/>
					<TouchButton onPress={this.addDeck}>Create Deck</TouchButton>
				</KeyboardAvoidingView>
				{/* )} */}
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

export default connect(null, { handleAddDeckTitle })(AddDeck);
