import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { View, Text, StyleSheet, FlatList, AsyncStorage, ActivityIndicator } from "react-native";
import { handleInitialData } from "./../utils/helpers";
import Deck from "./Deck";
import { TouchableOpacity } from "react-native-gesture-handler";
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
		// console.log("decklist");
		this.props.handleInitialData().then(() => this.setState({ ready: true }));
	}

	// // deckList was updated and is still loading from actions, display loading indicator
	// componentDidUpdate(prevProps) {
	// 	console.log("decklist UPDATE");
	// 	if (prevProps.loadingBar.default !== 0) { // previous
	// 		console.log("loadng");
	// 		return <ActivityIndicator />;
	// 	}
	// }
	// this.props.dispatch(handleInitialData());
	// AsyncStorage.removeItem(DECKS_STORAGE_KEY);

	// shouldComponentUpdate(nextProps) {
	// 	return nextProps.deck
	// }

	render() {
		console.log(this.state.ready);

		// display splash screen if app hasn't finished loading initial data
		if (this.state.ready === false) {
			console.log("loading ready");
			return <AppLoading />;
		}
		// console.log(this.state.ready);
		const { deckList, loadingBar } = this.props;
		console.log(deckList);

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
 * Array with deck information - why not same as leaderboard array?
 */
const mapStateToProps = ({ decks, loadingBar }) => {
	console.log(loadingBar);
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
