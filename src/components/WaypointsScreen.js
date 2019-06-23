import React from 'react';
import { View, ScrollView, AsyncStorage, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import UUIDGenerator from 'react-native-uuid-generator';

import WaypointTab from './WaypointTab';

class WaypointsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Waypoints',
    headerStyle: {
      backgroundColor: '#58CC2A'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };
  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      this.setState(keys);
    });
  }

    renderWaypointTabs() {
    const list = [];
    for (var index in this.state) {
      list.push(<WaypointTab id={this.state[index]} key={index} navigation={this.props.navigation} />);
    }
    return list;
  }

  render() {
    return (
      <View style={styles.backdrop}>
        <ScrollView>
          {this.renderWaypointTabs()}
            <Icon
              name="ios-add-circle-outline"
              size={60}
              style={styles.add}
              onPress={() => {
                UUIDGenerator.getRandomUUID((uuid) => {
                  AsyncStorage.setItem(uuid,JSON.stringify(
                      {
                        name: "Untitled",
                        radius: 6,
                        long: 4.2,
                        lat: 5.4,
                        enabled: true,
                        onTrip: "Vibrate"
                      })).then(this.props.navigation.navigate('Edit', {id: uuid}))
                });
                }}
            />
        </ScrollView>
      </View>
    );
  }
}

export default WaypointsScreen;
