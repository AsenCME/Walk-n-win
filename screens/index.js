import { Navigation } from "react-native-navigation";
import createApp from "./createApp";

// Intro Screen
import Intro from "./Intro/index";

// Auth Screens
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/forgotPassword";

// Home Screen + subcomponents
import Home from "./Home/index";
import InfoPage from "./InfoPage/index";

// Market Screen + subcomponents
import Market from "./Market/index";
import CodeDetails from "./CodeDetails/index";
import BuyCode from "./BuyCode/index";

// Profile Screen + subcomponents
import Profile from "./Profile/index";
import CouponsPage from "./Profile/subpages/CouponsPage";
import StatsPage from "./Profile/subpages/StatsPage";
import RacesPage from "./Profile/subpages/RacesPage";
import SettingsPage from "./SettingsPage/index";

// Others
import DefaultLoading from "./DefaultLoading/index";

export default () => {
	Navigation.registerComponent("steps.home", createApp(Home));
	Navigation.registerComponent("steps.login", createApp(Login));
	Navigation.registerComponent("steps.register", createApp(Register));
	Navigation.registerComponent("steps.forgotPassword", createApp(ForgotPassword));
	Navigation.registerComponent("steps.market", createApp(Market));
	Navigation.registerComponent("steps.codeDetails", createApp(CodeDetails));
	Navigation.registerComponent("steps.buyCode", createApp(BuyCode));
	Navigation.registerComponent("steps.profile", createApp(Profile));
	Navigation.registerComponent("steps.intro", createApp(Intro));
	Navigation.registerComponent("steps.loading", () => DefaultLoading);
	Navigation.registerComponent("steps.couponsPage", createApp(CouponsPage));
	Navigation.registerComponent("steps.statsPage", createApp(StatsPage));
	Navigation.registerComponent("steps.racesPage", createApp(RacesPage));
	Navigation.registerComponent("steps.settingsPage", createApp(SettingsPage));
	Navigation.registerComponent("steps.infoPage", createApp(InfoPage));
};
