import React from "react";
import { StyleSheet, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";

import { Colors } from "./../../constants/colors";

import Header from "./Header";
import ListItem from "./ListItem";

class CodeDetails extends React.Component {
	storeName = "Starbucks";
	currentCoins = 6;
	logoImage = require("./../../assets/starbucks_logo.png");
	backgroundImage = require("./../../assets/starbucks.jpeg");
	discountCodes = [
		{
			discountValue: 20,
			discountDescription: "You can get this if you are a good boy",
			coinsRequired: 6,
			codesLeft: 100,
		},
		{
			discountValue: 15,
			discountDescription: "You can get this if you are a good boy",
			coinsRequired: 5,
			codesLeft: 150,
		},
		{
			discountValue: 10,
			discountDescription: "You can get this if you are a good boy",
			coinsRequired: 4,
			codesLeft: 50,
		},
		{
			discountValue: 5,
			discountDescription: "You can get this if you are a good boy",
			coinsRequired: 3,
			codesLeft: 200,
		},
	];

	render() {
		const brand = this.props.code;
		const codes = brand.codes.map(code => ({
			discountValue: code.discount,
			discountDescription: code.description,
			coinsRequired: code.price,
			codesLeft: code.inStock,
		}));

		codes.sort((a, b) => a.coinsRequired >= b.coinsRequired);

		return (
			<LinearGradient
				colors={[Colors.GRADIENT_START, Colors.GRADIENT_END]}
				style={styles.backgroundEl}>
				<FlatList
					style={styles.offersList}
					data={codes}
					renderItem={({ item, index }) => {
						return (
							<ListItem
								key={index}
								index={index}
								item={item}
								isFirst={index === 0 ? true : false}
							/>
						);
					}}
				/>
				<Header
					componentId={this.props.componentId}
					storeName={brand.storeName}
					currentCoins={this.props.credits}
					logoImage={brand.logoImage}
					backgroundImage={brand.backgroundImage}
				/>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	backgroundEl: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	offersList: {
		width: "100%",
		paddingHorizontal: 30,
	},
});

const mapStateToProps = state => {
	const selected = state.codes.selected;
	return {
		code: state.codes.codes[selected],
		credits: state.user.credits,
	};
};

export default connect(mapStateToProps)(CodeDetails);
