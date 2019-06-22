/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// In App.js in a new project

import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import SettingsScreen from "./src/components/SettingsScreen";
import HomeScreen from "./src/components/HomeScreen";
import WaypointsScreen from "./src/components/WaypointsScreen";


const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Details: WaypointsScreen,
        Settings: SettingsScreen
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}