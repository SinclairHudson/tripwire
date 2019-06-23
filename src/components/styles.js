import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    switch: {
        alignSelf: 'flex-end'
    },
    save: {
        margin: 10,
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: "center",
        color: 'white'
    },
    header: {
        textAlign: 'center',
        color: 'white'
    },
    editor: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        margin: 10,
        color: 'white'
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        margin: 3,
        padding: 9,
        borderBottomWidth: 0.5,
        borderBottomColor: '#fbfcff',
        color: 'white',
        alignSelf: 'stretch',

        borderRadius: 3
    },
    backdrop: {
        backgroundColor: 'black',
        flex: 1,
        color: 'white',
    },

    icon: {
        padding: 9,
        flex: 1,
        color: 'rgb(255,249,251)',
    },
    add: {
        padding: 40,
        flex: 1,
        color: 'rgb(255,249,251)',
        alignSelf: 'center'
    },
    buttonText: {
        flex: 4,
        fontSize: 25,
        color: 'rgb(255,255,255)'
    },
    buttons: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        color: 'white'
    },
    chartLabel: {
        color: 'rgba(255,255,255,0.97)',
        marginLeft: 40
    },
    image: {
        paddingLeft: 100,
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        marginLeft: 20
    },
    global: {
        flexDirection: 'row',
        padding: 30,
    },
    button: {
        margin: 30,
        flex: 1,
        width: 300,
        backgroundColor: 'rgb(255,13,3)',
        borderRadius: 20,
        color: 'white'
    },
    text: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 18,
        fontFamily: 'AvenirNext-DemiBold',
        marginLeft: 10,
        color: 'white'
    },
    valueContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    valueValue: {
        width: 200,
        fontSize: 20
    },
    valueName: {
        width: 50,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default styles;
