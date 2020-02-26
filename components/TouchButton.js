import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { lightPurple, white } from "../utils/colors";

/**
 * Component to display the standard button used in other components 
 */
const TouchButton = ({ children, btnStyle = {}, txtStyle = {}, onPress }) => {
	return (
		<View style={styles.btnContainer}>
			<TouchableOpacity
				style={[
					styles.btn,
					btnStyle
				]}
				onPress={onPress}>
				<Text
					style={[
						styles.btnText,
						txtStyle
					]}>
					{children}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	btnContainer: {
		marginTop: 30,
		justifyContent: "center",
		alignItems: "center"
	},
	btn: {
		justifyContent: "center",
		alignItems: "center",
		width: 200,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		borderRadius: 5,
		height: 50,
		backgroundColor: lightPurple,
		borderWidth: 1,
		borderColor: "#999"
	},

	btnText: {
		fontWeight: "bold",
		fontSize: 22,
		color: white
	}
});

export default TouchButton;
