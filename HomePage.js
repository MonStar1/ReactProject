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
    RecyclerViewBackedScrollView
} = React;

var HomePage = React.createClass({
    componentWillMount() {
        fetch("https://android-api2.horizon.tv/oesp/api/NL/eng/android/channels")
            .then((response) => response.json())
            .then(this._responseData);
    },
    _responseData(responseData) {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
            channels: ds.cloneWithRows(responseData.channels),
            listViewLength: responseData.channels.length
        });
    },
    getInitialState() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            channels: ds.cloneWithRows([]),
            listViewLength: 0,
        };
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', elevation: 4 }}>
                    <Text style={styles.header}>Home Page</Text>
                </View>
                <ListView
                    dataSource={this.state.channels}
                    renderRow={this.renderRow}
                    initialListSize={this.state.listViewLength}
                    />
            </View>
        );
    },
    renderRow(rowData) {
        return (
            <View style={styles.channelContainer}>
                <Image
                    style={styles.image}
                    resizeMode={'contain'}
                    source={{ uri: rowData.stationSchedules[0].station.images[0].url }}
                    />
                <Text
                    style={styles.text}
                    >
                    {rowData.stationSchedules[0].station.title}
                </Text>
            </View >
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold',
    },
    channelContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    image: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
        textAlign: 'center'
    },
});

module.exports = HomePage;