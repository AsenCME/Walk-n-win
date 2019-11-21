import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { Colors } from "./../../constants/colors";
import { Montserrat } from "./../../constants/fonts";

const Loading = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Data loading</Text>
			<Image source={require("./loading.gif")} style={styles.loader} />
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: Colors.ALMOST_WHITE,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		textAlign: "center",
		fontSize: 36,
		color: "#000",
		fontFamily: Montserrat.BOLD,
		marginBottom: 10,
	},
	loader: {
		width: 100,
		height: 100,
	},
});
