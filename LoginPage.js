'use strict';

var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TextInput,
    AsyncStorage,
} = React;

var CQ5_URL = "https://www.horizon.tv/content/unified/NL/eng/android/settings.js";
var SESSION_URL = "https://android-api2.horizon.tv/oesp/api/NL/eng/android/session";

var CQ5 = require("./cq5.json")["jcr:content"];
var Button = require('react-native-button');
var DB = require('./DB.js');
var navigator;

var LoginPage = React.createClass({
    componentWillMount() {
        console.log("componentWillMount " + CQ5.OESPBaseURL);
        navigator = this.props.navigator;
    },
    _signIn() {
        console.log("start sign in");
        var cred = JSON.stringify({ "username": this.state.username, "password": this.state.password });
        fetch(SESSION_URL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: cred
        })
            .then((response) => { return response.json() })
            .then((responseData) => this._signInSuccess(responseData))
            .catch((error) => {
                console.warn(error);
            });
    },
    _signInSuccess(data) {
        AsyncStorage.setItem("session", JSON.stringify(data));
        console.log("Token: " + data.oespToken);
        navigator.push({ scene: 'HomePage' });
    },
    getInitialState() {
        return {
            username: "derbygoliveav01",
            password: "welkom1234",
        };
    },
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <TextInput
                    autoFocus={true}
                    placeholder={"Username"}
                    onChangeText={(username) => this.setState({ username }) }
                    value={this.state.username}
                    />
                <TextInput
                    placeholder={"Password"}
                    onChangeText={(password) => this.setState({ password }) }
                    value={this.state.password}
                    secureTextEntry ={true}
                    />
                <Button
                    onPress={this._signIn }
                    >
                    Sign in
                </Button>
            </View>
        );
    },

    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <View>
                <Image
                    style={styles.image}
                    source={{ uri: rowData.image }}/>
                <Text>{rowData.key}</Text>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    image: {
        width: 64,
        height: 64,
    }
});

module.exports = LoginPage;