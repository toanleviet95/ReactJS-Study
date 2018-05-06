import React from 'react';
import SignIn from 'SignIn';
import axios from 'axios';
import { connect } from 'react-redux';

class AccountInfo extends React.Component{
  logOut(e) {
    e.preventDefault();
    var { dispatch } = this.props;
    axios.get('/sign-out').then(res => {
      dispatch({ type: 'LOGOUT' })
    }).catch(err => {
      console.log(err);
    });
  }
  render(){
    var {username} = this.props;
    var xhtml = username === null ? <SignIn></SignIn> : <AccountInfo></AccountInfo>
    return (
      <div>
        <h1>This is Account</h1>
        <p>Username: {this.props.username}</p>
        <a href="#" onClick={this.logOut.bind(this)}>Log Out</a>
      </div>
    )
  }
}

module.exports = connect((state) => {
  return { username: state.username }
})(AccountInfo);