import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Colors } from "./../../constants/colors";

const color = Colors.INFO_BTN;

const HelpBar = ({ onHelpPress }) => (
	<View style={styles.container}>
		<TouchableOpacity
			style={{ justifyContent: "center", alignItems: "center" }}
			onPress={onHelpPress}>
			<Icon name="info-circle" size={30} color={color} style={{ opacity: 0.7 }} />
			<Text style={styles.infoText}>help</Text>
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginBottom: 20,
	},
	infoText: {
		color: "#fff",
		opacity: 0.7,
	},
});

export default HelpBar;
