import React, { Component, Fragment } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white, gray, green, red } from "../utils/colors";
import TouchButton from "./TouchButton";
import QuizResults from "./QuizResults";
import ViewPagerAndroid from "@react-native-community/viewpager";

/**
 * Show quiz of chosen dec 
 *  - displays a card question
 *  - an option to view the answer (flips the card)
 *  - a “Correct” button
 *  - an “Incorrect” button 
 *  - the number of cards left in the quiz
 */
class Quiz extends Component {
	state = {
		totalQuestions: 0, // total questions in deck
		correct: 0, // number of correct answers of user
		incorrect: 0, // number of incorrect answers of user
		flipped: [], // toggle between answer and question
		currentQuestion: 1, // only show one question at a time
		answered: []
	};

	// show title of deck on the header of navigation
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;

		return {
			title: `${title} Quiz`,
			headerBackTitleVisible: false
		};
	};

	handleFlip = (id) => {
		const { flipped } = this.state;

		if (flipped.includes(id)) {
			this.setState({
				flipped: flipped.filter((cardId) => cardId !== id)
			});
		}
		else {
			this.setState({
				flipped: [
					...flipped,
					id
				]
			});
		}
	};

	/**
	 * Change correct or incorrect state 
	 * Increment the currentQuestion 
	 */
	handleAnswer = (page, answer) => {
		const { questions } = this.props.deck;
		const { correct, incorrect } = this.state;
		console.log(page);
		answer
			? this.setState((prevState) => ({ correct: prevState.correct + 1 }))
			: this.setState((prevState) => ({ incorrect: prevState.incorrect + 1 }));
		// console.log(correct, incorrect);

		this.setState((prevState) => ({ currentQuestion: prevState.currentQuestion + 1 }));
		// console.log(this.state.answered);

		this.viewPager.setCurrentItem(this.viewPager.getCurrentItem() + 1);
	};

	restart = () => {
		this.setState({
			totalQuestions: 0, // total questions in deck
			correct: 0, // number of correct answers of user
			incorrect: 0, // number of incorrect answers of user
			flipped: [], // toggle between answer and question
			currentQuestion: 1, // only show one question at a time
			answered: []
		});

		this.props.navigation.navigate("Quiz");
	};
	render() {
		const { questions } = this.props.deck;
		const { flipped, currentQuestion, correct, incorrect } = this.state;

		if (!questions || questions.length === 0) {
			return (
				<View style={styles.noQuestions}>
					<Text>
						Sorry, you can't take this quiz because there are no cards in the deck.
					</Text>
				</View>
			);
		}

		if (questions.length === correct + incorrect) {
			console.log("results");

			return (
				<QuizResults
					totalQuestions={questions.length}
					correctAnswers={correct}
					incorrectAnswers={incorrect}
					navigation={this.props.navigation}
					restart={this.restart}
				/>
			);
		}

		return (
			<ViewPager
				ref={(viewPager) => {
					this.viewPager = viewPager;
				}}>
				{questions.map(
					(question, index) =>
						currentQuestion === index + 1 && (
							<View style={styles.container} key={index}>
								<Text style={{ fontSize: 22 }}>
									{index + 1} / {questions.length}
								</Text>

								<View style={styles.card}>
									<Text style={{ textAlign: "center", fontSize: 22 }}>
										{flipped.includes(index) ? (
											question.answer
										) : (
											question.question
										)}
									</Text>
								</View>

								<TouchableOpacity onPress={() => this.handleFlip(index)}>
									<Text style={{ color: red, textAlign: "center", fontSize: 22 }}>
										{flipped.includes(index) ? "Question" : "Answer"}
									</Text>
								</TouchableOpacity>

								<TouchButton
									btnStyle={{ backgroundColor: green }}
									onPress={() => this.handleAnswer(index, true)}
									disabled={this.state[index] === 1}>
									Correct
								</TouchButton>
								<TouchButton
									btnStyle={{ backgroundColor: red }}
									onPress={() => this.handleAnswer(index, false)}>
									Incorrect
								</TouchButton>
							</View>
						)
				)}
			</ViewPager>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1
		padding: 20,
		justifyContent: "space-between",
		alignItems: "center"
	},
	card: {
		width: 400,
		height: 200,
		margin: 10,
		padding: 10,
		borderRadius: 10,
		backgroundColor: white,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: gray,
		shadowOffset: {
			width: 0,
			height: 5
		}
	},
	noQuestions: {
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
 * get the deck info from the title of the deck 
 */
function mapStateToProps(decks, { navigation }) {
	const { title } = navigation.state.params;
	const deck = decks[title];
	console.log("Deck " + JSON.stringify(deck));
	return {
		deck
	};
}

export default connect(mapStateToProps)(Quiz);
