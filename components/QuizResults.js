import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { purple, green, gray, red } from "./../utils/colors";
import TouchButton from "./TouchButton";

class QuizResult extends Component {
	state = {
		bounceValue: new Animated.Value(1)
	};

	componentDidMount() {
		const { bounceValue } = this.state;

		Animated.sequence([
			Animated.timing(bounceValue, { duration: 1000, toValue: 1.04 }),
			Animated.spring(bounceValue, { toValue: 1, friction: 4 })
		]).start();
	}

	render() {
		const { totalQuestions, correctAnswers, incorrectAnswers } = this.props;
		const { bounceValue } = this.state;

		const percent = correctAnswers / totalQuestions * 100;
		const btnStyle = percent > 50 ? green : red;
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.header}>Quiz Complete!</Text>
					{/* </View> */}
					{/* <View> */}
					<Text style={styles.subHeader}>
						{correctAnswers} / {totalQuestions} correct
					</Text>
					{/* </View> */}
					{/* <View> */}
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
	container: {
		flex: 1,
		// margin: 10,
		justifyContent: "space-between"
		// alignItems: "center"
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
