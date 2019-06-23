import React from 'react';
import { View, ScrollView, AsyncStorage, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <View>
        <ScrollView>
          {this.renderWaypointTabs()}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon
              name="ios-add-circle-outline"
              size={30}
              style={{ marginTop: '10%' }}
              onPress={() => this.props.navigation.navigate('Edit', {id: "New Waypoint"})}
            />
          </View>
        </ScrollView>
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    );
  }
}

export default WaypointsScreen;
