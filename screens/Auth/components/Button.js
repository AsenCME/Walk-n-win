import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";
import { Montserrat } from "../../../constants/fonts";

const Button = ({ onPress, buttonText }) => (
	<TouchableOpacity onPress={onPress} style={styles.button}>
		<Text style={styles.textButton}>{buttonText}</Text>
	</TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
	button: {
		marginTop: 25,
		marginBottom: 25,
		backgroundColor: Colors.BLUE_MAIN,
		borderRadius: 25,
		paddingVertical: 10,
		marginHorizontal: 40,
	},
	textButton: {
		textAlign: "center",
		fontFamily: Montserrat.MEDIUM,
		fontSize: 18,
		color: "#fff",
	},
});
