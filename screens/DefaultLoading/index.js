import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const DefaultLoading = () => (
	<View style={styles.container}>
		<ActivityIndicator color={Colors.BLUE_MAIN} size={70} />
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.2)",
	},
});

export default DefaultLoading;
