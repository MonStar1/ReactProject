/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Navigator,
    View,
} from 'react-native'

var LoginPage = require('./LoginPage')
var HomePage = require('./HomePage')

class ReactProject extends Component {

    render() {
        return (
            <Navigator
                initialRoute={{ scene: 'LoginPage' }}
                renderScene={this.renderScene.bind(this) }
                configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottomAndroid}
                />
        );
    }

    renderScene(route, nav) {
        var scene = route.scene
        switch (scene) {
            case 'LoginPage': {
                console.log("LoginPage nav render");
                return <LoginPage navigator={nav}/>
            }
            case 'HomePage': {
                console.log("HomePage nav render");
                return <HomePage navigator={nav}/>
            }


        }
        return null;
    }
}


AppRegistry.registerComponent('ReactProject', () => ReactProject);
