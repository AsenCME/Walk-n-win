import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";
import Swiper from "react-native-swiper";

import AllCouponsSlide from "./profileSlides/AllCouponsSlide";
import AllStatsSlide from "./profileSlides/AllStatsSlide";
import AllRacesSlide from "./profileSlides/AllRacesSlide";

class MainContent extends React.Component {
	state = {
		slideHeight: 304.5,
	};

	handleSlideLayout = slideHeightValue => {
		console.log(slideHeightValue);
		this.setState({ slideHeight: slideHeightValue });
	};

	openCouponsPage = () => {
		this.props.handleOpenCoupons();
	};

	openStatsPage = () => {
		this.props.handleOpenStats();
	};

	openRacesPage = () => {
		this.props.handleOpenRaces();
	};

	render() {
		return (
			<View
				style={styles.mainWrapper}
				onLayout={e => this.handleSlideLayout(e.nativeEvent.layout.height)}>
				<Swiper
					style={styles.swiperWrapper}
					showsButtons={false}
					showsPagination={true}
					dotStyle={styles.dot}
					activeDotStyle={styles.activeDot}
					height={this.state.slideHeight}>
					<AllCouponsSlide requestPage={this.openCouponsPage} />
					<AllStatsSlide requestPage={this.openStatsPage} />
					<AllRacesSlide requestPage={this.openRacesPage} />
				</Swiper>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainWrapper: {
		width: "100%",
		backgroundColor: "#fff",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		flex: 3,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
	},

	dot: {
		width: 6,
		height: 6,
		backgroundColor: "rgba(255,255,255,0.2)",
		borderRadius: 10,
		marginLeft: 5,
		marginRight: 5,
	},
	activeDot: {
		width: 8,
		height: 8,
		backgroundColor: "#fff",
		borderRadius: 10,
		marginLeft: 5,
		marginRight: 5,
	},
});

export default MainContent;
