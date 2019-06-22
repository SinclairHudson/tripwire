/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// In App.js in a new project

import React from 'react';
import { View, Text, Button, ScrollView, AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import SettingsScreen from './src/components/SettingsScreen';
import HomeScreen from './src/components/HomeScreen';
import WaypointsScreen from './src/components/WaypointsScreen';
import EditScreen from './src/components/EditScreen';
import DataScreen from './src/components/DataScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: WaypointsScreen,
    Settings: SettingsScreen,
    Edit: EditScreen,
    Waypoints: WaypointsScreen,
    Data: DataScreen
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
