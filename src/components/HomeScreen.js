import React from "react";
import {View, Text, Button, ScrollView, AsyncStorage, Switch, PermissionsAndroid, Vibration, Alert} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import SettingsScreen from "./SettingsScreen";
import { getDistance } from 'geolib';

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
                alert("You can use the location");
            } else {
                console.log("location permission denied")
                alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
    }
    getDistance(waypoint){
        let dy = Math.abs(waypoint.long - this.state.longitude);
        let dx = Math.abs(waypoint.lat - this.state.latitude);
        //converting from degrees to meters, roughly.
        let yMeters = dy * 111111 * Math.cos(this.state.latitude);
        let xMeters = dx * 111111;
        let dist = Math.sqrt(Math.pow(xMeters, 2) + Math.pow(yMeters,2));
        Alert.alert("Distances", dist.toString());
        return dist;
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