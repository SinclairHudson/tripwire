import React from "react";
import {View, Text, Button, ScrollView, AsyncStorage} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import SettingsScreen from "./SettingsScreen";

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    componentDidMount() {
        AsyncStorage.setItem("Work",
            JSON.stringify({
                radius: 20,
                enabled: true,
                long: 45.2234,
                lat: 43.234345,
            })
        );
        AsyncStorage.setItem("Home",
            JSON.stringify({
                radius: 20,
                enabled: true,
                long: 45.2234,
                lat: 43.234345,
            })
        );
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="Go to Settings"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
                <Button
                    title="Go to data"
                    onPress={() => this.props.navigation.navigate('Data')}
                />
            </View>
        );
    }
}

export default HomeScreen;