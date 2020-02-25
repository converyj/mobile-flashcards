import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { white, gray } from "./../utils/colors";
import { PropTypes } from "prop-types";

// display deck title and questionCount
const Deck = ({ title, questionCount }) => {
	return (
		<View style={styles.card}>
			<Text style={{ fontSize: 22 }}>{title}</Text>
			<Text style={{ fontSize: 18, color: gray }}>
				{questionCount} {questionCount === 1 ? "card" : "cards"}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: white,
		borderRadius: Platform.OS === "ios" ? 16 : 2,
		padding: 20,
		margin: 10,
		marginTop: 17,
		justifyContent: "center",
		alignItems: "center",
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: "rgba(0, 0, 0, 0.24)",
		shadowOffset: {
			width: 0,
			height: 3
		}
	}
});

Deck.propTypes = {
	title: PropTypes.string.isRequired,
	questionCount: PropTypes.number.isRequired
};

export default Deck;
