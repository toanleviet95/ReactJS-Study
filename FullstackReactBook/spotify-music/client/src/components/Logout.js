import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { client } from '../client';

class Logout extends Component {
  componentDidMount() {
    client.logout();
  }

  render() {
    return (
      <Redirect to='/login' />
    );
  }
}

export default Logout;