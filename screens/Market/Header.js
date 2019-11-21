import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CoinStatus from "./../common/CoinStatus";

import { Montserrat } from "./../../constants/fonts";
import { Colors } from "./../../constants/colors";

class Header extends React.Component {
	render() {
		return (
			<View style={styles.wrapper}>
				<Text style={styles.title}>MARKETPLACE</Text>
				<View style={styles.info}>
					<Text style={styles.infoText}>Coins available:</Text>
					<CoinStatus coinsAmount={this.props.credits} blackText={true} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		position: "absolute",
		width: "100%",
		backgroundColor: "#fff",
		flexDirection: "column",
		alignItems: "center",
		padding: 25,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 5,
	},
	title: {
		fontSize: 30,
		fontFamily: Montserrat.BOLD,
		color: "#000",
	},
	info: {
		marginTop: 5,
		paddingHorizontal: 30,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	infoText: {
		fontSize: 18,
		color: "#000",
		fontFamily: Montserrat.REGULAR,
	},
	infoCoins: {
		flexDirection: "row",
	},
	coinsText: {
		fontSize: 20,
		color: "#000",
		fontFamily: Montserrat.REGULAR,
		marginRight: 5,
	},
	coinsIcon: {
		color: Colors.GOLD_YELLOW,
	},
});

export default Header;
