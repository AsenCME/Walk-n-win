import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Colors } from "./../../../constants/colors";
import { Montserrat } from "./../../../constants/fonts";

class AllCouponsSlide extends React.Component {
	logoImageSrc = require("./../../../assets/starbucks_logo.png");

	recentCoupons = [
		{ storeName: "Starbucks", discountAmount: "20" },
		{ storeName: "Sport Depot", discountAmount: "15" },
		{ storeName: "Starbucks", discountAmount: "20" },
		{ storeName: "Sport Depot", discountAmount: "15" },
		{ storeName: "Starbucks", discountAmount: "20" },
		{ storeName: "Sport Depot", discountAmount: "15" },
	];

	// Right now the first slide sets the height
	// The flex: 1 (slideWrapper, container) makes it possible to fill the entire height
	// onLayout={e => this.props.onSlideLayout(e.nativeEvent.layout.height)}

	render() {
		return (
			<View style={styles.slideWrapper}>
				<TouchableOpacity style={styles.slideTitleWrapper} onPress={this.props.requestPage}>
					<Text style={styles.slideTitleText}>STATISTICS</Text>
					<Icon name="chevron-right" size={20} style={styles.slideTitleIcon} />
				</TouchableOpacity>
				<View style={styles.container}>
					<View style={styles.listTitleRow}>
						<Text style={styles.listTitleText}>Recent statistics:</Text>
						<Text style={styles.listTitleOtherText}>See all</Text>
					</View>
					<Text>Stats will go over here</Text>
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
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.BLUE_SECONDARY,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		width: "100%",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},

	// Title
	titleWrapper: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 30,
		marginBottom: 20,
	},
	titleText: {
		height: 22,
		resizeMode: "contain",
		width: "100%",
	},

	// Slide Content
	list: {
		padding: 0,
		margin: 0,
		flexGrow: 0,
		flexShrink: 0,
		flex: 0,
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
		marginTop: 10,
	},
	listTitleOtherText: {
		fontFamily: Montserrat.MEDIUM,
		color: "rgba(255,255,255,0.6)",
		fontSize: 14,
	},
});

export default AllCouponsSlide;
