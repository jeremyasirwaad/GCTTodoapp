import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	Platform,
	ScrollView,
	Image
} from "react-native";

// import StyleSheetValidation from "react-native/Libraries/StyleSheet/StyleSheetValidation";
import { Task } from "./components/task";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Todo() {
	const route = useRoute();
	// console.log(route.params);
	const [nameofuse, setNameofuse] = useState("");
	const [todao, setTodao] = useState([]);
	const navigation = useNavigation();
	const [todosingle, setTodosingle] = useState("");

	const gettodolist = async () => {
		await fetch("https://todocompapi.herokuapp.com/gettodos", {
			method: "POST", // or 'PUT'
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: route.params.email
			})
		})
			.then((response) => response.json())
			.then((data) => {
				// setLogindata(data);
				// console.log(data);
				if (data.status === false) {
					alert(data.message);
				} else {
					// console.log(data.array);
					setTodao(data.array);
					// console.log(data);
					// setName(data.name);
					// console.log(name);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		gettodolist();
	}, []);

	const addtodo = async () => {
		if (todosingle === "") {
			return 0;
		}
		setTodao((prevstate) => [
			...prevstate,
			{
				textvalue: todosingle,
				done: false
			}
		]);

		await fetch("https://todocompapi.herokuapp.com/addarray", {
			method: "POST", // or 'PUT'
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: route.params.email,
				array: todao
			})
		})
			.then((response) => response.json())
			.then((data) => {
				// setLogindata(data);
				// console.log(data);
				// console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});

		setTodosingle("");
	};

	const deltodo = async (index1) => {
		const updatedarryy = todao.filter((e, index) => {
			return index1 !== index;
		});

		setTodao(updatedarryy);

		await fetch("https://todocompapi.herokuapp.com/delelement", {
			method: "POST", // or 'PUT'
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: route.params.email,
				array: updatedarryy
			})
		})
			.then((response) => response.json())
			.then((data) => {
				// setLogindata(data);
				// console.log(data);
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<SafeAreaView>
			<View style={styles.todocontainer}>
				<View style={styles.headingtext}>
					<Text style={styles.textcontent}>
						<Text style={{ color: "#FF6342" }}>{route.params.name}'s</Text>{" "}
						Todos
					</Text>
					<TouchableOpacity
						style={styles.iconcont}
						onPress={() => {
							// console.log(Platform.OS);
							navigation.replace("Home");
						}}
					>
						<MaterialCommunityIcons name="logout" size={24} color="black" />
					</TouchableOpacity>
				</View>
				{todao.length === 0 ? (
					<View style = {styles.notodocont}><Text>Add Todos using the textbox below and</Text><Text>Click on the added todo to delete</Text></View>
				) : (
					<ScrollView>
						{todao.map((e, index) => {
							return (
								<Task
									text={e.textvalue}
									index={index}
									del={deltodo}
									key={index}
								></Task>
							);
						})}
					</ScrollView>
				)}

				{/* <Text>{todao.length}</Text> */}
			</View>
			<KeyboardAvoidingView
				style={styles.addbar}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<TextInput
					placeholder="Add todo"
					value={todosingle}
					onChangeText={(e) => setTodosingle(e)}
					style={styles.addtodos}
				/>
				<TouchableOpacity
					onPress={() => {
						addtodo();
					}}
				>
					<Octicons
						name="diff-added"
						size={32}
						color="#FF6342"
						style={styles.addbtn}
					/>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	todocontainer: {
		height: "100%",
		width: "100%",
		padding: 20,
		paddingTop: Platform.OS === "ios" ? 0 : 50
		// marginTop:
		// Platform.OS === "ios" ? 0 : 20,
	},
	headingtext: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	textcontent: {
		fontSize: 22,
		fontWeight: "700"
	},
	iconcont: {
		// backgroundColor: "#FF6342",
		height: 40,
		width: 40,
		// borderRadius: 50,
		// display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	addbar: {
		display: "flex",
		flexDirection: "row",
		// width: "100%",
		justifyContent: "space-between",
		position: "absolute",
		bottom: 0,
		padding: 20,
		backgroundColor: "white",
		alignItems: "center"

		// height:100,
		// backgroundColor: "black
	},
	addtodos: {
		borderWidth: 2,
		flex: 1,
		marginRight: 20,
		height: 40,
		padding: 10,
		borderRadius: 10,
		marginBottom: 40,
		marginTop: 10
	},
	bottombarcont: {
		position: "absolute",
		bottom: 0,
		backgroundColor: "white",
		padding: 20,
		width: "100%"
	},

	addbtn: {
		marginBottom: 40,
		marginTop: 10
	},
	notodocont: {
		height:'70%',
		width:'100%',
		display:'flex',
		justifyContent:'center',
		alignItems:'center'
	}
});
