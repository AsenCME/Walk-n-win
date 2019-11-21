import React from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";

import CoinStatus from "./../common/CoinStatus";
import BackgroundImageOverlay from "./../common/BackgroundImageOverlay";

import { Montserrat } from "./../../constants/fonts";
import { Colors } from "./../../constants/colors";

class MarketOffer extends React.Component {
	/**
	 * @param {Array} codes
	 * @returns {number}
	 */
	findMaxDiscount = codes => {
		let max = 0;
		codes.map(code => {
			if (Number(code.discount) > max) max = Number(code.discount);
		});

		return max;
	};

	calculateTotalCodesLeft = codes => {
		let total = 0;
		codes.map(code => {
			total += Number(code.inStock);
		});

		return total;
	};

	findMaxCoins = codes => {
		let max = 0;
		codes.map(code => {
			if (Number(code.price) > max) {
				max = Number(code.price);
			}
		});

		return max;
	};

	render() {
		const codes = this.props.item.codes;

		const storeName = this.props.item.storeName;
		const maxDiscount = this.findMaxDiscount(codes);
		const codesLeft = this.calculateTotalCodesLeft(codes);
		const maxCoins = this.findMaxCoins(codes);
		const logoImage = this.props.item.logoImage;
		const backgroundImage = this.props.item.backgroundImage;

		return (
			<TouchableWithoutFeedback onPress={() => this.props.onPress(this.props.index)}>
				<View style={this.props.isFirst ? styles.firstOfferWrapper : styles.offerWrapper}>
					<BackgroundImageOverlay backgroundImage={backgroundImage} />
					<View style={styles.topPortion}>
						<View style={styles.titleContainer}>
							<Text style={styles.titleText}>{storeName}</Text>
							<Text style={styles.offer}>
								up to{" "}
								<Text style={{ ...styles.offer, fontFamily: Montserrat.BOLD }}>{maxDiscount}%</Text>
							</Text>
						</View>
						<Image source={{ uri: logoImage }} style={styles.logoImage} />
					</View>
					<View style={styles.bottomPortion}>
						<Text style={styles.codesLeft}>
							<Text style={{ ...styles.codesLeft, fontFamily: Montserrat.SEMIBOLD }}>
								{codesLeft}
							</Text>{" "}
							coupons left
						</Text>
						<CoinStatus coinsAmount={maxCoins} />
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	firstOfferWrapper: {
		marginTop: 150,
		width: "100%",
		overflow: "hidden",
		paddingVertical: 15,
		paddingHorizontal: 20,
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
		borderRadius: 5,
		marginBottom: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 5,

		backgroundColor: "#000",
	},
	offerWrapper: {
		width: "100%",
		overflow: "hidden",
		paddingVertical: 15,
		paddingHorizontal: 20,
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
		borderRadius: 5,
		marginBottom: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 5,

		backgroundColor: "#000",
	},

	// Top Portion
	topPortion: {
		zIndex: 2,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	titleContainer: {
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	titleText: {
		fontSize: 26,
		color: "#fff",
		fontFamily: Montserrat.BOLD,
	},
	offer: {
		fontSize: 20,
		color: "#fff",
		fontFamily: Montserrat.MEDIUM,
	},
	logoImage: {
		height: 50,
		width: 50,
		marginRight: -5,
		resizeMode: "contain",
	},

	// Bottom Portion
	bottomPortion: {
		zIndex: 2,
		marginTop: 60,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	codesLeft: {
		fontSize: 16,
		color: "#fff",
		fontFamily: Montserrat.REGULAR,
	},
	coinsContainer: {
		flexDirection: "row",
	},
	coinsText: {
		color: "#fff",
		marginRight: 5,
		fontSize: 20,
		fontFamily: Montserrat.BOLD,
	},
	coinsIcon: {
		color: Colors.GOLD_YELLOW,
	},
});

export default MarketOffer;
