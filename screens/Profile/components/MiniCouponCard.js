import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";

import { Montserrat } from "../../../constants/fonts";
import { Colors } from "../../../constants/colors";
import BackgroundImage from "./../../../assets/card_background.png";

const MiniCouponCard = ({ storeName, validUntil, discountAmount, logoImage, isFirst, isLast }) => {
	const validDate = moment().add(30, "day");
	const getStyle = (isFirst, isLast) => {
		if (isFirst) return { ...styles.cardWrapper, marginLeft: 30 };
		else if (isLast) return { ...styles.cardWrapper, marginRight: 30 };
		else return styles.cardWrapper;
	};
	return (
		<LinearGradient
			style={getStyle(isFirst, isLast)}
			colors={[Colors.CARD_GRADIENT_START, Colors.CARD_GRADIENT_END]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}>
			<Image source={BackgroundImage} style={styles.cardBackground} />
			<View style={styles.topPart}>
				<View style={styles.textContainer}>
					<Text style={styles.cardTitle}>{storeName}</Text>
					<Text style={styles.cardDate}>valid until {validDate.format("DD.MM.YYYY")}</Text>
				</View>
				<Image source={logoImage} style={styles.cardLogo} />
			</View>
			<Text style={styles.discountAmount}>-{discountAmount}%</Text>
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
		marginRight: 20,
		paddingHorizontal: 20,
		paddingVertical: 15,

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
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		resizeMode: "cover",
	},

	topPart: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	textContainer: {
		maxWidth: 200,
	},
	cardTitle: {
		fontFamily: Montserrat.BOLD,
		fontSize: 20,
		color: "#fff",
		flexWrap: "wrap",
	},
	cardDate: {
		fontFamily: Montserrat.REGULAR,
		fontSize: 12,
		color: "#fff",
		flexWrap: "wrap",
	},
	cardLogo: {
		height: 50,
		width: 50,
		resizeMode: "contain",
		marginLeft: 50,
	},
	discountAmount: {
		marginTop: 25,
		color: "#fff",
		fontFamily: Montserrat.BOLD,
		fontSize: 30,
	},
});

export default MiniCouponCard;
