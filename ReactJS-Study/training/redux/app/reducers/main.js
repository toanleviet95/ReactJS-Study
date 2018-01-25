var redux = require('redux');
var mang = require('./mang');
var isAdding = require('./isAdding');

var reducer = redux.combineReducers({mang, isAdding});

module.exports = reducer;