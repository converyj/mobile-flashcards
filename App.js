import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { Stack } from "./components/navigation";
import { setLocalNotification } from "./utils/notifications";
import Constants from "expo-constants";
import { purple } from "./utils/colors";

function UdaciStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);
}

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification();
	}
	render() {
		return (
			<Provider store={createStore(reducer, middleware)}>
				<View style={{ flex: 1 }}>
					<UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
					<Stack />
				</View>
			</Provider>
		);
	}
}
