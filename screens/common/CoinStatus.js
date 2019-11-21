import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { Montserrat } from "./../../constants/fonts";

import CoinImage from "./../../assets/coin.png";

const CoinStatus = ({ coinsAmount, blackText }) => (
	<View style={styles.coinStatus}>
		<Text style={blackText ? styles.coinTextBlack : styles.coinTextWhite}>{coinsAmount}</Text>
		<Image source={CoinImage} style={styles.coinIcon} />
	</View>
);

const styles = StyleSheet.create({
	coinStatus: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	coinTextWhite: {
		color: "#fff",
		marginRight: 5,
		fontSize: 20,
		fontFamily: Montserrat.BOLD,
	},
	coinTextBlack: {
		color: "#000",
		marginRight: 5,
		fontSize: 20,
		fontFamily: Montserrat.BOLD,
	},
	coinIcon: {
		width: 25,
		height: 25,
	},
});

export default CoinStatus;
