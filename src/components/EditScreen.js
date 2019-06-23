import React from "react";
import {View, Text, Button, ScrollView, AsyncStorage, TextInput, Picker} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import SettingsScreen from "./SettingsScreen";

class EditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.navigation.state.params.id,
            radius: 0,
            long: 0,
            lat: 0,
            enabled: true,
            onTrip: "Vibrate"
        }
    }

    setCurrentLocation(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    long: position.coords.longitude,
                    lat: position.coords.latitude
                });
            }
        );
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
        if (this.props.navigation.state.params.id === 'Untitled') {
            return;
        } else {
            AsyncStorage.getItem(this.props.navigation.state.params.id).then(
                (item) => {
                    this.setState(JSON.parse(item));
                }
            );
        }
    }

    async save() {
        try {
            await AsyncStorage.removeItem(this.props.navigation.state.params.id);
        } catch(exception){
        }

        AsyncStorage.setItem(this.state.name,
            JSON.stringify({
                name: this.state.name,
                radius: parseInt(this.state.radius),
                enabled: true,
                long: parseInt(this.state.long),
                lat: parseInt(this.state.lat),
                onTrip: this.state.onTrip,
            })
        );

        this.props.navigation.goBack();
    }

    async delete() {
        try {
            await AsyncStorage.removeItem(this.props.navigation.state.params.id);
        }
        catch(exception) {
        }
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: "stretch", justifyContent: "space-between"}}>

                <View style={{flex: 1, alignItems: "stretch", justifyContent: "center"}}>
                    <Text style={{textAlign: "center"}}> Waypoint Name </Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}/>
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

                <View style={{flex: 1, alignItems: "stretch", justifyContent: "center"}}>
                        <Picker
                            selectedValue = {this.state.onTrip}
                            onValueChange = {(itemValue, itemIndex) =>
                                this.setState({onTrip: itemValue})}>
                            <Picker.Item label="Vibrate" value="Vibrate"/>
                            <Picker.Item label="Alert" value="Alert"/>
                            <Picker.Item label="Alarm" value="Alarm"/>
                        </Picker>
                </View>

                <Text>{JSON.stringify(this.state)}</Text>

                <View>
                    <Button
                        title="Save"
                        onPress={() => this.save()}
                    />

                    <Button
                        title="Save Current Location"
                        onPress={() => this.setCurrentLocation()}
                    />

                    <Button color="#f91800"
                            title="Cancel"
                            onPress={() => this.props.navigation.goBack()}
                    />

                    <Button
                        color="#f91800"
                        title="Delete"
                        onPress={() => this.delete()}
                    />

                    <Button
                        color="#333333"
                        title="Cancel"
                        onPress={() => this.props.navigation.goBack()}
                    />
                </View>
            </View>
        );
    }
}

export default EditScreen;