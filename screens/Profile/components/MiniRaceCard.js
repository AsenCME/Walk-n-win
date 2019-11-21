import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";

import { Montserrat } from "../../../constants/fonts";
import { Colors } from "../../../constants/colors";

const MiniRaceCard = ({ race, isFirst, isLast, onLayout }) => {
	const getStyle = (isFirst, isLast) => {
		if (isFirst) return { ...styles.cardWrapper, marginLeft: 30 };
		else if (isLast) return { ...styles.cardWrapper, marginRight: 30 };
		else return styles.cardWrapper;
	};
	const getColor = () => {
		let place = race.placeFinished;
		let color = [Colors.GOLD_YELLOW, Colors.SILVER_GRAY, Colors.BRONZE_BROWN, "#fff", "#fff"][
			place - 1
		];
		return { ...styles.cardPlace, color: color };
	};

	const CurrentRaceCard = _ => {
		return (
			<View style={styles.cardContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.cardTitle}>Current Race</Text>
					<Text style={styles.cardPointsAhead}>{race.points} points ahead</Text>
					<Text style={styles.cardMonth}>{race.month}</Text>
				</View>
				<View style={styles.cardPlaceWrapper}>
					<Text style={getColor()}>#{race.placeFinished}</Text>
				</View>
			</View>
		);
	};

	const PastRaceCard = _ => {
		return (
			<View style={styles.cardContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.cardTitle}>Finished #{race.placeFinished}</Text>
					<Text style={styles.cardPointsAhead}>with {race.points}</Text>
					<Text style={styles.cardMonth}>{race.month}</Text>
				</View>
				<View style={styles.cardPlaceWrapper}>
					<Icon name={race.placeFinished > 3 ? "award" : "trophy"} style={getColor()} />
				</View>
			</View>
		);
	};

	const conidtionalRender = () => {
		if (race.isCurrent) return <CurrentRaceCard />;
		else return <PastRaceCard />;
	};

	return (
		<LinearGradient
			style={getStyle(isFirst, isLast)}
			colors={[Colors.CARD_GRADIENT_START, Colors.CARD_GRADIENT_END]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			onLayout={e => onLayout(e.nativeEvent.layout.height)}>
			{conidtionalRender()}
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	cardWrapper: {
		flexDirection: "row",
		alignSelf: "flex-start",
		overflow: "hidden",
		borderRadius: 10,
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

	cardContainer: {
		flexDirection: "row",
	},
	textContainer: {
		maxWidth: 200,
	},
	cardTitle: {
		fontFamily: Montserrat.BOLD,
		fontSize: 22,
		color: "#fff",
		flexWrap: "wrap",
	},
	cardPointsAhead: {
		fontFamily: Montserrat.REGULAR,
		fontSize: 16,
		color: "#fff",
		flexWrap: "wrap",
	},
	cardPlaceWrapper: {
		height: "100%",
		top: 0,
		bottom: 0,
		marginLeft: 30,
		marginRight: 5,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	cardPlace: {
		fontFamily: Montserrat.BOLD,
		fontSize: 50,
	},
	cardMonth: {
		marginTop: 40,
		color: "#fff",
		fontFamily: Montserrat.MEDIUM,
		fontSize: 14,
	},
});

export default MiniRaceCard;
