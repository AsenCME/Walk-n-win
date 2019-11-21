import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Colors } from "./../../constants/colors";
import { Montserrat } from "./../../constants/fonts";

const { height } = Dimensions.get("window");

class ProfileHeader extends React.Component {
	render() {
		const profilePicSrc = require("./../../assets/profilepic.png");
		const coinSrc = require("./../../assets/coin.png");
		return (
			<View style={styles.headerWrapper}>
				<View style={styles.profileRow}>
					<View style={styles.profileStat}>
						<Icon name="user-friends" size={25} style={styles.friendsIcon} />
						<Text style={styles.statValue}>20</Text>
						<Text style={styles.statValueText}>friends</Text>
					</View>
					<View style={styles.profilePicWrapper}>
						<Image source={profilePicSrc} style={styles.profilePic} />
					</View>
					<View style={styles.profileStat}>
						<Image source={coinSrc} style={styles.coinIcon} />
						<Text style={styles.statValue}>12</Text>
						<Text style={styles.statValueText}>coins</Text>
					</View>
				</View>
				<View style={styles.username}>
					<Text style={styles.usernameText}>John Doe</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerWrapper: {
		width: "100%",
		paddingTop: 40,
		paddingBottom: 40,
		marginVertical: 30,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},

	// Profile Pic
	profilePicWrapper: {
		padding: 5,
		borderWidth: 2,
		borderColor: "#fff",
		borderRadius: 100,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 5,
	},
	profilePic: {
		width: height * 0.16,
		height: height * 0.16,
		resizeMode: "cover",
		borderRadius: 100,
	},

	// Profile Row
	profileRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	profileStat: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: 100,
	},
	statValue: {
		fontSize: 20,
		fontFamily: Montserrat.SEMIBOLD,
		color: "#fff",
	},
	statValueText: {
		fontSize: 16,
		fontFamily: Montserrat.SEMIBOLD,
		color: "rgba(255,255,255,0.8)",
	},
	friendsIcon: {
		color: Colors.DISTANCE_BLUE,
	},
	coinIcon: {
		width: 25,
		height: 25,
		resizeMode: "cover",
	},

	// Username
	username: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "center",
	},
	usernameText: {
		fontSize: 26,
		fontFamily: Montserrat.BOLD,
		color: "#fff",
	},
});

export default ProfileHeader;
