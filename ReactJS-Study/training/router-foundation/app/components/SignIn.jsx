import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class SignIn extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    var {dispatch} = this.props;
    var {username, password} = this.refs;
    axios.post('/sign-in', {username: username.value, password: password.value}).then(res => {
      if(res.data === 'Success') {
        dispatch({type: 'LOGIN', username: username.value})
      }else{
        dispatch({type:'SHOW_NOTIFICATION', txt: 'Username/Password is not valid'})
      }
    }).catch(err => {

    });
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Username" ref="username" />
          <br/><br/>
          <input type="password" placeholder="Password" ref="password" />
          <br/><br/>
          <button type="submit">Sign In</button>
        </form>
      </div>
    )
  }
}

module.exports = connect()(SignIn);