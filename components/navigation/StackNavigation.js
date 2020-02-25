import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Tabs from "./TabNavigation";
import { purple, white } from "../../utils/colors";
import { createAppContainer } from "react-navigation";
import AddCard from "../AddCard";
import DeckDetails from "../DeckDetails";
import Quiz from "../Quiz";

// Stack Navigation
const Stack = createAppContainer(
	createStackNavigator({
		Home: {
			screen: Tabs,
			navigationOptions: {
				headerShown: false
			}
		},
		DeckDetails: {
			screen: DeckDetails,
			navigationOptions: {
				headerTintColor: white,
				headerBackTitleVisible: false,

				headerStyle: {
					backgroundColor: purple
				}
			}
		},
		Quiz: {
			screen: Quiz,
			navigationOptions: {
				headerTintColor: white,
				headerStyle: {
					backgroundColor: purple
				}
			}
		},
		AddCard: {
			screen: AddCard,
			navigationOptions: {
				headerTintColor: white,
				headerBackTitleVisible: false,
				headerStyle: {
					backgroundColor: purple
				}
			}
		}
	})
);

export default Stack;
