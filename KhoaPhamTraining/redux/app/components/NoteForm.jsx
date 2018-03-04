import React from 'react';
import {connect} from 'react-redux';
import {addItem, toggle} from 'actions';

class NoteForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault(); // prevent refresh browser
    // this.props.handleAdd(this.refs.txt.value);
    // this.refs.txt.value = '';
    // this.toggle();
    var {dispatch} = this.props;
    dispatch(addItem(this.refs.txt.value));
    dispatch(toggle());
  }

  toggle() {
    // this.state.isAdding = !this.state.isAdding;
    // this.setState(this.state);
    var {dispatch} = this.props;
    dispatch(toggle());
  }

  render() {
    if (this.props.isAdding)
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Enter your text" ref="txt" />
          <br/><br/>
          <button>Add</button>
        </form>
      )
    return <button onClick={this.toggle.bind(this)}>+</button>
  }
}

module.exports = connect(function(state){
  return {isAdding: state.isAdding}
})(NoteForm);
