import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";

import BackButton from "./../../common/BackButton";

import { Montserrat } from "./../../../constants/fonts";

const PageHeader = ({ pageTitle, componentId }) => {
	const handlePress = () => Navigation.pop(componentId);
	return (
		<View style={styles.headerWrapper}>
			<BackButton onPress={handlePress} />
			<Text style={styles.headerTitle}>{pageTitle}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	headerWrapper: {
		position: "absolute",
		width: "100%",
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: "#fff",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 5,
	},
	headerTitle: {
		fontFamily: Montserrat.BOLD,
		fontSize: 22,
		color: "#000",
		textAlign: "center",
	},
});

export default PageHeader;
