import React from "react";
import { StyleSheet, Image, AsyncStorage, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Navigation } from "react-native-navigation";

import { connect } from "react-redux";
import { userLogout } from "../../src/actions/userActions";
import { purgeStoredState } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { showRegister, showLoading, hideLoading } from "../../navigation/index";

import LinearGradient from "react-native-linear-gradient";
import ProfileHeader from "./ProfileHeader";
import MainContent from "./MainContent";

import { Colors } from "./../../constants/colors";
import { Montserrat } from "./../../constants/fonts";

class Profile extends React.Component {
	persistConfig = {
		key: "root",
		storage,
	};

	get_state = () => {
		console.log(this.props);
	};

	getStore = async () => {
		const num = await AsyncStorage.getItem("test");
		console.log(num);
	};

	logout = () => {
		this.props.logout().finally(() => {
			showRegister();
		});
	};

	showOverlay = () => {
		showLoading();
		setTimeout(() => this.hideOverlay(), 2000);
	};

	hideOverlay = () => {
		hideLoading(this.props.componentId);
	};

	// Opens Settings Page with topbar
	openSettings = () => {
		Navigation.push(this.props.componentId, {
			component: {
				name: "steps.settingsPage",
				options: {
					topBar: {
						visible: true,
						drawBehind: false,
						largeTitle: {
							visible: true,
						},
						title: {
							text: "Settings",
							fontFamily: Montserrat.BOLD,
						},
					},
					bottomTabs: {
						visible: false,
						drawBehind: true,
					},
				},
			},
		});
	};

	// Opens Coupons Page (connected to slide within Main Component)
	openCouponsPage = () => {
		Navigation.push(this.props.componentId, {
			component: {
				name: "steps.couponsPage",
				options: {
					bottomTabs: {
						visible: false,
						drawBehind: true,
					},
				},
			},
		});
	};

	// Opens Stats Page (connected to slide within Main Component)
	openStatsPage = () => {
		Navigation.push(this.props.componentId, {
			component: {
				name: "steps.statsPage",
				options: {
					bottomTabs: {
						visible: false,
						drawBehind: true,
					},
				},
			},
		});
	};

	// Opens Races Page (connected to slide within Main Component)
	openRacesPage = () => {
		Navigation.push(this.props.componentId, {
			component: {
				name: "steps.racesPage",
				options: {
					bottomTabs: {
						visible: false,
						drawBehind: true,
					},
				},
			},
		});
	};

	render() {
		return (
			<LinearGradient
				colors={[Colors.GRADIENT_START, Colors.GRADIENT_END]}
				style={styles.profileContainer}>
				<Image
					source={require("./../../assets/background_letters.png")}
					style={styles.backgroundImage}
				/>
				<TouchableOpacity style={styles.settings} onPress={this.openSettings}>
					<Icon name="cog" size={30} style={styles.settingsIcon} />
				</TouchableOpacity>

				{/* Rest of the stuff */}
				<ProfileHeader />
				<MainContent
					handleOpenCoupons={this.openCouponsPage}
					handleOpenStats={this.openStatsPage}
					handleOpenRaces={this.openRacesPage}
				/>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	profileContainer: {
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
		flex: 1,
	},
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

	// Settings Icon
	settings: {
		width: 40,
		height: 40,
		borderRadius: 20,
		position: "absolute",
		top: 15,
		right: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	settingsIcon: {
		color: "#fff",
	},
});

const mapStateToProps = state => ({
	state: state,
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(userLogout()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Profile);
