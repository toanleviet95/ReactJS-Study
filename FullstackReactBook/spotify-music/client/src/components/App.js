import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NoMatch from './NoMatch';
import Login from './Login';
import Logout from './Logout';
import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer';
import PrivateRoute from './PrivateRoute';

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className='ui grid'>
        <TopBar/>
        <div className='spacer row' />
        <div className='row'>
          <Switch>
            <PrivateRoute path='/albums' component={AlbumsContainer} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route exact path='/' render={() => (
              <Redirect to='/albums' />
            )} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
