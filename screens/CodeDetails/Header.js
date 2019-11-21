import React from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import { Navigation } from "react-native-navigation";

import CoinStatus from "./../common/CoinStatus";
import BackgroundImageOverlay from "./../common/BackgroundImageOverlay";
import BackButton from "./../common/BackButton";

import { Colors } from "./../../constants/colors";
import { Montserrat } from "./../../constants/fonts";

String.prototype.trunc = function(n) {
	return this.substr(0, n - 1) + (this.length > n ? "..." : "");
};

class Header extends React.Component {
	popScreen = () => {
		Navigation.pop(this.props.componentId);
	};

	openStoreWebsite = () => {
		const link = "https://nike.com";
		Linking.canOpenURL(link).then(supported => {
			if (supported) Linking.openURL(link);
			else console.log("No");
		});
	};

	render() {
		const storeName = this.props.storeName;
		const currentCoins = this.props.currentCoins;
		const logoImage = this.props.logoImage;
		const backgroundImage = this.props.backgroundImage;

		return (
			<View style={styles.headerWrapper}>
				<View style={styles.topPart}>
					<BackButton onPress={this.popScreen} />
					<Text onPress={this.openStoreWebsite} style={styles.headerTitle}>
						{storeName.toUpperCase().trunc(16)}
					</Text>
					<View style={styles.coinsWrapper}>
						<CoinStatus coinsAmount={currentCoins} blackText={true} />
					</View>
				</View>
				{/* <View style={styles.bottomPart}>
					<BackgroundImageOverlay backgroundImage={backgroundImage} />
					<Text style={styles.storeName}>{storeName}</Text>
					<Image source={{ uri: logoImage }} style={styles.logoImage} />
				</View> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerWrapper: {
		backgroundColor: "#fff",
		width: "100%",
		position: "absolute",
		overflow: "hidden",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderWidth: 3,
		borderColor: "#fff",

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
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 20,
	},
	headerTitle: {
		fontFamily: Montserrat.BOLD,
		fontSize: 18,
		color: "#000",
	},
	coinsWrapper: {
		position: "absolute",
		right: 20,
	},

	// XXX: Bottom Part
	bottomPart: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 30,
		paddingVertical: 15,
	},
	storeName: {
		zIndex: 2,
		fontFamily: Montserrat.SEMIBOLD,
		fontSize: 24,
		color: "#fff",
	},
	logoImage: {
		zIndex: 2,
		width: 50,
		height: 50,
		resizeMode: "contain",
	},
});

export default Header;

Navigation.registerComponent("details.TopBar", () => Header);
