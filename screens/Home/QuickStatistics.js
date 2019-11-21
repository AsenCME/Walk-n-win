import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Montserrat } from "../../constants/fonts";
import { Colors } from "./../../constants/colors";

const QuickStatistics = ({ distance, steps, calories, containerStyles = {} }) => (
	<View style={containerStyles}>
		<View style={styles.box}>
			<Icon name="route" style={styles.distance} size={40} light />
			<Text style={styles.textValue}>{Math.round(distance / 10) / 100}</Text>
			<Text style={styles.textUnit}>km</Text>
		</View>

		<View style={styles.box}>
			<Icon name="shoe-prints" style={styles.steps} size={45} />
			<Text style={styles.textValue}>{steps}</Text>
			<Text style={styles.textUnit}>steps</Text>
		</View>

		<View style={styles.box}>
			<Icon name="fire" style={styles.calories} size={40} />
			<Text style={styles.textValue}>{Math.floor(calories)}</Text>
			<Text style={styles.textUnit}>kCal</Text>
		</View>
	</View>
);

export default QuickStatistics;

const styles = StyleSheet.create({
	box: {
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 25,
	},
	textValue: {
		fontFamily: Montserrat.BOLD,
		fontSize: 26,
		color: "#fff",
		marginTop: 5,
	},
	textUnit: {
		fontFamily: Montserrat.REGULAR,
		fontSize: 22,
		color: Colors.DARKER_WHITE,
	},
	distance: {
		color: Colors.DISTANCE_BLUE,
	},
	steps: {
		color: Colors.STEPS_GREEN,
		transform: [{ rotate: "-45deg" }],
		marginBottom: 10,
	},
	calories: {
		color: Colors.FIRE_RED,
	},
});
