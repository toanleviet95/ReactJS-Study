var React = require('react');
var ReactDOM = require('react-dom');
import { HashRouter as Router, Route } from 'react-router-dom';

var HomePage = require('HomePage');
var Main = require('Main');
var Nav = require('Nav');
var Account = require('Account');
var Transaction = require('Transaction');

ReactDOM.render(
  <Router>
    <Main>
        <Route exact path="/" component={HomePage} />
        <Route path="/account" component={Account} />
        <Route path="/transaction" component={Transaction} />
    </Main>
   </Router>
  ,document.getElementById('root')
);
