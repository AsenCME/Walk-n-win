import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import { onAppLaunch } from "../onEnter";

import { Colors } from "./../constants/colors";
import { Montserrat } from ".././constants/fonts";

const bottomTabStyle = {
	fontFamily: Montserrat.REGULAR,
	fontSize: 10,
	selectedFontSize: 12,
	selectedIconColor: Colors.FIRE_RED,
	selectedTextColor: Colors.FIRE_RED,
	iconColor: Colors.BLUE_MAIN,
	textColor: Colors.BLUE_MAIN,
};

const homeTabStyle = {
	fontSize: 10,
	selectedFontSize: 12,
	text: "Home",
	iconColor: Colors.BLUE_MAIN,
	textColor: Colors.BLUE_MAIN,
	selectedTextColor: Colors.BLUE_MAIN,
	selectedIconColor: Colors.BLUE_MAIN,
};

export function loadApp() {
	Promise.all([
		Icon.getImageSource("circle-notch"),
		Icon.getImageSource("user-alt"),
		Icon.getImageSource("shopping-cart"),
	]).then(icons => {
		onAppLaunch()
			.then(() => {
				Navigation.setRoot({
					root: {
						bottomTabs: {
							children: [
								{
									stack: {
										children: [
											{
												component: {
													name: "steps.profile",
													options: {
														bottomTab: {
															...bottomTabStyle,
															text: "Profile",
															icon: icons[1],
														},
													},
												},
											},
										],
										options: {
											topBar: {
												drawBehind: true,
												visible: false,
											},
										},
									},
								},
								{
									stack: {
										children: [
											{
												component: {
													name: "steps.home",
													options: {
														bottomTab: {
															...bottomTabStyle,
															...homeTabStyle,
															icon: icons[0],
														},
													},
												},
											},
										],
										options: {
											topBar: {
												drawBehind: true,
												visible: false,
											},
										},
									},
								},
								{
									stack: {
										children: [
											{
												component: {
													name: "steps.market",
													options: {
														bottomTab: {
															...bottomTabStyle,
															icon: icons[2],
															text: "Market",
														},
													},
												},
											},
										],
										options: {
											topBar: {
												drawBehind: true,
												visible: false,
											},
										},
									},
								},
							],
							options: {
								bottomTabs: {
									currentTabIndex: 1,
								},
							},
						},
					},
				});
			})
			.catch(err => {
				// Do sth with error
			});
	});
}
