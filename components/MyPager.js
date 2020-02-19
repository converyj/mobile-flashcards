import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white, gray, green, red } from "../utils/colors";
import TouchButton from "./TouchButton";
import QuizResult from "./QuizResult";
import ViewPager from "@react-native-community/viewpager";

const MyPager = () => {
	return (
		<ViewPager style={styles.viewPager} initialPage={0}>
			<View key="1">
				<Text>First page</Text>
			</View>
			<View key="2">
				<Text>Second page</Text>
			</View>
		</ViewPager>
	);
};

const styles = StyleSheet.create({
	viewPager: {
		flex: 1
	}
});

export default MyPager;
