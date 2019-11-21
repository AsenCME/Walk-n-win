import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Colors } from "../../../constants/colors";
import { Montserrat } from "../../../constants/fonts";

const OtherMethods = ({ onFacebookRegister, onGoogleRegister }) => (
	<React.Fragment>
		<Text style={styles.otherMethodsText}>Other methods</Text>

		<View style={styles.otherMethodsContainer}>
			<TouchableOpacity onPress={onFacebookRegister}>
				<Icon name="facebook-f" style={[styles.method, styles.facebook]} />
			</TouchableOpacity>
			<TouchableOpacity onPress={onGoogleRegister}>
				<Icon name="google" style={[styles.method, styles.google]} />
			</TouchableOpacity>
		</View>
	</React.Fragment>
);

export default OtherMethods;

const styles = StyleSheet.create({
	otherMethodsText: {
		textAlign: "center",
		fontFamily: Montserrat.BOLD,
		fontSize: 16,
		color: "#000",
	},
	otherMethodsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	method: {
		fontSize: 25,
		marginHorizontal: 10,
	},
	facebook: {
		color: Colors.FACEBOOK_BLUE,
	},
	google: {
		color: Colors.GOOGLE_RED,
	},
});
