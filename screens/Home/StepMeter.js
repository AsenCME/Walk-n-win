import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import { Montserrat } from "../../constants/fonts";
import { Colors } from "../../constants/colors";
import Points from "../../constants/points";
import LinearGradient from "react-native-linear-gradient";

class StepMeter extends Component {
	state = {
		currentProgress: 1,
		width: 1,
		humanWidth: 1,
	};

	componentDidMount() {
		setTimeout(() => {
			this.viewRef.measure((x, y, w, h) => {
				this.pointsTextRef.measure((x1, y1, w1, h1) => {
					this.setState({
						width: w,
						humanWidth: 10 + w1,
					});
				});
			});
		});
	}

	calculateProgress(neededPoints, currentPoints, totalWidth) {
		return (currentPoints / neededPoints) * totalWidth;
	}

	calculateStartPoints() {
		let pastLevelsPoints = 0;
		for (let i = 0; i < this.props.credits - 1; i++) {
			pastLevelsPoints += Points[i];
		}

		// return this.props.nextCreditPoints - pastLevelsPoints;
		return this.props.nextCreditPoints - 1000;
	}

	render() {
		// const currentSteps = this.calculateStartPoints();
		const currentSteps = this.props.totalPoints;
		let currentWidth = this.calculateProgress(
			this.props.nextCreditPoints,
			currentSteps,
			this.state.width,
		);
		let leftForHuman = currentWidth;
		let humanOffset = 22;

		if (currentWidth + this.state.humanWidth >= this.state.width) {
			leftForHuman = this.state.width - this.state.humanWidth;
		}
		if (leftForHuman < 20) humanOffset = -5;

		return (
			<View
				style={styles.container}
				ref={ref => {
					this.viewRef = ref;
				}}
				collapsable={false}>
				<View style={styles.path}>
					<View
						style={[styles.humanCounter, { left: (leftForHuman - humanOffset) | 0 }]}
						collapsable={false}>
						<Icon name="walking" size={30} color="#fff" />
						<Text
							style={styles.pointsText}
							ref={pointsRef => {
								this.pointsTextRef = pointsRef;
							}}>
							{currentSteps | 0}
						</Text>
					</View>
				</View>
				<View style={styles.meter}>
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						colors={[Colors.METER_GRADIENT_START, Colors.METER_GRADIENT_END]}
						style={[styles.meterBar, { width: currentWidth | 0 }]}
					/>
				</View>
				<View style={styles.statisticsBar}>
					<View style={styles.coinsContainer}>
						<Text style={styles.coinText}>{this.props.credits}</Text>
						<Text style={styles.coinIndicator}> {this.props.credits == 1 ? "coin" : "coins"}</Text>
					</View>

					<Text style={styles.points}>{this.props.nextCreditPoints} points</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	path: {
		width: "100%",
		position: "relative",
	},
	meter: {
		borderRadius: 4,
		width: "100%",
		height: 8,
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		marginTop: 5,
		position: "relative",
	},
	meterBar: {
		borderRadius: 20,
		backgroundColor: "rgba(255, 255, 255, 1)",
		position: "absolute",
		bottom: -2,
		height: 12,
	},
	humanCounter: {
		position: "relative",
		flexDirection: "row",
		alignItems: "flex-end",
		marginBottom: 5,
	},
	statisticsBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	points: {
		marginTop: 12,
		marginRight: 5,
		color: "#fff",
		fontSize: 14,
		fontFamily: Montserrat.SEMIBOLD,
	},
	coinsContainer: {
		marginTop: -10,
		marginLeft: 10,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	coinText: {
		fontFamily: Montserrat.BOLD,
		fontSize: 70,
		color: "#fff",
	},
	coinIndicator: {
		fontFamily: Montserrat.REGULAR,
		fontSize: 20,
		color: "#fff",
		alignSelf: "flex-end",
		marginBottom: 15,
		marginLeft: 5,
	},
	pointsText: {
		color: "#fff",
		marginLeft: 8,
		fontFamily: Montserrat.REGULAR,
		fontSize: 14,
	},
});

export default StepMeter;
