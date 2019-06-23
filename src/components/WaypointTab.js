import React from "react";
import {View, Text, Button, ScrollView, AsyncStorage, Switch, PermissionsAndroid, Vibration, Alert} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import SettingsScreen from "./SettingsScreen";
import { getDistance } from 'geolib';
import SoundPlayer from 'react-native-sound-player';
import EditScreen from './EditScreen';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import UUIDGenerator from 'react-native-uuid-generator';

class WaypointTab extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    async componentDidMount() {
        try {
            AsyncStorage.getItem(this.props.id).then(
                (item) => {
                    this.setState(JSON.parse(item));
                }
            );
        } catch (error) {
            // Handle errors here
        }
    }

    render() {
        return (
            <View style={[styles.tab, this.state.enabled? {backgroundColor: 'green'}: {backgroundColor: 'black'}]}>
                <Text style={styles.buttonText}
                      onPress={() => this.props.navigation.push('Edit', {
                          id: this.props.id
                      })}>
                    {this.state.name}</Text>
            </View>
        );

        // return <ListItem title={id} rightIcon={{ name: 'edit' }} />;
    }
}

export default WaypointTab;
