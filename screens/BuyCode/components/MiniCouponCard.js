import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";

import { Montserrat } from "./../../../constants/fonts";
import { Colors } from "./../../../constants/colors";
import BackgroundImage from "./../../../assets/card_background.png";

const MiniCouponCard = ({ storeName, validUntil, discountAmount, logoImage }) => {
	const validDate = moment().add(30, "day");
	return (
		<LinearGradient
			style={styles.cardWrapper}
			colors={[Colors.CARD_GRADIENT_START, Colors.CARD_GRADIENT_END]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}>
			<Image source={BackgroundImage} style={styles.cardBackground} />
			<View style={styles.topPart}>
				<View style={styles.textContainer}>
					<Text style={styles.cardTitle}>{storeName}</Text>
					<Text style={styles.cardDate}>валиден до {validDate.format("DD.MM.YYYY")}</Text>
				</View>
				<Image source={{ uri: logoImage }} style={styles.cardLogo} />
			</View>
			<Text style={styles.discountAmount}>-{discountAmount}%</Text>
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	cardWrapper: {
		width: "100%",
		overflow: "hidden",
		borderRadius: 10,
		marginVertical: 15,
		padding: 20,

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
		alignItems: "center",
		justifyContent: "space-between",
	},
	textContainer: {
		maxWidth: 200,
	},
	cardTitle: {
		fontFamily: Montserrat.BOLD,
		fontSize: 24,
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
		height: 50,
		width: 50,
		resizeMode: "contain",
	},
	discountAmount: {
		marginTop: 25,
		color: "#fff",
		fontFamily: Montserrat.MEDIUM,
		fontSize: 30,
	},
});

export default MiniCouponCard;
