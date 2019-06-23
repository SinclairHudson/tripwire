import React from "react";
import {View, Text, Button, ScrollView, AsyncStorage, TextInput, Picker, Switch} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import SettingsScreen from "./SettingsScreen";
import styles from './styles';
import UUIDGenerator from 'react-native-uuid-generator';

class EditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Default",
            radius: '5',
            long: '0.01',
            lat: '0.01',
            enabled: true,
            onTrip: "Vibrate"
        }
    }

    setCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    long: String(position.coords.longitude),
                    lat: String(position.coords.latitude)
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
            AsyncStorage.getItem(this.props.navigation.state.params.id).then(
                (item) => {
                    let temp = JSON.parse(item);
                    let s = {
                        name: temp.name,
                        radius: String(temp.radius),
                        long: String(temp.long),
                        lat: String(temp.lat),
                        enabled: temp.enabled,
                        onTrip: temp.onTrip,

                    };
                    this.setState(s);
                }
            );
    }

    async save() {
        AsyncStorage.setItem(this.props.navigation.state.params.id,
            JSON.stringify({
                name: this.state.name,
                radius: Number(this.state.radius),
                enabled: this.state.enabled,
                long: Number(this.state.long),
                lat: Number(this.state.lat),
                onTrip: this.state.onTrip,
            })
        );
        this.props.navigation.pop(2);
    }

    async delete() {
        try {
            await AsyncStorage.removeItem(this.props.navigation.state.params.id);
        } catch (exception) {
        }
        this.props.navigation.replace('Waypoints');
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: "stretch", justifyContent: "space-between"}}>
                <ScrollView>
                    <View style={styles.editor}>
                        <Text style={{textAlign: "center"}}> Waypoint Name </Text>
                        <TextInput
                            onChangeText={name => this.setState({name: name})}
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                            value={this.state.name}/>
                    </View>

                    <View style={styles.editor}>
                        <Text style={{textAlign: "center"}}> Waypoint Radius</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                            onChangeText={rad => this.setState({radius: rad})}
                            value={this.state.radius}/>
                    </View>

                    <View style={styles.editor}>
                        <Text style={{textAlign: "center"}}> Waypoint Longitude </Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                            onChangeText={long => this.setState({long: long})}
                            value={this.state.long}/>
                    </View>

                    <View style={styles.editor}>
                        <Text style={{textAlign: "center"}}> Waypoint Latitude </Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlign: "center"}}
                            onChangeText={lat => this.setState({lat: lat})}
                            value={this.state.lat}/>
                    </View>
                    <Button
                        title="Save Current Location"
                        onPress={() => this.setCurrentLocation()}
                    />

                    <View style={styles.editor}>
                        <Picker
                            selectedValue={this.state.onTrip}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({onTrip: itemValue})}>
                            <Picker.Item label="Vibrate" value="Vibrate"/>
                            <Picker.Item label="Alert" value="Alert"/>
                            <Picker.Item label="Alarm" value="Alarm"/>
                        </Picker>
                    </View>

                    <Switch
                        name="ios-add-circle-outline"
                        size={30}
                        style={styles.switch}
                        onValueChange={()=>{
                            this.setState({enabled: !this.state.enabled});
                        }}
                        value={this.state.enabled}
                    />

                    <View>
                        <Button
                            title="Save"
                            onPress={() => this.save()}
                        />

                        <Button
                            color="#f91800"
                            title="Delete"
                            onPress={() => this.delete()}
                        />

                        <Button
                            color="#333333"
                            title="Cancel"
                            onPress={() => this.props.navigation.replace('Waypoints')}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default EditScreen;