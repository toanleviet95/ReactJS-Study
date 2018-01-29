import React from 'react';
import {Link, IndexLink} from 'react-router';

class Nav extends React.Component{
  render(){
    return (
      <div>
        <ul>
            <li><IndexLink to="/">Hompage</IndexLink></li>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/transaction">Transaction</Link></li>
        </ul>
      </div>
    )
  }
}

module.exports = Nav;