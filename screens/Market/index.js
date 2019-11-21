import React from "react";
import { Navigation } from "react-native-navigation";
import { FlatList, StyleSheet, ActivityIndicator, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import { fetchCodes, selectCompany } from "../../src/actions/codeFetchActions";

import { Colors } from "./../../constants/colors";

import Header from "./Header";
import MarketOffer from "./MarketOffer";
import { Montserrat } from "../../constants/fonts";

class Market extends React.Component {
	componentDidMount() {
		this.props.fetchCodes();
	}

	openDetails = index => {
		this.props.selectCompany(index);
		Navigation.push(this.props.componentId, {
			component: {
				name: "steps.codeDetails",
				options: {
					bottomTabs: {
						visible: false,
						drawBehind: true,
					},
				},
			},
		});
	};

	render() {
		const offersConditional =
			this.props.codes.length > 0 ? (
				<FlatList
					style={styles.offersContainer}
					data={this.props.codes}
					renderItem={({ item, index }) => {
						return (
							<MarketOffer
								key={index}
								item={item}
								index={index}
								onPress={this.openDetails}
								isFirst={index === 0 ? true : false}
							/>
						);
					}}
				/>
			) : (
				<Text style={styles.textEmpty}>There are currently no offers...</Text>
			);

		return (
			<LinearGradient
				colors={[Colors.GRADIENT_START, Colors.GRADIENT_END]}
				style={styles.homeContainer}>
				{this.props.isFetching ? (
					<View style={styles.offersContainer}>
						<ActivityIndicator
							style={{ opacity: 1 }}
							color={Colors.ALMOST_WHITE}
							size={80}
							animating
						/>
					</View>
				) : (
					offersConditional
				)}
				<Header credits={this.props.credits} />
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		justifyContent: "flex-start",
		flexDirection: "column",
		alignItems: "center",
	},
	offersContainer: {
		width: "100%",
		paddingHorizontal: 30,
	},
	textEmpty: {
		fontFamily: Montserrat.LIGHT,
		fontSize: 16,
		color: "#fff",
		marginTop: 150,
	},
});

const mapStateToProps = state => {
	return {
		codes: state.codes.codes,
		isFetching: state.codes.isFetching,
		error: state.codes.error,
		credits: state.user.credits,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchCodes: () => dispatch(fetchCodes()),
		selectCompany: index => dispatch(selectCompany(index)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Market);
