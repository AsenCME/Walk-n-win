import React from "react";
import { View, CheckBox, Text, StyleSheet } from "react-native";

import { Colors } from "./../../../constants/colors";
import { Montserrat } from "./../../../constants/fonts";

class CheckboxField extends React.Component {
	state = {
		checked: false,
	};

	onPress = () => {
		this.setState(prevState => {
			return {
				checked: !prevState.checked,
			};
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<CheckBox
					style={styles.checkBoxStyle}
					value={this.state.checked}
					onValueChange={this.onPress}
				/>
				<Text style={styles.text}>
					I agree to the <Text style={styles.anchor}>Terms of Service</Text>
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
		paddingLeft: 0,
		marginLeft: 0,
	},
	checkBoxStyle: {
		paddingLeft: 0,
		marginLeft: 0,
	},
	text: {
		fontSize: 12,
		fontFamily: Montserrat.MEDIUM,
	},
	anchor: {
		color: Colors.BLUE_SECONDARY,
		fontSize: 11,
		textDecorationLine: "underline",
		fontFamily: Montserrat.SEMIBOLD,
	},
});

export default CheckboxField;
