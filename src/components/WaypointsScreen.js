import React from 'react';
import { View, Text, Button, ScrollView, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Card, ListItem, Icon } from 'react-native-elements';
import WaypointTab from './WaypointTab';

class WaypointsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    title: 'Waypoints',
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };
  componentDidMount() {
    this.forceUpdate();
    AsyncStorage.getAllKeys((err, keys) => {
      this.setState(keys);
    });
  }

  renderWaypointTabs() {
    const list = [];
    for (var index in this.state) {
      list.push(<WaypointTab id={this.state[index]} key={this.state[index]} />);
    }
    return list;
  }

  render() {
    return (
      <View>
        <ScrollView>{this.renderWaypointTabs()}</ScrollView>
      </View>
    );
  }
}

export default WaypointsScreen;
