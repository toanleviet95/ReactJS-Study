import { Component } from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';

class Router extends Component {
  static childContextTypes = {
    history: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.history = createHistory();
    this.history.listen(() => this.forceUpdate());
  }

  getChildContext() {
    return {
      history: this.history
    };
  }

  render() {
    return this.props.children;
  }
}

export default Router;