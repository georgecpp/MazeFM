import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Register from '../screens/Register';
import Dashboard from '../screens/Dashboard';


export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions} >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name='Dashboard' component={Dashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}