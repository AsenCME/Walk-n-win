import React from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Colors } from "../../../constants/colors";
import { Montserrat } from "../../../constants/fonts";

const Input = ({
	value,
	onChange,
	placeholder,
	name,
	label,
	keyboardType = "default",
	iconName = "user-alt",
	iconSize = 24,
	isLast = false,
	getRef = () => null,
	nextRef = null,
}) => (
	<View style={styles.inputContainer}>
		<Text style={styles.label}>{label}</Text>
		<View style={styles.iconContainer}>
			<TextInput
				value={value}
				onChangeText={text => onChange(text, name)}
				style={styles.inputStyle}
				keyboardType={keyboardType}
				placeholder={placeholder}
				placeholderTextColor="rgba(0, 0, 0, 0.5)"
				blurOnSubmit={false}
				returnKeyType={isLast ? "done" : "next"}
				ref={input => getRef(input)}
				onSubmitEditing={() => {
					if (nextRef !== null) {
						nextRef.focus();
					}
				}}
			/>
			<Icon style={styles.icon} name={iconName} size={iconSize} color={Colors.BLUE_MAIN} solid />
		</View>
	</View>
);

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		marginBottom: 20,
	},
	inputStyle: {
		backgroundColor: "transparent",
		color: Colors.BLUE_MAIN,
		fontSize: 16,
		width: "100%",
		paddingTop: 0,
		paddingBottom: 5,
		paddingLeft: 0,
		borderBottomColor: Colors.BLUE_MAIN,
		borderBottomWidth: 2,
		fontFamily: Montserrat.REGULAR,
	},
	label: {
		fontFamily: Montserrat.BOLD,
		fontSize: 14,
		color: Colors.BLUE_MAIN,
	},
	iconContainer: {
		position: "relative",
	},
	icon: {
		position: "absolute",
		right: 5,
		bottom: 5,
		color: Colors.BLUE_MAIN,
	},
});

export default Input;
