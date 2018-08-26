import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Field extends PureComponent {
  state = {
    value: '',
    error: false,
  };

  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  componentWillReceiveProps = (update) => {
    this.setState({ value: update.value });
  };

  onChange = (evt) => {
    const name = this.props.name;
    const value = evt.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });

    this.props.onChange({ name, value, error });
  };

  render = () => {
    return (
      <div>
        <input
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={(e) => this.onChange(e)}
        />
        <span style={{color: 'red'}}>{this.state.error}</span>
      </div>
    )
  };

}