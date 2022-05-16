import {
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	TextInput,
	TouchableOpacity,
	Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";


const Homepage = () => {
	const navigation = useNavigation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [logindata, setLogindata] = useState({});

	const handlelogin = async () => {
		await fetch("https://todocompapi.herokuapp.com/login", {
			method: "POST", // or 'PUT'
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		})
			.then((response) => response.json())
			.then((data) => {
				// setLogindata(data);
				// console.log(data);
				if(data.status === false)
				{
					alert(data.message);
				}
				else{
					setLogindata(data.data);
					console.log(data.name);
					// navigation.replace('todo');
					navigation.navigate("todo",{
						name:data.name,
						email:data.email,
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
		// navigation.replace('todo')
	};

	return (
		<KeyboardAvoidingView style={styles.Homepage} behavior={Platform.OS === "ios" ? "padding" : null}>
				<Text style = {{fontSize:30, fontWeight:'600', marginBottom:40}}><Text style = {{color:'#FF6342'}}>GCT's</Text> Todo App</Text>
			<View
				style={{
					width: "80%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<TextInput
					placeholder="Email"
					style={styles.input1}
					value={email}
					onChangeText={(e) => setEmail(e)}
				/>
				<TextInput
					placeholder="Password"
					style={styles.input1}
					value={password}
					onChangeText={(e) => setPassword(e)}
				/>
				<TouchableOpacity
					onPress={() => {
						navigation.replace("Reg");
					}}
				>
					<Text style={{ marginTop: 15 }}>
						Not A User? <Text style={{ color: "#FF6342" }}>Register</Text>{" "}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.loginbtn}
					onPress={() => {
						handlelogin();
					}}
				>
					<View>
						<Text style={{ color: "white" }}>Login</Text>
					</View>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Homepage;

const styles = StyleSheet.create({
	Homepage: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
		// width:"100%",
		// height: "100vh",
	},

	input1: {
		width: "100%",
		borderWidth: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
		margin: 5,
		borderRadius: 20,
		height: 50

		// borderWidth:"2px"rr
	},

	loginbtn: {
		borderRadius: 50,
		height: 40,
		width: "50%",
		backgroundColor: "#FF6342",
		marginTop: 20,
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
});
