import React from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { Montserrat } from "../../../constants/fonts";
import { Colors } from "../../../constants/colors";
import ProfilePicture from "./../../../assets/profilepic.png";

const players = [
	{ profilePic: ProfilePicture, name: "Asen Georgiev", points: 24000 },
	{ profilePic: ProfilePicture, name: "Ioana Misirkova", points: 20000 },
	{ profilePic: ProfilePicture, name: "Stoil Yankov", points: 15000 },
	{ profilePic: ProfilePicture, name: "Ivan Ivanov", points: 10000 },
	{ profilePic: ProfilePicture, name: "Pesho Peshov", points: 5000 },
];

const RaceRow = ({ user, index, isLast }) => {
	return (
		<View style={styles.rowWrapper}>
			<View style={styles.row}>
				<Text style={styles.place}>#{index + 1}</Text>
				<Image style={styles.profileImage} source={user.profilePic} />
				<View style={styles.text}>
					<Text style={styles.name}>{user.name}</Text>
					<Text style={styles.points}>{user.points}</Text>
				</View>
			</View>
			<View style={isLast ? { height: 0 } : styles.divider} />
		</View>
	);
};

const CurrentRaceCard = ({ isFirst, isLast }) => {
	const renderPlayers = () => {
		return players.map((user, index) => {
			return <RaceRow user={user} index={index} isLast={index === players.length - 1} />;
		});
	};

	return (
		<LinearGradient
			style={styles.cardWrapper}
			colors={[Colors.CARD_GRADIENT_START, Colors.CARD_GRADIENT_END]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}>
			{renderPlayers()}
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

	// cardBackground: {
	// 	...StyleSheet.absoluteFillObject,
	// 	resizeMode: "cover",
	// },

	rowWrapper: {
		flexDirection: "column",
	},
	row: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	place: {
		color: "#fff",
		fontFamily: Montserrat.REGULAR,
		fontSize: 16,
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 30,
		marginHorizontal: 15,
	},
	text: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	name: {
		color: "#fff",
		fontFamily: Montserrat.SEMIBOLD,
		fontSize: 14,
	},
	avgDaily: {
		color: "#fff",
		fontFamily: Montserrat.REGULAR,
		fontSize: 12,
	},
	points: {
		color: "#fff",
		fontFamily: Montserrat.REGULAR,
		fontSize: 14,
	},
	divider: {
		marginVertical: 8,
		width: "100%",
		backgroundColor: "#fff",
		opacity: 0.2,
		height: 1,
	},
});

export default CurrentRaceCard;
