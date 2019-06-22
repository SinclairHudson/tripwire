import React from 'react';
import { View, Text, Button, Switch, ScrollView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Iconi from 'react-native-vector-icons/Ionicons';

import styles from './sytles';

class WaypointTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { switchValue: false };
  }

  toggleSwitch = value => {
    this.setState({ switchValue: value });
  };
  render() {
    const { id } = this.props;
    return (
      <View style={styles.view}>
        <Text style={styles.text}>{id}</Text>
        <Switch
          name="ios-add-circle-outline"
          size={30}
          style={{ marginLeft: 'auto' }}
          onValueChange={this.toggleSwitch}
          value={this.state.switchValue}
        />
        <Icon
          name="edit"
          size={30}
          style={{ marginLeft: 'auto' }}
          onPress={() => this.props.navigation.navigate('Edit')}
        />
      </View>
    );

    // return <ListItem title={id} rightIcon={{ name: 'edit' }} />;
  }
}

export default WaypointTab;
