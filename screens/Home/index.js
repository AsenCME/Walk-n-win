import React from "react";
import { Navigation } from "react-native-navigation";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";

import HelpBar from "./HelpBar";
import StepMeter from "./StepMeter";
import QuickStatistics from "./QuickStatistics";

import { Montserrat } from "../../constants/fonts";
import { Colors } from "./../../constants/colors";
import Points from "../../constants/points";

class Home extends React.Component {
	state = { topRatio: 0.5, bottomRatio: 0.5 };

	showHelp = () => {
		Navigation.showModal({
			component: {
				name: "steps.infoPage",
				options: {
					modalPresentationStyle: "overFullScreen",
					animations: {
						showModal: { enabled: true },
						dismissModal: { enabled: true },
					},
					bottomTabs: {
						visible: false,
						drawBehind: true,
					},
				},
			},
		});
	};

	measureElements = elementHeight => {
		const height = Dimensions.get("window").height;
		console.log(elementHeight / height);
	};

	render() {
		const neededPoints = Points[this.props.credits | 0];
		const backgroundImageSrc = require("./../../assets/background_letters.png");
		return (
			<LinearGradient colors={[Colors.GRADIENT_START, Colors.GRADIENT_END]} style={{ flex: 1 }}>
				<Image source={backgroundImageSrc} style={styles.backgroundImage} />
				<View style={styles.homeContainer}>
					<View
						style={styles.topPart}
						onLayout={event => {
							const { height } = event.nativeEvent.layout;
							this.measureElements(height);
						}}>
						<HelpBar onHelpPress={this.showHelp} />
						<StepMeter
							credits={this.props.credits}
							steps={this.props.steps}
							totalPoints={this.props.totalPoints}
							nextCreditPoints={neededPoints}
						/>
					</View>
					<View style={styles.quickInfo}>
						<View style={styles.activitiesTitleContainer}>
							<View style={styles.titleLine} />
							<Text style={styles.activitiesTitle}>Activity today</Text>
							<View style={styles.titleLine} />
						</View>
						<QuickStatistics
							steps={this.props.steps}
							calories={this.props.calories}
							distance={this.props.distance}
							containerStyles={styles.quickStatContainer}
						/>
					</View>
				</View>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	backgroundImage: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		resizeMode: "cover",
	},
	homeContainer: {
		flex: 1,
		marginHorizontal: 20,
	},
	topPart: {
		marginTop: 25,
	},
	quickInfo: {
		flex: 3,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	activitiesTitleContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	activitiesTitle: {
		fontFamily: Montserrat.SEMIBOLD,
		color: "#fff",
		fontSize: 24,
		lineHeight: 25,
	},
	titleLine: {
		height: 3,
		backgroundColor: "#fff",
		borderRadius: 100,
		width: 40,
		marginHorizontal: 20,
	},
	quickStatContainer: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 30,
	},
});

const mapStateToProps = state => {
	return {
		steps: state.activities.steps,
		calories: state.activities.calories,
		distance: state.activities.distance,
		credits: state.user.credits,
		totalPoints: state.user.totalPoints,
	};
};

export default connect(mapStateToProps)(Home);
