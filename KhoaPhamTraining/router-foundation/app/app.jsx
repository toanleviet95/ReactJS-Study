var React = require('react');
var ReactDOM = require('react-dom');
var { Router, Route, hashHistory, IndexRoute } = require('react-router');
var { syncHistoryWithStore, routerReducer } = require('react-router-redux');
var HomePage = require('HomePage');
var Main = require('Main');
var Nav = require('Nav');
var Account = require('Account');
var Transaction = require('Transaction');
var redux = require('redux');
var { Provider } = require('react-redux');

var username = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.username;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}

var notification = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.txt;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
}

var reducer = redux.combineReducers({username, notification, routing: routerReducer});
var store = redux.createStore(reducer);

var requireLogin = (nextState, replace, next) => {
  if (store.getState().username === null) {
    replace('/');
  }
  next();
};

require('style!css!foundation-sites/dist/css/foundation.min.css');
require('style!css!sass!./scss/style.scss');
$(document).ready(() => {
  $(document).foundation();
});

var history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Router path="/" component={Main}>
            <IndexRoute component={HomePage}/>
            <Route path="account" component={Account}/>
            <Route path="transaction" component={Transaction} onEnter={requireLogin}/>
        </Router>
    </Router>
   </Provider>
  ,document.getElementById('root')
);
