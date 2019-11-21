import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import Dash from "../../common/Dash";

import { Montserrat } from "../../../constants/fonts";
import { Colors } from "../../../constants/colors";
import BackgroundImage from "./../../../assets/card_background.png";

const viewportWidth = Dimensions.get("window").width;

const CouponCard = ({ item, logoImage, isFirst, isLast }) => {
	const validDate = item.validUntil || "never";
	const condition = item.longer
		? "aiight bois lets see how it handles longer conditions mofos yaaaas"
		: "for black people only";
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
			end={{ x: 1, y: 1 }}
			width={viewportWidth - 60}>
			<Image source={BackgroundImage} style={styles.cardBackground} />
			<View style={styles.topPart}>
				<View style={styles.textContainer}>
					<Text style={styles.cardTitle}>{item.storeName}</Text>
					<Text style={styles.cardDate}>valid until {validDate}</Text>
				</View>
				<Image source={logoImage} style={styles.cardLogo} />
			</View>
			<Text style={styles.discountAmount}>-{item.discountAmount}%</Text>
			<Text style={styles.condition}>* {condition}</Text>
			<Dash />
			<View style={styles.discountCode}>
				<Text style={styles.discountCodeText}>aiksudhiu</Text>
				<TouchableOpacity>
					<Icon name="copy" size={25} color={"#fff"} solid />
				</TouchableOpacity>
			</View>
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
		overflow: "hidden",

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
