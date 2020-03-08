import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	TouchableOpacity
} from "react-native";
import { handleInitialData } from "../actions";
import Deck from "./Deck";
import { AppLoading } from "expo";

/**
 * Deck Dashboard: 
 *  - display all the decks 
 *  - navigate to DeckDetails on press 
 */
class DeckList extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		deckList: PropTypes.array,
		handleInitialData: PropTypes.func,
		loadingBar: PropTypes.object
	};

	state = {
		ready: false
	};

	componentDidMount() {
		this.props.handleInitialData().then(() => this.setState({ ready: true }));
	}

	render() {
		// display splash screen if app hasn't finished loading initial data
		if (this.state.ready === false) {
			return <AppLoading />;
		}
		const { deckList, loadingBar } = this.props;

		// no decks
		if (!deckList || deckList.length === 0) {
			return (
				<View style={styles.noDeck}>
					<Text style={{ fontSize: 22 }}>There are no decks available</Text>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				{/* show loading indicator when still loading UI */}
				{loadingBar.default === 1 ? (
					<ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
				) : (
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
				)}
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
		marginLeft: 30
	}
});

/**
 * Array with deck information
 */
const mapStateToProps = ({ decks, loadingBar }) => {
	const deckList = Object.keys(decks).map((deckId) => ({
		deckId,
		questionCount: decks[deckId].questions.length,
		title: decks[deckId].title
	}));
	return {
		deckList,
		loadingBar
	};
};
export default connect(mapStateToProps, { handleInitialData })(DeckList);
