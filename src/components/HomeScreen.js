import React from "react";
import {View, Text, Button, ScrollView, AsyncStorage, Switch, PermissionsAndroid, Vibration, Alert, TouchableOpacity, Image} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import SettingsScreen from "./SettingsScreen";
import {getDistance} from 'geolib';
import SoundPlayer from 'react-native-sound-player'
import styles from './styles';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.requestLocationPermission();
        this.state = {
            longitude: 0,
            latitude: 0,
            global: true
        };
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Example App',
                    'message': 'Example App access to your location '
                }
            );
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
        header: null
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

    checkMatches() {
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
                    if (this.state.global) {
                        if (distance < val.radius && val.enabled) {
                            switch (val.onTrip) {
                                case "Vibrate":
                                    Vibration.vibrate([1, 5000, 1000, 5000, 1000, 5000], false);
                                    break;
                                case "Push":
                                    // code block
                                    break;
                                case "Alarm":
                                    try {
                                        SoundPlayer.playSoundFile('b', 'mp3')
                                    } catch (e) {
                                        console.log(`cannot play the sound file`, e)
                                    }
                                    break;
                                case "Alert":
                                    Alert.alert("ALERT!", "you're close to " + val.name + ".");
                                    break;
                                default:
                                    Alert.alert("ALERT!", "you're close to " + val.name + ".");
                            }
                        }
                    }
                });
            });
        });
    }

    toggleSwitch = value => {
        this.setState({global: value});
    };

    render() {
        return (
            <View style={styles.backdrop}>
                <View style={{flex:1, alignItems: "stretch", justifyContent: "space-between"}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop:"25%"}}>
                        <Image
                            source={require('./TripwireThumbnail.png')}
                        />
                    </View>
                    <Button color="#58CC2A" style={{margin: 30, borderRadius: 20}}
                        title="Waypoints"
                        onPress={() => this.props.navigation.navigate('Waypoints')}
                    >
                        <Text style={{alignText:'center', fontSize:25}}>Waypoints</Text>
                    </Button>
                    <View style={styles.global}>
                        <Text style={{flex: 4,
                            fontSize: 15,
                            color: 'rgb(255,255,255)'}}>
                            Toggle all alerts:
                        </Text>
                        <Switch
                            name="ios-add-circle-outline"
                            size={60}
                            onValueChange={this.toggleSwitch}
                            value={this.state.global}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default HomeScreen;