import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'http://localhost:3030',
      color: 'white'
    }
  }

  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('change color', this.state.color);
  }

  setColor = (color) => {
    this.setState({ color });
  }

  render() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (color) => {
      document.body.style.backgroundColor = color;
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React with socket.io</h1>
        </header>
        <div style={{ textAlign: "center" }}>
          <div>Choose color then click button "Change Color"</div>
          <button onClick={() => this.send()}>Change Color</button>
          <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
          <button id="red" onClick={() => this.setColor('red')}>Red</button>
        </div>
      </div>
    );
  }
}

export default App;
