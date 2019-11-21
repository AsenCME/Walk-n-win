import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Colors } from "./../../../constants/colors";
import { Montserrat } from "./../../../constants/fonts";

import MiniRaceCard from "./../components/MiniRaceCard";

class AllCouponsSlide extends React.Component {
	state = {
		cardHeight: 100,
	};

	logoImageSrc = require("./../../../assets/starbucks_logo.png");

	recentRaces = [
		{ isCurrent: true, points: 2300, month: "FEB 2019", placeFinished: 1 },
		{ isCurrent: false, points: 212000, month: "DEC 2018", placeFinished: 2 },
		{ isCurrent: false, points: 125000, month: "NOV 2018", placeFinished: 3 },
		{ isCurrent: false, points: 1000, month: "OCT 2018", placeFinished: 4 },
		{ isCurrent: false, points: 0, month: "OCT 2018", placeFinished: 5 },
	];

	// Right now the first slide sets the height
	// The flex: 1 (slideWrapper, container) makes it possible to fill the entire height
	// onLayout={e => this.props.onSlideLayout(e.nativeEvent.layout.height)}

	render() {
		const method = cardHeight => {
			this.setState({ cardHeight: cardHeight + 20 });
		};

		const recentRacesConditional =
			this.recentRaces.length > 0 ? (
				<FlatList
					style={styles.list}
					height={this.state.cardHeight}
					contentContainerStyle={styles.listContent}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					data={this.recentRaces}
					renderItem={({ item, index }) => {
						return (
							<MiniRaceCard
								onLayout={method}
								race={item}
								isFirst={index === 0}
								isLast={index === this.recentRaces.length - 1}
							/>
						);
					}}
				/>
			) : (
				<Text>You haven't participated in any races yet.</Text>
			);

		return (
			<View style={styles.slideWrapper}>
				<TouchableOpacity style={styles.slideTitleWrapper} onPress={this.props.requestPage}>
					<Text style={styles.slideTitleText}>RACES</Text>
					<Icon name="chevron-right" size={20} style={styles.slideTitleIcon} />
				</TouchableOpacity>
				<View style={styles.container}>
					<View style={styles.listTitleRow}>
						<Text style={styles.listTitleText}>Recent races:</Text>
						<Text style={styles.listTitleOtherText}>See all</Text>
					</View>
					{recentRacesConditional}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	slideWrapper: {
		flex: 1,
	},

	// Title view
	slideTitleWrapper: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 15,
	},
	slideTitleText: {
		color: "#000",
		fontFamily: Montserrat.BOLD,
		fontSize: 20,
	},
	slideTitleIcon: {
		color: "#000",
		marginLeft: 5,
	},

	// Slides container
	container: {
		flex: 1,
		backgroundColor: Colors.BLUE_SECONDARY,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		width: "100%",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},

	// Slide Content
	list: {
		padding: 0,
		margin: 0,
		flexGrow: 0,
		flexShrink: 0,
		flex: 0,
	},
	listContent: {
		flexGrow: 1,
		alignItems: "center",
	},

	listTitleRow: {
		paddingHorizontal: 30,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	listTitleText: {
		fontFamily: Montserrat.BOLD,
		color: "#fff",
		fontSize: 16,
	},
	listTitleOtherText: {
		fontFamily: Montserrat.MEDIUM,
		color: "rgba(255,255,255,0.6)",
		fontSize: 14,
	},
});

export default AllCouponsSlide;
