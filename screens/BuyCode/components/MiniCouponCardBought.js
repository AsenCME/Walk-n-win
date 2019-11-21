import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import Dash from "./../../common/Dash";

import { Montserrat } from "./../../../constants/fonts";
import { Colors } from "./../../../constants/colors";
import BackgroundImage from "./../../../assets/card_background.png";

const randNumber = (min, max) => {
	return Math.floor(Math.random() * max) + min;
};

const MiniCouponCardBought = ({
	storeName,
	validUntil,
	discountAmount,
	logoImage,
	discountCode,
}) => (
	<LinearGradient
		style={styles.cardWrapper}
		colors={[Colors.CARD_GRADIENT_START, Colors.CARD_GRADIENT_END]}
		start={{ x: 0, y: 0 }}
		end={{ x: 1, y: 1 }}>
		<Image source={BackgroundImage} style={styles.cardBackground} />
		<View style={styles.topPart}>
			<View style={styles.textContainer}>
				<Text style={styles.cardTitle}>{storeName}</Text>
				<Text style={styles.cardDate}>valid until no</Text>
			</View>
			<Image source={{ uri: logoImage }} style={styles.cardLogo} />
		</View>
		<Text style={styles.discountAmount}>-{discountAmount}%</Text>
		<Dash />
		<View style={styles.codeContainer}>
			<Text style={styles.discountCode}>{discountCode}</Text>
			<TouchableOpacity>
				<Icon name="copy" size={25} color={"#fff"} solid />
			</TouchableOpacity>
		</View>
	</LinearGradient>
);

const styles = StyleSheet.create({
	cardWrapper: {
		overflow: "hidden",
		width: "100%",
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
		width: "70%",
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
	codeContainer: {
		paddingHorizontal: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	discountCode: {
		color: "#fff",
		fontSize: 20,
		fontFamily: Montserrat.MEDIUM,
	},
});

export default MiniCouponCardBought;
