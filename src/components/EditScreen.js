import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SettingsScreen from "./SettingsScreen";

class EditScreen extends React.Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        title: 'Edit Waypoint',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
                <Button
                    title="Save"
                    onPress={() => this.props.navigation.navigate('Waypoints')}
                />
                <Button
                    title="Cancel"
                    onPress={() => this.props.navigation.navigate('Waypoints')}
                />
            </View>
        );
    }
}

export default EditScreen;