import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { Stack } from "./components/navigation";

function UdaciStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);
}

export default class App extends React.Component {
	render() {
		return (
			<Provider store={createStore(reducer, middleware)}>
				<View style={{ flex: 1 }}>
					<View style={{ padding: 20 }} />
					<Stack />
				</View>
			</Provider>
		);
	}
}
