import React from 'react';
import SignIn from 'SignIn';
import AccountInfo from 'AccountInfo';
import { connect } from 'react-redux';

class Account extends React.Component{
  render(){
    var {username} = this.props;
    var xhtml = username === null ? <SignIn></SignIn> : <AccountInfo></AccountInfo>
    return (
      <div className="cell small-10 medium-6 large-4">
      {xhtml}
      </div>
    )
  }
}

module.exports = connect((state) => {
  return { username: state.username }
}) (Account);