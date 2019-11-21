import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";

import LinearGradient from "react-native-linear-gradient";

import PageHeader from "./../components/PageHeader";

import { Colors } from "./../../../constants/colors";
import { Montserrat } from "./../../../constants/fonts";

class StatsPage extends React.Component {
	render() {
		return (
			<LinearGradient
				colors={[Colors.GRADIENT_START, Colors.GRADIENT_END]}
				style={styles.pageWrapper}>
				<PageHeader pageTitle={"STATISTICS"} componentId={this.props.componentId} />
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	pageWrapper: {
		flex: 1,
	},
});

export default StatsPage;
