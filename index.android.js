/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
} from 'react-native';

var CQ5_URL = "https://www.horizon.tv/content/unified/NL/eng/android/settings.js";
var ReactProject = React.createClass({
    componentDidMount() {
        console.log("Start load CQ5");
        this.loadCQ5();
    },
    loadCQ5() {
        fetch(CQ5_URL)
            .then((response) => {
                console.log(response)
            })
            //.catch((error) => console.log(error))
            .done();
    },
    getInitialState() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var data = [{ key: 'row 1', image: "http://icons.iconarchive.com/icons/designbolts/free-multimedia/1024/iMac-icon.png" }, { key: 'row 2', image: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png" }];
        return {
            dataSource: ds.cloneWithRows(data),
        };
    },
    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Shake or press menu button for dev menu
                </Text>
                <ListView
                    dataSource={this.state["dataSource"]}
                    renderRow={this.renderRow}
                    />
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
    },
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('ReactProject', () => ReactProject);
