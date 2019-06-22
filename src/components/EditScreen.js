import React from "react";
import {View, Text, Button, ScrollView, AsyncStorage, TextInput} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import SettingsScreen from "./SettingsScreen";

class EditScreen extends React.Component {
    constructor(props) {
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

    componentDidMount() {
        AsyncStorage.getItem(this.props.navigation.state.params.id).then(
            (item) => {
                this.setState(JSON.parse(item));
            }
        );
    }

    save() {
        AsyncStorage.setItem(this.name,
            JSON.stringify({
                name: this.name,
                radius: parseInt(this.radius),
                enabled: true,
                long: parseInt(this.long),
                lat: parseInt(this.lat),
                onTrip: "Vibrate",
            })
        );

        this.props.navigation.navigate('Waypoints')
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: "stretch", justifyContent: "space-between"}}>

                <View style={{flex: 1, alignItems: "stretch", justifyContent: "center"}}>
                    <Text style={{textAlign: "center"}}> Waypoint Name </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                        onChangeText={(name) => this.setState({name})}
                        value={this.props.navigation.state.params.id}/>
                </View>

                <View style={{flex: 1, alignItems: "stretch", justifyContent: "center"}}>
                    <Text style={{textAlign: "center"}}> Waypoint Radius </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                        onChangeText={(radius) => this.setState({radius})}
                        value={String(this.state.radius)}/>
                </View>

                <View style={{flex: 1, alignItems: "stretch", justifyContent: "center"}}>
                    <Text style={{textAlign: "center"}}> Waypoint Longitude </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                        onChangeText={(long) => this.setState({long})}
                        value={String(this.state.long)}/>
                </View>

                <View style={{flex: 1, alignItems: "stretch", justifyContent: "center"}}>
                    <Text style={{textAlign: "center"}}> Waypoint Latitude </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                        onChangeText={(lat) => this.setState({lat})}
                        value={String(this.state.lat)}/>
                </View>
                <Text>{JSON.stringify(this.state)}</Text>
                <View>
                    <Button
                        title="Save"
                        onPress={() => this.save()}
                    />
                    <Button color="#f91800"
                            title="Cancel"
                            onPress={() => this.props.navigation.navigate('Waypoints')}
                    />
                </View>
            </View>
        );
    }
}

export default EditScreen;