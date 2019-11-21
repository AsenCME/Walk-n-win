import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	Alert,
	Dimensions,
} from "react-native";

import { Navigation } from "react-native-navigation";

import { connect } from "react-redux";
import { loginUser } from "../../src/actions/userActions";
import { loadApp } from "../../navigation/index";
import Input from "./components/Input";
import PasswordInput from "./components/PasswordInput";
import OtherMethods from "./components/OtherMethods";
import Button from "./components/Button";

import { validateEmail } from "./utils";

import { Colors } from "../../constants/colors";
import { Montserrat } from "../../constants/fonts";

const { width, height } = Dimensions.get("window");

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.passwordInpRef = null;
	}

	state = {
		email: "",
		password: "",
		formHeight: 100,
		topHeight: 100,
	};

	onTextChange = (text, name) => {
		this.setState({
			[name]: text,
		});
	};

	onLogin = () => {
		const { email, password } = this.state;

		// Missing data
		if (email.length === 0) {
			Alert.alert("Missing data", "Email address is missing");
			return;
		}

		if (password.length === 0) {
			Alert.alert("Missing data", "Password is missing");
			return;
		}

		// Invalid data
		if (!validateEmail(email)) {
			Alert.alert("Invalid data", "Invalid email address");
			return;
		}

		const pattern = /^(?=.d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*s).{8,32}$/;
		const easyPattern = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$/;
		const simplePattern = /^(?=.[a-zA-Z0-9]).{6,20}$/;

		if (!simplePattern.test(password)) {
			Alert.alert(
				"Invalid data",
				"Password must be at least 8 symbols, contain one lowercase letter, one uppercase letter, one digit and one special character.",
			);
			return;
		}

		this.props
			.signIn(email, password)
			.then(data => {
				if (data instanceof Error) Alert.alert("Error", data.message);
				else loadApp();
			})
			.catch(err => {
				Alert.alert("Error", err.message);
			});
	};

	onFacebookRegister = () => {
		ToastAndroid.showWithGravity(
			"Facebook not yet integrated",
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM,
		);
	};

	onGoogleRegister = () => {
		ToastAndroid.showWithGravity(
			"Google not yet integrated",
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM,
		);
	};

	goToRegister = () => {
		Navigation.pop(this.props.componentId);
	};

	measureElements = formHeight => {
		this.setState({ topHeight: height - formHeight });
	};

	render() {
		const logoImageSrc = require("./../../assets/shapes.png");
		return (
			<KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={-5000}>
				<View style={styles.homeContainer}>
					<Image source={logoImageSrc} style={styles.logoImage} />
					<View style={styles.logoContainer}>
						<Text style={styles.logoText}>WNS</Text>
					</View>
					<View
						style={styles.formContainer}
						onLayout={event => {
							const { height } = event.nativeEvent.layout;
							this.measureElements(height);
						}}>
						<View style={styles.formInner}>
							<Text style={styles.formBigTitle}>Hello!</Text>
							<Text style={styles.formTitle}>Login to your account</Text>
							<Input
								name="email"
								onChange={this.onTextChange}
								value={this.state.email}
								label="Email"
								placeholder="Your email"
								keyboardType="email-address"
								iconName="envelope"
								nextRef={this.passwordInpRef}
							/>
							<PasswordInput
								name="password"
								onChange={this.onTextChange}
								value={this.state.password}
								label="Password"
								placeholder="Your password"
								getRef={ref => {
									this.passwordInpRef = ref;
								}}
							/>

							<Button onPress={this.onLogin} buttonText="Login" />

							<OtherMethods
								onFacebookRegister={this.onFacebookRegister}
								onGoogleRegister={this.onFacebookRegister}
							/>
						</View>
						<Text style={styles.bottomText}>
							Don't have an account?{" "}
							<Text onPress={this.goToRegister} style={styles.anchor}>
								Register!
							</Text>
						</Text>
					</View>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		justifyContent: "flex-end",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: Colors.ALMOST_WHITE,
	},
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	logoText: {
		fontSize: 70,
		color: Colors.BLUE_MAIN,
		fontFamily: Montserrat.BLACK,
		letterSpacing: 0,
	},
	logoImage: {
		position: "absolute",
		top: -20,
		right: 0,
		width: width / 2 + 50,
		height: width / 2 + 50,
		resizeMode: "contain",
	},
	formContainer: {
		marginBottom: 20,
		width: width - 34,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	formInner: {
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 15,
		paddingHorizontal: 25,
		paddingBottom: 20,
		paddingTop: 15,
		marginBottom: 20,
		justifyContent: "center",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
	},
	formBigTitle: {
		color: Colors.BLUE_MAIN,
		fontFamily: Montserrat.BOLD,
		fontSize: 40,
		textAlign: "center",
		marginBottom: 0,
	},
	formTitle: {
		color: Colors.BLUE_MAIN,
		fontFamily: Montserrat.BOLD,
		fontSize: 18,
		textAlign: "center",
		marginBottom: 40,
	},

	icon: {
		marginRight: 10,
	},
	bottomText: {
		fontSize: 15,
		color: Colors.BLUE_MAIN,
		fontFamily: Montserrat.MEDIUM,
	},
	anchor: {
		color: Colors.BLUE_SECONDARY,
		textDecorationLine: "underline",
		fontFamily: Montserrat.BOLD,
	},
});

const mapDispatchToProps = dispatch => {
	return {
		signIn: (email, password) => dispatch(loginUser(email, password)),
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(Login);
