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
        <h1 className="text-center page-title">Sign In</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Username" ref="username" />
          <input type="password" placeholder="Password" ref="password" />
          <button type="submit" className="button expanded">Sign In</button>
        </form>
      </div>
    )
  }
}

module.exports = connect()(SignIn);