import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "./../../constants/colors";
import { Montserrat } from "./../../constants/fonts";

class SettingsPage extends React.Component {
	render() {
		return (
			<ScrollView style={styles.page}>
				{/* First Category */}
				<Text style={styles.categoryName}>Account</Text>
				<TouchableHighlight
					style={styles.settingsItemWrapper}
					onPress={() => {}}
					underlayColor={"#ededed"}>
					<View style={styles.settingsItem}>
						<Icon name="user-alt" size={20} style={styles.itemIcon} />
						<Text style={styles.itemText}>Edit Profile</Text>
						<Icon name="chevron-right" size={20} style={styles.itemChevron} />
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					style={styles.settingsItemWrapper}
					onPress={() => {}}
					underlayColor={"#ededed"}>
					<View style={styles.settingsItem}>
						<Icon name="key" size={20} style={styles.itemIcon} />
						<Text style={styles.itemText}>Change Password</Text>
						<Icon name="chevron-right" size={20} style={styles.itemChevron} />
					</View>
				</TouchableHighlight>

				{/* Second Category */}
				<Text style={styles.categoryName}>Additional Options</Text>
				<TouchableHighlight
					style={styles.settingsItemWrapper}
					onPress={() => {}}
					underlayColor={"#ededed"}>
					<View style={styles.settingsItem}>
						<Icon name="paper-plane" size={20} style={styles.itemIcon} solid />
						<Text style={styles.itemText}>Notifications</Text>
						<Icon name="chevron-right" size={20} style={styles.itemChevron} />
					</View>
				</TouchableHighlight>

				{/* Logout Button */}
				<TouchableOpacity style={styles.logOutButton} onPress={() => {}}>
					<Text style={styles.logOutButton}>Log out</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	page: { paddingBottom: 40 },

	// Category Title
	categoryName: {
		marginTop: 40,
		marginBottom: 10,
		fontFamily: Montserrat.SEMIBOLD,
		color: Colors.BLUE_SECONDARY,
		fontSize: 16,
		paddingHorizontal: 20,
	},

	// Category Item Styles
	settingsItemWrapper: {
		width: "100%",
		paddingVertical: 15,
	},
	settingsItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	itemIcon: {
		color: Colors.BLUE_SECONDARY,
		marginHorizontal: 20,
	},
	itemText: {
		fontFamily: Montserrat.MEDIUM,
		color: "#000",
		fontSize: 16,
		flex: 3,
	},
	itemChevron: {
		color: Colors.BLUE_SECONDARY,
		marginHorizontal: 20,
	},

	// Log Out Button
	logOutButton: {
		textAlign: "center",
		fontSize: 20,
		fontFamily: Montserrat.SEMIBOLD,
		color: Colors.FIRE_RED,
		padding: 10,
	},
});

export default SettingsPage;
