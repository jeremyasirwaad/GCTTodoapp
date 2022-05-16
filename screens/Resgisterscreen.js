import {
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	TextInput,
	TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


import { useNavigation } from "@react-navigation/native";

const Resgisterscreen = () => {
	const navigation = useNavigation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repassword, setRepassword] = useState("");
	const [signdata, setSigndata] = useState({});
	const [name, setName] = useState("");
	const handleresgister = async () => {
		if (password !== repassword) {
			alert("Password Doesn't Match");
			return 0;
		}
		await fetch("https://todocompapi.herokuapp.com/signup", {
			method: "POST", // or 'PUT'
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name,
				email,
				password
			})
		})
			.then((response) => response.json())
			.then((data) => {
				// setLogindata(data);
				// console.log(data);
				if (data.status === false) {
					alert(data.message);
				} else {
					setSigndata(data);
					console.log(data);
					navigation.navigate("todo",{
						name:name,
						email:email,
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<KeyboardAvoidingView
			style={styles.Homepage}
			behavior={Platform.OS === "ios" ? "padding" : null}
			
		>
			<View
				style={{
					width: "80%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<Text style = {{fontSize:30, fontWeight:'600', marginBottom:30}}><Text style = {{color:'#FF6342'}}>Register</Text></Text>
				<TextInput
					placeholder="Name"
					style={styles.input1}
					value={name}
					onChangeText={(e) => setName(e)}
				/>
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
				<TextInput
					placeholder="Password"
					style={styles.input1}
					value={repassword}
					onChangeText={(e) => setRepassword(e)}
				/>
				<TouchableOpacity
					onPress={() => {
						navigation.replace("Home");
					}}
				>
					<Text style={{ marginTop: 15 }}>
						Already a user ? <Text style={{ color: "#FF6342" }}>Login</Text>{" "}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.loginbtn}
					onPress={() => {
						handleresgister();
					}}
				>
					<View>
						<Text style={{ color: "white" }}>SignUp</Text>
					</View>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Resgisterscreen;

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
	}
});
