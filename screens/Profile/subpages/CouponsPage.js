import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import PageHeader from "./../components/PageHeader";
import CouponCard from "./../components/CouponCard";

import { Colors } from "./../../../constants/colors";
import { Montserrat } from "./../../../constants/fonts";

class CouponsPage extends React.Component {
	logoImageSrc = require("./../../../assets/starbucks_logo.png");

	coupons = [
		{ storeName: "Starbucks", discountAmount: "20", longer: true },
		{ storeName: "Sport Depot", discountAmount: "15" },
		{ storeName: "Starbucks", discountAmount: "20" },
		{ storeName: "Sport Depot", discountAmount: "15" },
		{ storeName: "Starbucks", discountAmount: "20" },
		{ storeName: "Sport Depot", discountAmount: "15" },
	];

	render() {
		const newCodesList =
			this.coupons.length > 0 ? (
				<FlatList
					style={styles.list}
					contentContainerStyle={styles.listContent}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					data={this.coupons}
					renderItem={({ item, index }) => {
						return (
							<CouponCard
								item={item}
								logoImage={this.logoImageSrc}
								isFirst={index === 0}
								isLast={index === this.coupons.length - 1}
							/>
						);
					}}
				/>
			) : (
				<Text style={styles.textEmpty}>No new coupons yet.</Text>
			);

		const usedCodesList =
			this.coupons.length > 0 ? (
				<FlatList
					style={{ ...styles.list, marginBottom: 30 }}
					contentContainerStyle={styles.listContent}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					data={this.coupons}
					renderItem={({ item, index }) => {
						return (
							<CouponCard
								item={item}
								logoImage={this.logoImageSrc}
								isFirst={index === 0}
								isLast={index === this.coupons.length - 1}
							/>
						);
					}}
				/>
			) : (
				<Text style={styles.textEmpty}>No used coupons yet.</Text>
			);

		return (
			<LinearGradient
				colors={[Colors.GRADIENT_START, Colors.GRADIENT_END]}
				style={styles.pageWrapper}>
				<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
					<View>
						<View style={{ ...styles.titleWrapper, marginTop: 120 }}>
							<Text style={styles.groupTitle}>New Codes</Text>
							<View style={styles.sepDot} />
							<Text style={styles.groupTitle}>{this.coupons.length}</Text>
						</View>
						{newCodesList}
					</View>

					<View>
						<View style={styles.titleWrapper}>
							<Text style={styles.groupTitle}>Used Codes</Text>
							<View style={styles.sepDot} />
							<Text style={styles.groupTitle}>{this.coupons.length}</Text>
						</View>
						{usedCodesList}
					</View>
				</ScrollView>

				<PageHeader pageTitle={"COUPONS"} componentId={this.props.componentId} />
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	pageWrapper: {
		flex: 1,
		overflow: "scroll",
	},
	titleWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingHorizontal: 30,
		marginTop: 50,
	},
	groupTitle: {
		color: "#fff",
		fontFamily: Montserrat.MEDIUM,
		fontSize: 14,
	},
	sepDot: {
		backgroundColor: "#fff",
		width: 6,
		height: 6,
		borderRadius: 10,
		marginHorizontal: 5,
	},
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

	textEmpty: {
		color: "#fff",
		fontSize: 14,
		fontFamily: Montserrat.LIGHT,
		paddingHorizontal: 30,
	},
});

export default CouponsPage;
