import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	Alert,
	Dimensions,
	ToastAndroid,
} from "react-native";
import { connect } from "react-redux";

import { createUserWithEmail } from "../../src/actions/userActions";
import { loadApp, showLogin } from "../../navigation/index";

import Input from "./components/Input";
import PasswordInput from "./components/PasswordInput";
import CheckBox from "./components/Checkbox";
import OtherMethods from "./components/OtherMethods";
import Button from "./components/Button";
import { validateEmail } from "./utils";

import { Colors } from "../../constants/colors";
import { Montserrat } from "../../constants/fonts";

const { width, height } = Dimensions.get("window");

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			email: "",
			password: "",
			checked: true,
			error: "",
			topHeight: 100,
		};

		this.emailInpRef = null;
		this.passwordInpRef = null;
	}

	onTextChange = (text, name) => {
		this.setState({
			[name]: text,
			error: "",
		});
	};

	onRegister = () => {
		const { email, password, username } = this.state;

		// Missing data
		if (username.length === 0) {
			Alert.alert("Missing data", "Username is missing");
			return;
		}

		if (email.length === 0) {
			Alert.alert("Missing data", "Email address is missing");
			return;
		}

		if (password.length === 0) {
			Alert.alert("Missing data", "Password is missing");
			return;
		}

		// Invalid data
		if (username.length < 2) {
			Alert.alert("Invalid data", "Username too short");
			return;
		}

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

		this.props.createUser(email, password, username).then(data => {
			if (data instanceof Error) {
				this.setState({
					error: data.message,
				});
			} else {
				loadApp();
			}
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

	goToLogin = () => {
		showLogin(this.props.componentId);
	};

	// XXX: Function to set height based on form element
	// XXX: Add following code to other element
	// onLayout = { event => {
	// const { height } = event.nativeEvent.layout;
	// this.measureElements(height);
	// }}
	// XXX: Function
	// measureElements = formHeight => {
	// 	this.setState({ topHeight: height - formHeight });
	// };

	render() {
		if (this.state.error.length > 0) {
			Alert.alert("Error!", this.state.error);
		}

		const logoImageSrc = require("./../../assets/shapes.png");
		return (
			<KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={-5000}>
				<View style={styles.homeContainer}>
					<Image source={logoImageSrc} style={styles.logoImage} />
					<View style={styles.logoContainer}>
						<Text style={styles.logoText}>WNS</Text>
					</View>

					<View style={styles.formContainer}>
						<View style={styles.formInner}>
							<Text style={styles.formTitle}>Create an account</Text>

							<Input
								name="username"
								onChange={this.onTextChange}
								value={this.state.username}
								label="Username"
								placeholder="Username"
								keyboardType="default"
								iconName="user-alt"
								nextRef={this.emailInpRef}
							/>
							<Input
								name="email"
								onChange={this.onTextChange}
								value={this.state.email}
								label="Email"
								placeholder="Your email"
								keyboardType="email-address"
								iconName="envelope"
								getRef={ref => {
									this.emailInpRef = ref;
								}}
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

							<CheckBox />

							<Button onPress={this.onRegister} buttonText="Continue" />

							<OtherMethods
								onFacebookRegister={this.onFacebookRegister}
								onGoogleRegister={this.onGoogleRegister}
							/>
						</View>

						<Text style={styles.bottomText}>
							Already registered?{" "}
							<Text onPress={this.goToLogin} style={styles.anchor}>
								Login!
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
		marginBottom: 10,
	},
	logoText: {
		fontSize: 70,
		color: Colors.BLUE_MAIN,
		fontFamily: Montserrat.BLACK,
		letterSpacing: 0,
		margin: 0,
	},
	logoImage: {
		position: "absolute",
		top: -30,
		right: 0,
		width: width / 2 + 40,
		height: width / 2 + 40,
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
	formTitle: {
		color: Colors.BLUE_MAIN,
		fontFamily: Montserrat.BOLD,
		fontSize: 18,
		textAlign: "center",
		marginBottom: 30,
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
		createUser: (email, password, username) =>
			dispatch(createUserWithEmail(email, password, username)),
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(Register);
