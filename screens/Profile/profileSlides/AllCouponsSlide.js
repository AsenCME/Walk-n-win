import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Colors } from "./../../../constants/colors";
import { Montserrat } from "./../../../constants/fonts";

import MiniCouponCard from "../components/MiniCouponCard";

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

	// To measure if needed
	// Right now the first slide sets the height
	// The flex: 1 (slideWrapper, container) makes it possible to fill the entire height
	// onLayout={e => this.props.onSlideLayout(e.nativeEvent.layout.height)}

	render() {
		const recentCouponsConditional =
			this.recentCoupons.length > 0 ? (
				<FlatList
					style={styles.list}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					data={this.recentCoupons}
					renderItem={({ item, index }) => {
						return (
							<MiniCouponCard
								storeName={item.storeName}
								discountAmount={item.discountAmount}
								logoImage={this.logoImageSrc}
								isFirst={index === 0}
								isLast={index === this.recentCoupons.length - 1}
							/>
						);
					}}
				/>
			) : (
				<Text>No recent codes added or used.</Text>
			);

		return (
			<View style={styles.slideWrapper}>
				<TouchableOpacity style={styles.slideTitleWrapper} onPress={this.props.requestPage}>
					<Text style={styles.slideTitleText}>COUPONS</Text>
					<Icon name="chevron-right" size={20} style={styles.slideTitleIcon} />
				</TouchableOpacity>
				<View style={styles.container}>
					<View style={styles.listTitleRow}>
						<Text style={styles.listTitleText}>Recent coupons:</Text>
						<Text style={styles.listTitleOtherText}>See all</Text>
					</View>
					{recentCouponsConditional}
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
