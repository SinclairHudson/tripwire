import React from 'react';
import { View, ScrollView, AsyncStorage, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './sytles';

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
      list.push(<WaypointTab id={this.state[index]} key={this.state[index]} navigation={this.props.navigation} />);
    }
    return list;
  }

  render() {
    return (
      <View style={styles.backdrop}>
        <ScrollView style={styles.scroller}>
          {this.renderWaypointTabs()}
            <Icon
              name="ios-add-circle-outline"
              size={60}
              style={styles.add}
              onPress={() => this.props.navigation.navigate('Edit', {id: "New Waypoint"})}
            />
        </ScrollView>
      </View>
    );
  }
}

export default WaypointsScreen;
