import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { Montserrat } from "../../../constants/fonts";
import { Colors } from "../../../constants/colors";
import BackgroundImage from "./../../../assets/card_background.png";

const viewportWidth = Dimensions.get("window").width;

const CouponCard = ({ isFirst, isLast }) => {
	return (
		<LinearGradient
			style={styles.cardWrapper}
			colors={[Colors.CARD_GRADIENT_START, Colors.CARD_GRADIENT_END]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}>
			<Text>Some nigga shit goes here.</Text>
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	cardWrapper: {
		flexDirection: "column",
		alignSelf: "flex-start",
		overflow: "hidden",
		borderRadius: 10,
		marginVertical: 10,
		padding: 20,
		overflow: "hidden",
		width: "100%",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 5,
	},

	cardBackground: {
		...StyleSheet.absoluteFillObject,
		resizeMode: "cover",
	},

	topPart: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	textContainer: {
		maxWidth: "70%",
	},
	cardTitle: {
		fontFamily: Montserrat.BOLD,
		fontSize: 26,
		color: "#fff",
		flexWrap: "wrap",
	},
	cardDate: {
		fontFamily: Montserrat.REGULAR,
		fontSize: 14,
		color: "#fff",
		flexWrap: "wrap",
	},
	cardLogo: {
		height: 60,
		width: 60,
		resizeMode: "contain",
	},
	discountAmount: {
		marginTop: 25,
		marginBottom: 15,
		color: "#fff",
		fontFamily: Montserrat.BOLD,
		fontSize: 35,
	},
	condition: {
		fontFamily: Montserrat.REGULAR,
		fontSize: 14,
		color: "#fff",
		flexWrap: "wrap",
	},
	discountCode: {
		padding: 10,
		paddingTop: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	discountCodeText: {
		fontFamily: Montserrat.MEDIUM,
		fontSize: 20,
		color: "#fff",
	},
});

export default CouponCard;
