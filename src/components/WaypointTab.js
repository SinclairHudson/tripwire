import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class WaypointTab extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View>
                <Text>{this.props.id}</Text>
                <Button
                    title="edit"
                    onPress={() => this.props.navigation.navigate('Edit', {id: this.props.id})}
                />
            </View>
        );
    }
}

export default WaypointTab;