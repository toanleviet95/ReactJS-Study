import React from 'react';
import {connect} from 'react-redux';
import {removeItem} from 'actions';

class Note extends React.Component {
  removeNote() {
    // let {index, handleRemove} = this.props;
    // handleRemove(index);
    var {index, dispatch} = this.props;
    dispatch(removeItem(index));
  }

  render(){
    return (
        <div>
            <p>{this.props.children}</p>
            <button onClick={this.removeNote.bind(this)}>Delete</button>
        </div>
    )
  }
}

module.exports = connect()(Note);
