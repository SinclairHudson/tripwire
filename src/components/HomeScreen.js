import React from "react";
import {View, Text, Button, ScrollView, AsyncStorage, Switch, PermissionsAndroid, Vibration, Alert} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import SettingsScreen from "./SettingsScreen";
import { getDistance } from 'geolib';
import SoundPlayer from 'react-native-sound-player'

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.requestLocationPermission();
        this.state = {
            longitude: 0,
            latitude: 0,
        };
    }
    async  requestLocationPermission(){
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Example App',
                    'message': 'Example App access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
            } else {
                console.log("location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#000000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState(position.coords);
                this.checkMatches();
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: false, timeout: 200, maximumAge: 10, distanceFilter: 1},
        );
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }
    checkMatches(){
        Vibration.vibrate([1, 100], false);
        this.forceUpdate();
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let val = JSON.parse(store[i][1]);
                    const distance = getDistance(this.state, {
                        longitude: val.long,
                        latitude: val.lat,
                    });
                    if(distance < val.radius && val.enabled){
                        switch(val.onTrip) {
                            case "Vibrate":
                                Vibration.vibrate([1, 5000, 1000, 5000, 1000, 5000], false);
                                break;
                            case "Push":
                                // code block
                                break;
                            case "AliA":
                                try {
                                    SoundPlayer.playSoundFile('a', 'mp3')
                                } catch (e) {
                                    console.log(`cannot play the sound file`, e)
                                }
                                break;
                            case "Alert":
                                Alert.alert("ALERT!", "you're close to "+ key + ".");
                                break;
                            default:
                                Alert.alert("ALERT!", "you're close to "+ key + ".");
                        }
                    }
                });
            });
        });
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
                <Button
                    title="Edit cheat screen"
                    onPress={() => this.props.navigation.navigate('Edit')}
                />
                <Text>
                    Toggle all alerts:
                </Text>
                <Switch/>
                <Text>
                    {JSON.stringify(this.state)}
                </Text>
            </View>
        );
    }
}

export default HomeScreen;