import React from 'react';
import axios from 'axios';
import Nav from 'Nav';
import Notification from 'Notification';
import { connect } from 'react-redux';

class Main extends React.Component{
  render(){
    var {notification} = this.props;
    var xhtml = notification != null ? <Notification txt={notification}/>: null;
    return (
      <div>
        {/* <h1>This is Main</h1> */}
        <Nav/>
        <div className="grid-x" style={{justifyContent: "center"}}>
        {xhtml}
        {this.props.children}
        </div>
      </div>
    )
  }
  componentDidMount() {
    var { dispatch } = this.props;
    axios.get('/get-info').then(res => {
      if(res.data !== 'Not Sign In') {
        return dispatch({type: 'LOGIN', username: res.data});
      }
    }).catch(err => {
      console.log(err);
    })
  }
}

module.exports = connect(state => {
  return {notification: state.notification}
})(Main);