var RNDBModel = require('react-native-db-models')

var DB = {
    "session": new RNDBModel.create_db('session'),
    "channels": new RNDBModel.create_db('channels'),
}

module.exports = DB