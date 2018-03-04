var React = require('react');
var ReactDOM = require('react-dom');
var List = require('List');
var {Provider} = require('react-redux');
var store = require('store');

ReactDOM.render(
  <Provider store={store}>
    <List/>
  </Provider>,
  document.getElementById('root')
);

/* Toan tu ... copy object va mang */
// var obj1 = {
//   age: 18,
//   name: 'Hoa'
// };
// var obj2 = { ...obj1, height: 180, age: 35 };
// obj1.age = 30;
// console.log(obj2);

// var arr1 = [1, 2, 3, 4, 5];
// var arr2 = [6, 7, ...arr1, 9, 0];
// arr1[0] = 1000;
// console.log(arr2);

// /* Pure function */
// var add = (a, b) => a + b;
// console.log(add(5, 6));

// require('./examples.js');