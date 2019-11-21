import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";

import { Colors } from "./../../constants/colors";

const BackgroundImageOverlay = ({ backgroundImage }) => (
	<View style={styles.wrapper}>
		<ImageBackground 
			// source={typeof backgroundImage === 'string' ? { uri: backgroundImage } : backgroundImage } 
			source={{ uri: backgroundImage }}
			style={styles.backgroundImage} 
			blurRadius={3} 
		/>
		<View style={styles.overlay} />
	</View>
);

const styles = StyleSheet.create({
	wrapper: {
		zIndex: 0,
		flex: 1,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	backgroundImage: {
		zIndex: 0,
		flex: 1,
		resizeMode: "cover",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	overlay: {
		zIndex: 1,
		flex: 1,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: Colors.BLUE_SECONDARY,
		opacity: 0.6,
	},
});

export default BackgroundImageOverlay;
