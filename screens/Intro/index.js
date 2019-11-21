import React, { Component } from "react";
import {
	View,
	Image,
	Text,
	StyleSheet,
	AsyncStorage,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { showRegister } from "../../navigation/index";

import { Colors } from "./../../constants/colors";
import { Montserrat } from "./../../constants/fonts";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
	image: {
		width: width,
		height: width - 40,
	},
	imageContainer: {
		marginBottom: 40,
	},
	mainContent: {
		height: height,
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "stretch",
		position: "relative",
	},
	text: {
		color: Colors.BLUE_MAIN,
		fontSize: 16,
		textAlign: "left",
		fontFamily: Montserrat.REGULAR,
		paddingHorizontal: 30,
	},
	title: {
		fontSize: 25,
		color: Colors.BLUE_MAIN,
		fontFamily: Montserrat.BOLD,
		paddingHorizontal: 30,
		marginBottom: 20,
	},
	contentContainer: {
		flex: 1,
	},
	bottomButton: {
		width: width,
		marginHorizontal: -16,
		// translateX: -50,
		height: 60,
		backgroundColor: Colors.BLUE_MAIN,
		alignItems: "center",
		justifyContent: "center",
	},
	bottomButtonText: {
		color: "#fff",
		textAlignVertical: "center",
		fontFamily: Montserrat.MEDIUM,
		fontSize: 20,
		textAlign: "center",
	},
});

const slides = [
	{
		key: "somethun",
		// title: "Be more active!",
		title: "Бъде активен",
		// text:
		// 	"Simply walk or run outside and the app will track your activity. Every step is worth a point!",
		text: "Ходи или тичай навън и приложението автоматично отчита крачките ти. Всяка крачка се равнява на 1 точка!",
		image: require("../../assets/slide1.png"),
		imageStyle: styles.image,
		backgroundColor: Colors.ALMOST_WHITE,
	},
	{
		key: "somethun-dos",
		// title: "Earn Coins!",
		title: "Печели кредити",
		// text:
		// 	"After you collect a certain amount of points they will atomatically be converted into a coin.",
		text: "След като събереш определен брой точки те ще бъдат превърнати в една монета",
		image: require("../../assets/slide2.png"),
		imageStyle: styles.image,
		backgroundColor: Colors.ALMOST_WHITE,
	},
	{
		key: "somethun1",
		// title: "Redeem your reward!",
		title: "Получи награди",
		// text: "Coins can be exchanged for discound codes in our Marketplace.",
		text: "Използвай монетите, като ги обмениш за ваучери за отстъпка на страницата Маркет",
		image: require("../../assets/slide3.png"),
		imageStyle: styles.image,
		backgroundColor: Colors.ALMOST_WHITE,
	},
];

export default class Intro extends Component {
	onDone = async () => {
		AsyncStorage.setItem("skipIntro", "yes").finally(() => {
			showRegister();
		});
	};

	_renderItem = props => {
		const style = {
			backgroundColor: props.backgroundColor,
			paddingTop: 0,
			paddingBottom: 0,
			width: props.width,
		};

		return (
			<View style={[styles.mainContent, style]}>
				<View style={styles.contentContainer}>
					<Image source={props.image} style={[props.imageStyle, styles.imageContainer]} />
					<Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
					<Text style={[styles.text, props.textStyle]}>{props.text}</Text>
				</View>
			</View>
		);
	};

	_renderSkip = () => {
		return (
			<View style={styles.bottomButton}>
				<TouchableOpacity
					style={{ alignItems: "center", justifyContent: "center" }}
					onPress={this.onDone}>
					<Text style={styles.bottomButtonText}>Започни</Text>
				</TouchableOpacity>
			</View>
		);
	};

	render() {
		return (
			<AppIntroSlider
				slides={slides}
				onDone={this.onDone}
				onSkip={this.onDone}
				renderItem={this._renderItem}
				renderSkipButton={this._renderSkip}
				renderNextButton={this._renderSkip}
				renderDoneButton={this._renderSkip}
				dotStyle={{
					backgroundColor: "rgba(0, 0, 0, .2)",
					bottom: 0,
				}}
				activeDotStyle={{
					transform: [
						{
							scaleX: 1.15,
						},
						{
							scaleY: 1.15,
						},
					],
					backgroundColor: Colors.BLUE_MAIN,
					bottom: 0,
				}}
				bottomButton
				hideNextButton
				showSkipButton
			/>
		);
	}
}
