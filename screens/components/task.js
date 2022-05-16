import * as React from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity
} from "react-native";

var width = Dimensions.get("window").width;
export function Task(props) {
	return (
		<TouchableOpacity onPress={ ()=> {
            props.del(props.index);
        }}>

			<View style={styles.card}>
				<View style={styles.leftitems}>
					<View style={styles.box}></View>
					<Text style={styles.cardtitle}>{props.text}</Text>
				</View>
				<View style={styles.circle}></View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#FFF",
		padding: 15,
		borderRadius: 10,
		marginVertical: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	leftitems: {
		flexDirection: "row",
		alignItems: "center"
	},
	box: {
		height: 20,
		width: 20,
		backgroundColor: "#2B8FE8",
		opacity: 0.4,
		borderRadius: 5
	},
	cardtitle: {
		marginLeft: 20
	},
	circle: {
		height: 12,
		width: 12,
		borderRadius: 50,
		backgroundColor: "#FF0000",
		opacity: 0.7
	}
});
