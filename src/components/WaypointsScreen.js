import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class WaypointsScreen extends React.Component {
    static navigationOptions = {
        title: 'Waypoints',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    renderWaypointTabs(){

    }
    render() {
        return (
            <ScrollView>
                {this.renderWaypointTabs()}
            </ScrollView>
        );
    }
}

export default WaypointsScreen;