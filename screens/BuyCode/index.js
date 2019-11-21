import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Animated,
} from "react-native";
import { connect } from "react-redux";
import { buyProduct } from "../../src/actions/userActions";

import MiniCouponCard from "./components/MiniCouponCard";
import MiniCouponCardBought from "./components/MiniCouponCardBought";

import { Colors } from "../../constants/colors";
import { Montserrat } from "../../constants/fonts";
import { Navigation } from "react-native-navigation";

class BuyCode extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			confirmed: false,
			proceed: false,
			isLoading: false,
		};

		this.promptOpacity = new Animated.Value(1);
		this.underlayOpacity = new Animated.Value(1);

		this.storeName = "Starbucks";
		this.validUntil = "20.04.2019";
		this.discountAmount = 20;
		this.logoImage = require("./../../assets/starbucks_logo.png");
	}

	generateCode() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	performBuy() {
		this.props.buyProduct(Number(this.props.code.codes[this.props.index].price)).catch(() => {
			Navigation.dismissOverlay(this.props.componentId);
		});
	}

	onDeny = () => {
		Animated.timing(this.underlayOpacity, {
			duration: 200,
			toValue: 0,
			useNativeDriver: true,
		}).start(() => {
			Navigation.dismissOverlay(this.props.componentId);
		});
	};

	onContinue = () => {
		Animated.timing(this.promptOpacity, {
			toValue: 0,
			useNativeDriver: true,
			duration: 300,
		}).start(() => {
			this.setState({
				confirmed: true,
				isLoading: true,
			});

			this.performBuy();
		});
	};

	_renderPrompt = () => {
		return (
			<Animated.View style={{ opacity: this.promptOpacity, ...styles.container }}>
				<Text style={styles.containerTitle}>Сигурни ли сте, че искате да закупите този код?</Text>

				<MiniCouponCard
					storeName={this.props.code.storeName}
					validUntil={this.validUntil}
					discountAmount={this.props.code.codes[this.props.index].discount}
					logoImage={this.props.code.logoImage}
				/>

				<View style={styles.buttonsWrapper}>
					<TouchableOpacity onPress={this.onDeny} style={styles.button}>
						<Text style={styles.buttonText}>Не</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.onContinue} style={styles.button}>
						<Text style={styles.buttonText}>Да</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		);
	};

	_renderLoading = () => {
		return (
			<React.Fragment>
				<ActivityIndicator size={100} color={Colors.ALMOST_WHITE} />
			</React.Fragment>
		);
	};

	_renderOrderFinish = () => {
		return (
			<View style={styles.orderFinished}>
				<Text style={{ ...styles.divider, ...styles.containerTitle }}>
					Поздравления! Вашите усилия бяха превърнати във ваучер за отстъпка на стойност{" "}
					{this.props.code.codes[this.props.index].discount}%!
				</Text>
				<MiniCouponCardBought
					storeName={this.props.code.storeName}
					validUntil={this.validUntil}
					discountAmount={this.props.code.codes[this.props.index].discount}
					logoImage={this.props.code.logoImage}
					discountCode={this.generateCode()}
				/>
				{/* Button to go to store? */}
			</View>
		);
	};

	_conditionalRender = () => {
		if (!this.state.confirmed) {
			return this._renderPrompt();
		} else if (this.state.confirmed && this.state.isLoading) {
			return this._renderLoading();
		} else {
			return this._renderOrderFinish();
		}
	};

	render() {
		if (this.state.isLoading) {
			setTimeout(() => {
				this.setState({
					isLoading: false,
					proceed: true,
				});
			}, 800);
		}

		console.log(this.props);

		return (
			<View style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={this.onDeny}>
					<Animated.View style={[styles.underlay, { opacity: this.underlayOpacity }]}>
						<TouchableWithoutFeedback onPress={() => {}}>
							{this._conditionalRender()}
						</TouchableWithoutFeedback>
					</Animated.View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	underlay: {
		backgroundColor: "rgba(0,0,0,0.9)",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		width: "85%",
	},

	divider: {
		marginBottom: 20,
	},

	// Text styles
	containerTitle: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		fontSize: 18,
		fontFamily: Montserrat.BOLD,
		color: "#fff",
		textAlign: "center",
	},

	// Buttons styles
	buttonsWrapper: {
		flexDirection: "row",
		width: "90%",
		marginLeft: "5%",
		paddingVertical: 10,
	},
	button: {
		flex: 0.5,
		padding: 10,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.5)",
		borderRadius: 5,
		marginHorizontal: 10,
	},
	buttonText: {
		textAlign: "center",
		fontFamily: Montserrat.BOLD,
		fontSize: 16,
		color: "#fff",
	},

	// Order finished styles
	orderFinished: {
		width: "80%",
	},
});

const mapStateToProps = state => {
	const selected = state.codes.selected;
	return {
		code: state.codes.codes[selected],
	};
};

const mapDispatchToProps = dispatch => {
	return {
		buyProduct: price => dispatch(buyProduct(price)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BuyCode);
