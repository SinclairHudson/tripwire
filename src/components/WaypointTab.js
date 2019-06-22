import React from 'react';
import { View, Text, Button, Switch, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';
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

    return <ListItem title={id} rightIcon={{ name: 'edit' }} />;
  }
}

export default WaypointTab;
