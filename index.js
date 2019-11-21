import { BackHandler } from "react-native";
import { Navigation } from "react-native-navigation";
import { AsyncStorage } from "react-native";
import registerScreens from "./screens/index";
import { auth } from "./firebase";
import { loadApp, showRegister, loadIntroScreen, loadSplash } from "./navigation/index";

console.disableYellowBox = true;

Navigation.events().registerAppLaunchedListener(() => {
	loadSplash();

	registerScreens();

	AsyncStorage.getItem("skipIntro")
		.then(res => {
			if (res !== null) {
				if (auth.currentUser) loadApp();
				else showRegister();
			} else {
				loadIntroScreen();
			}
		})
		.catch(err => {
			console.log(err);
			// BackHandler.exitApp();
		});
});
