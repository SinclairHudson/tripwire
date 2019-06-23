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
            backgroundColor: '#58CC2A',
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
            <View style={styles.backdrop}>
                <ScrollView>
                    <View style={styles.global}>
                        <Text style={{
                            flex: 4,
                            fontSize: 15,
                            color: 'rgb(255,255,255)'
                        }}>
                            Toggle this alert:
                        </Text>
                        <Switch
                            name="ios-add-circle-outline"
                            size={50}
                            style={styles.switch}
                            onValueChange={() => {
                                this.setState({enabled: !this.state.enabled});
                            }}
                            value={this.state.enabled}
                        />
                    </View>
                    <View style={styles.editor}>
                        <Text style={styles.header}> Waypoint Name </Text>
                        <TextInput
                            onChangeText={name => this.setState({name: name})}
                            style={styles.input}
                            value={this.state.name}/>
                    </View>

                    <View style={styles.editor}>
                        <Text style={styles.header}> Waypoint Radius</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={rad => this.setState({radius: rad})}
                            value={this.state.radius}/>
                    </View>

                    <View style={styles.editor}>
                        <Text style={styles.header}> Waypoint Longitude </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={long => this.setState({long: long})}
                            value={this.state.long}/>
                    </View>

                    <View style={styles.editor}>
                        <Text style={styles.header}> Waypoint Latitude </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={lat => this.setState({lat: lat})}
                            value={this.state.lat}/>
                    </View>
                    <Button
                        title="Use Current Location"
                        color='#228822'
                        onPress={() => this.setCurrentLocation()}
                    />

                    <View style={styles.editor}>
                        <Picker
                            style={{color: 'white', backgroundColor: '#333333', textAlign: 'center'}}
                            selectedValue={this.state.onTrip}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({onTrip: itemValue})}>
                            <Picker.Item label="Vibrate" value="Vibrate"/>
                            <Picker.Item label="Alert" value="Alert"/>
                            <Picker.Item label="Alarm" value="Alarm"/>
                        </Picker>
                    </View>

                    <View>
                        <View style={styles.save}>
                            <Button
                                color='#58CC2A'
                                title="Save"
                                onPress={() => this.save()}
                            />
                        </View>

                        <View style={styles.save}>
                            <Button
                                color="#228822"
                                title="Delete"
                                onPress={() => this.delete()}
                            />
                        </View>
                        <View style={styles.save}>
                            <Button
                                color="#333333"
                                title="Cancel"
                                onPress={() => this.props.navigation.replace('Waypoints')}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default EditScreen;