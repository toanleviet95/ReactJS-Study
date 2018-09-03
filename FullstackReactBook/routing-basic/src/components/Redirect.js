import { Component } from 'react';
import PropTypes from 'prop-types';

class Redirect extends Component {
  static contextTypes = {
    history: PropTypes.object
  }

  static propTypes = {
    to: PropTypes.string
  }

  componentDidMount = () => {
    const history = this.context.history;
    const to = this.props.to;
    history.push(to);
  }

  render = () => null;
}

export default Redirect;
