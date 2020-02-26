import React from "react";
import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "MOBILE_FLASHCARDS:notification";

/**
 * Set local notification at a particular time to remind user to study for the day 
 */

// remove all notifications
export function clearAllNotifications() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(() => {
		Notifications.cancelAllScheduledNotificationsAsync;
	});
}

// set only one notification for the day
export function setLocalNotification() {
	// check if any notifications are set
	return AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((data) => {
		// if no notifications are set, ask for permission
		if (data === null) {
			Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
				if (status === "granted") {
					Notifications.cancelAllScheduledNotificationsAsync;

					// set notification for 8PM
					let tomorrow = new Date();
					tomorrow.setDate(tomorrow.getDate() + 1);
					tomorrow.setHours(20);
					tomorrow.setMinutes(0);

					Notifications.scheduleLocalNotificationAsync(createNotification(), {
						time: tomorrow,
						repeat: "day"
					});

					AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify({ notification: "set" }));
				}
			});
		}
	});
}

// create notification
export function createNotification() {
	return {
		title: "Study Reminder",
		body: "Don't forget to study for today!",
		ios: {
			sound: true
		},
		android: {
			sound: true,
			vibrate: true
		}
	};
}
