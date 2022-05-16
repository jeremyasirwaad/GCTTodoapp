import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./screens/Homepage";
import Resgisterscreen from "./screens/Resgisterscreen";
import Todo from "./screens/Todo";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					options={{ headerShown: false }}
					component={Homepage}
				/>
				<Stack.Screen
					name="Reg"
					options={{ headerShown: false }}
					component={Resgisterscreen}
				/>
        <Stack.Screen
					name="todo"
					options={{ headerShown: false, title:"TOdopage" }}
					component={Todo}
					
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
