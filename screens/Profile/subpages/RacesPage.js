import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Navigation } from "react-native-navigation";

import LinearGradient from "react-native-linear-gradient";

import PageHeader from "./../components/PageHeader";
import CurrentRaceCard from "./../components/CurrentRaceCard";
import PastRaceCard from "./../components/PastRaceCard";

import { Colors } from "./../../../constants/colors";
import { Montserrat } from "./../../../constants/fonts";

class RacesPage extends React.Component {
	render() {
		return (
			<LinearGradient
				colors={[Colors.GRADIENT_START, Colors.GRADIENT_END]}
				style={styles.pageWrapper}>
				<ScrollView style={styles.scrollView}>
					{/* Current Race */}
					<View style={styles.groupWrapper}>
						<Text style={styles.groupTitle}>Current Race</Text>
						<CurrentRaceCard />
					</View>
					<View style={styles.groupWrapper}>
						<Text style={styles.groupTitle}>Past Races</Text>
						<PastRaceCard />
					</View>
				</ScrollView>
				<PageHeader pageTitle={"RACES"} componentId={this.props.componentId} />
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	pageWrapper: {
		flex: 1,
	},
	scrollView: {
		paddingTop: 60,
		paddingHorizontal: 30,
		flex: 1,
	},
	groupWrapper: {
		marginTop: 30,
	},
	groupTitle: {
		color: "#fff",
		fontFamily: Montserrat.MEDIUM,
		fontSize: 14,
	},
});

export default RacesPage;
