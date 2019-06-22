import React from "react";
import { View, Text, Button, ScrollView, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SettingsScreen from "./SettingsScreen";

class EditScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            radius: -1,
            long: 90.0000,
            lat: 30.00000,
            enabled: false,
            onTrip: "Vibrate"
        }
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
    componentDidMount(){
        const ID = navigation.getParam('id', 'NO-ID');
        AsyncStorage.getItem(ID, (object) =>{ this.setState(JSON.parse(object))})
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Edit Waypoint</Text>
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