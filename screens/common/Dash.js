import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const Dash = _ => {
	const length = Dimensions.get("window").width;
	const dashLength = 12;
	const dashGap = 10;
	const dashThickness = 1;
	const dashColor = "#b2b2b2";
	const n = Math.ceil(length / (dashLength + dashGap));

	let dash = [];
	for (let i = 0; i < n; i++) {
		dash.push(
			<View
				key={i}
				style={{
					width: dashLength,
					height: dashThickness,
					marginRight: dashGap,
					marginBottom: 0,
					backgroundColor: dashColor,
				}}
			/>,
		);
	}
	return <View style={{ flexDirection: "row", marginVertical: 20, marginLeft: -20 }}>{dash}</View>;
};

export default Dash;
