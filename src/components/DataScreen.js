import {Image, Text, TouchableOpacity, View, SafeAreaView, AsyncStorage, Picker, ScrollView} from "react-native";
import {withNavigation} from 'react-navigation';
import React from 'react';

class DataScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.forceUpdate();
        AsyncStorage.getAllKeys((err, keys) => {
                this.setState(keys);
        });
    }

    render() {
        return (
                <ScrollView>
                    <Text>
                        {JSON.stringify(this.state)}
                    </Text>
                </ScrollView>
        );
    }
}

export default DataScreen;