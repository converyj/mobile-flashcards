import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { purple, green, gray, red, white } from "./../utils/colors";
import TouchButton from "./TouchButton";
import { clearAllNotifications, setLocalNotification } from "./../utils/notifications";

/**
 * Display results of the quiz 
 * - score is displayed by the number of question correct and a percentage 
 * - buttons are displayed to start the quiz over or go back to the deck 
 */
class QuizResult extends Component {
	state = {
		bounceValue: new Animated.Value(0)
	};

	// animate the score percentage
	componentDidMount() {
		// remove notification each time user completes at least one quiz for the day and set new one for next day
		clearAllNotifications().then(() => setLocalNotification);

		const { bounceValue } = this.state;

		Animated.sequence([
			Animated.timing(bounceValue, { duration: 600, toValue: 1.04 }),
			Animated.spring(bounceValue, { toValue: 1, friction: 4 })
		]).start();
	}

	render() {
		const { totalQuestions, correctAnswers } = this.props;
		const { bounceValue } = this.state;

		// calculate percentage and style accordingly
		const percent = (correctAnswers / totalQuestions * 100).toFixed(0);
		const btnStyle = percent > 50 ? green : red;

		return (
			<View style={styles.pageStyle}>
				<View>
					<Text style={styles.header}>Quiz Complete!</Text>
					<Text style={styles.subHeader}>
						{correctAnswers} / {totalQuestions} correct
					</Text>
					<Animated.Text
						style={[
							styles.subHeader,
							{
								color: btnStyle,
								marginTop: 80,
								transform: [
									{ scale: bounceValue }
								]
							}
						]}>
						{percent}%
					</Animated.Text>
				</View>
				<View>
					<TouchButton onPress={this.props.restart}>Restart Quiz</TouchButton>
					<TouchButton
						onPress={() => this.props.navigation.navigate("DeckDetails")}
						btnStyle={{ backgroundColor: gray }}>
						Back to Deck
					</TouchButton>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	pageStyle: {
		flex: 1,
		paddingTop: 16,
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 16,
		backgroundColor: white,
		justifyContent: "space-around"
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		color: purple
	},
	header: {
		textAlign: "center",
		fontSize: 28,
		color: purple,
		fontWeight: "bold"
	},
	subHeader: {
		fontSize: 50,
		textAlign: "center",
		marginTop: 30,
		color: purple
	}
});

export default QuizResult;
