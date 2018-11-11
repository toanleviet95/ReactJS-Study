import React, { Component } from 'react';
import './App.css';
import ProductList from './components/productList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Learn Redux Saga</h1>
        <ProductList/>
      </div>
    );
  }
}

export default App;
