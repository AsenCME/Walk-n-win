import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const BackButton = ({ onPress }) => {
	return (
		<TouchableHighlight onPress={onPress} style={styles.backButton} underlayColor={"#ededed"}>
			<Icon name="chevron-left" size={25} style={styles.backButtonIcon} />
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	backButton: {
		position: "absolute",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		left: 20,
		height: 40,
		width: 40,
		borderRadius: 20,
	},
	backButtonIcon: {
		color: "#000",
	},
});

export default BackButton;
