import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TouchButton from "./TouchButton";
import QuizResults from "./QuizResults";
import { gray, green, red, textGray, darkGray, white } from "../utils/colors";
import { connect } from "react-redux";
import ViewPager from "@react-native-community/viewpager";

const answer = {
	CORRECT: "correct",
	INCORRECT: "incorrect"
};

export class Quiz extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired
		// deck: PropTypes.object.isRequired
	};

	// show title of deck on the header of navigation
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;

		return {
			title: `${title} Quiz`,
			headerBackTitleVisible: false
		};
	};

	state = {
		correct: 0,
		incorrect: 0,
		flipped: [],
		questionCount: this.props.deck.questions.length
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

	handleAnswer = (response, page) => {
		if (response === answer.CORRECT) {
			console.log("correct");
			this.setState((prevState) => ({ correct: prevState.correct + 1 }));
		}
		else {
			console.log("incorrect");

			this.setState((prevState) => ({ incorrect: prevState.incorrect + 1 }));
		}

		this.viewPager.setPage(page + 1);
	};

	handleRestart = () => {
		this.setState({
			questionCount: this.props.deck.questions.length,
			correct: 0, // number of correct answers of user
			incorrect: 0, // number of incorrect answers of user
			flipped: [] // toggle between answer and question
		});

		this.props.navigation.navigate("Quiz");
	};
	render() {
		const { questions } = this.props.deck;
		const { questionCount, flipped, correct, incorrect } = this.state;

		if (!questions || questions.length === 0) {
			return (
				<View style={styles.noQuestions}>
					<Text style={{ fontSize: 22 }}>
						Sorry, you can't take this quiz because there are no cards in the deck.
					</Text>
				</View>
			);
		}

		if (questions.length === correct + incorrect) {
			return (
				<QuizResults
					totalQuestions={questionCount}
					correctAnswers={correct}
					incorrectAnswers={incorrect}
					navigation={this.props.navigation}
					restart={this.handleRestart}
				/>
			);
		}

		return (
			<ViewPager
				style={styles.container}
				scrollEnabled={false}
				ref={(viewPager) => {
					this.viewPager = viewPager;
				}}>
				{questions.map((question, idx) => (
					<View style={styles.pageStyle} key={idx}>
						<View>
							<Text style={styles.count}>
								{idx + 1} / {questions.length}
							</Text>
						</View>
						<View style={styles.questionContainer}>
							<Text style={styles.questionText}>
								{flipped.includes(idx) ? "Question" : "Answer"}
							</Text>

							<View style={styles.questionWrapper}>
								<Text style={styles.title}>
									{flipped.includes(idx) ? question.answer : question.question}
								</Text>
							</View>
						</View>
						<TouchableOpacity onPress={() => this.handleFlip(idx)}>
							<Text style={{ color: red, textAlign: "center", fontSize: 22 }}>
								{flipped.includes(idx) ? "Show Question" : "Show Answer"}
							</Text>
						</TouchableOpacity>
						<View>
							<TouchButton
								btnStyle={{ backgroundColor: green, borderColor: white }}
								onPress={() => this.handleAnswer(answer.CORRECT, idx)}>
								Correct
							</TouchButton>
							<TouchButton
								btnStyle={{ backgroundColor: red, borderColor: white }}
								onPress={() => this.handleAnswer(answer.INCORRECT, idx)}>
								Incorrect
							</TouchButton>
						</View>
					</View>
				))}
			</ViewPager>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	pageStyle: {
		flex: 1,
		paddingTop: 16,
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 16,
		backgroundColor: gray,
		justifyContent: "space-around"
	},
	count: {
		fontSize: 24
	},
	title: {
		fontSize: 32,
		textAlign: "center"
	},
	questionContainer: {
		borderWidth: 1,
		borderColor: darkGray,
		backgroundColor: white,
		borderRadius: 5,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 16,
		paddingRight: 16,
		flexGrow: 1
	},
	questionWrapper: {
		flex: 1,
		justifyContent: "center"
	},
	questionText: {
		textDecorationLine: "underline",
		textAlign: "center",
		fontSize: 20
	}
});

const mapStateToProps = ({ decks }, { navigation }) => {
	const { title } = navigation.state.params;
	const deck = decks[title];
	console.log(deck);
	return {
		deck
	};
};

export default connect(mapStateToProps)(Quiz);
