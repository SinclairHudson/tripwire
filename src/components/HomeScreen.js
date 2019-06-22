import React from "react";
import {View, Text, Button, ScrollView, AsyncStorage, Switch, PermissionsAndroid, Vibration, Alert} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import SettingsScreen from "./SettingsScreen";

function getDistance(waypoint, state){
    let dy = Math.abs(waypoint.long - state.longitude);
    let dx = Math.abs(waypoint.lat - state.latitude);
    //converting from degrees to meters, roughly.
    let yMeters = dy * 111111 * Math.cos(state.latitude);
    let xMeters = dx * 111111;
    return Math.sqrt(Math.pow(xMeters, 2) + Math.pow(yMeters,2));
}
class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.requestLocationPermission();
    }
    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'This App needs access to your location ' +
                        'so we can know where you are.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use locations ")
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    getDistance(waypoint, state){
        let dy = Math.abs(waypoint.long - state.longitude);
        let dx = Math.abs(waypoint.lat - state.latitude);
        //converting from degrees to meters, roughly.
        let yMeters = dy * 111111 * Math.cos(state.latitude);
        let xMeters = dx * 111111;
        //Alert.alert("Distances", JSON.stringify(waypoint)+" "+JSON.stringify(state));
        return Math.sqrt(Math.pow(xMeters, 2) + Math.pow(yMeters,2));
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
        AsyncStorage.setItem("Work",
            JSON.stringify({
                radius: 20,
                enabled: true,
                long: 45.2234,
                lat: 43.234345,
            })
        );
        AsyncStorage.setItem("EngHack Work Space",
            JSON.stringify({
                radius: 200,
                enabled: true,
                long: -80.53984273,
                lat: 43.4725835,
            })
        );
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState(position);
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
                    let val = store[i][1];
                    const distance = this.getDistance(JSON.parse(val), this.state);
                    this.setState({dist: distance, way: key, val: val});
                    if(distance < store[i][1].radius){
                        Vibration.vibrate([1, 10000], false);
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
                <Text>
                    Toggle all alerts:
                </Text>
                <Switch/>
                <Text>
                    {JSON.stringify(this.state)}
                </Text>
                <Text>
                </Text>
                
            </View>
        );
    }
}

export default HomeScreen;