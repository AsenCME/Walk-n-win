import React from "react";
import { Navigation } from "react-native-navigation";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { Colors } from "./../../constants/colors";
import CoinStatus from "./../common/CoinStatus";
import { Montserrat } from "../../constants/fonts";

class ListItem extends React.Component {
	openBuyModal = () => {
		Navigation.showOverlay({
			component: {
				name: "steps.buyCode",
				passProps: {
					index: this.props.index,
				},
			},
		});
	};
	render() {
		const discountValue = this.props.item.discountValue;
		const discountDescription = this.props.item.discountDescription;
		const coinsRequired = this.props.item.coinsRequired;
		const codesLeft = this.props.item.codesLeft;
		return (
			<LinearGradient
				style={this.props.isFirst ? styles.firstItemWrapper : styles.itemWrapper}
				colors={[Colors.CARD_GRADIENT_START, Colors.CARD_GRADIENT_END]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}>
				<View style={styles.topPart}>
					<Text style={styles.itemTitle}>{discountValue}% OFF</Text>
					<CoinStatus coinsAmount={coinsRequired} />
				</View>
				<Text style={styles.itemDescription}>{discountDescription}</Text>
				<Text style={styles.itemCodesLeft}>{codesLeft} Coupons left</Text>
				<TouchableOpacity onPress={this.openBuyModal} style={styles.button}>
					<Text style={styles.buttonText}>GET COUPON</Text>
				</TouchableOpacity>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	firstItemWrapper: {
		marginTop: 100,
		width: "100%",
		marginBottom: 20,
		borderRadius: 5,
		paddingHorizontal: 20,
		paddingVertical: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	itemWrapper: {
		width: "100%",
		marginBottom: 20,
		borderRadius: 5,
		paddingHorizontal: 20,
		paddingVertical: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	// Top Part
	topPart: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	itemTitle: {
		fontFamily: Montserrat.BOLD,
		fontSize: 26,
		color: "#fff",
		marginBottom: 10,
	},
	itemDescription: {
		fontFamily: Montserrat.MEDIUM,
		fontSize: 18,
		color: "#fff",
		marginBottom: 10,
		width: "80%",
	},
	itemCodesLeft: {
		fontFamily: Montserrat.REGULAR,
		fontSize: 16,
		color: "#fff",
		marginBottom: 25,
	},
	button: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		backgroundColor: Colors.GOLD_YELLOW,
		paddingVertical: 15,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	buttonText: {
		fontFamily: Montserrat.BOLD,
		fontSize: 18,
		color: "#000",
	},
});

export default ListItem;
