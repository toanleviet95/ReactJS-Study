import React from 'react';

// Write your own Route components
// import Route from './components/Route';
// import Link from './components/Link';
// import Router from './components/Router';

// Use React Router Module
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Atlantic from './components/Atlantic';
import Pacific from './components/Pacific';
import BlackSea from './components/BlackSea';
import './App.css';

const App = () => (
  <Router>
    <div className='ui text container'>
        <h2 className='ui dividing header'>
          Which body of water?
        </h2>
        <ul>
          <li>
            <Link to='/atlantic'>
              <code>/atlantic</code>
            </Link>
          </li>
          <li>
            <Link to='/pacific'>
              <code>/pacific</code>
            </Link>
          </li>
          <li>
            <Link to='/black-sea'>
              <code>/black-sea</code>
            </Link>
          </li>
        </ul>
        <hr/>

        {/* Write your own Route components */}
        {/* <Route path='/atlantic' component={Atlantic} />
        <Route path='/pacific' component={Pacific} />
        <Route path='/black-sea' component={BlackSea} /> */}

        {/* Use React Router Module */}
        <Switch>
          <Route path='/atlantic/ocean' render={() => (
            <div>
              <h3>Atlantic Ocean — Again!</h3>
              <p>
                Also known as "The Pond."
              </p>
            </div>
          )} />
          <Route path='/atlantic' component={Atlantic} />
          <Route path='/pacific' component={Pacific} />
          <Route path='/black-sea' component={BlackSea} />
          <Route exact path='/' render={() => (
            <h3>
              Welcome! Select a body of saline water above.
            </h3>
          )} />

          <Route render={({ location }) => (
            <div className='ui inverted red segment'>
              <h3>
                Error! No matches for <code>{location.pathname}</code>
              </h3>
            </div>
          )} />
        </Switch>
      </div>
  </Router>
);

export default App;
