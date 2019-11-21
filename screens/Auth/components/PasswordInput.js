import React from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Colors } from "../../../constants/colors";
import { Montserrat } from "../../../constants/fonts";

class PasswordInput extends React.Component {
	state = {
		showPassword: false,
	};

	onEyeClick = () => {
		this.setState(prevState => {
			return {
				showPassword: !prevState.showPassword,
			};
		});
	};

	render() {
		const { value, onChange, label, placeholder, name } = this.props;
		const iconSize = this.props.iconSize || 24;
		const getRef = this.props.getRef || (() => null);

		return (
			<View style={styles.inputContainer}>
				<Text style={styles.label}>{label}</Text>
				<View style={styles.iconContainer}>
					<TextInput
						secureTextEntry={!this.state.showPassword}
						value={value}
						onChangeText={text => onChange(text, name)}
						style={styles.inputStyle}
						placeholder={placeholder}
						placeholderTextColor="rgba(0, 0, 0, 0.5)"
						ref={ref => getRef(ref)}
					/>
					<TouchableOpacity style={styles.icon} onPress={this.onEyeClick}>
						<Icon
							name={this.state.showPassword ? "eye-slash" : "eye"}
							size={iconSize}
							color={Colors.BLUE_MAIN}
							solid
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		marginBottom: 0,
	},
	inputStyle: {
		backgroundColor: "transparent",
		color: Colors.BLUE_MAIN,
		fontSize: 16,
		width: "100%",
		paddingTop: 0,
		paddingBottom: 5,
		paddingLeft: 0,
		paddingRight: 0,
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
	},
});

export default PasswordInput;
