import React, { Component } from 'react';

// Use your own Route Components
// import Redirect from './Redirect';

// Use React Router Module
import { Redirect } from 'react-router-dom';

class BlackSea extends Component {
  state = {
    counter: 3
  }

  componentDidMount() {
    this.interval = setInterval(() => (
      this.setState(prevState => {
        return {
          counter: prevState.counter - 1
        };
      })
    ), 1000)
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div>
        <h3>Black Sea</h3>
        <p>Nothing to sea [sic] here ...</p>
        <p>Redirecting in { this.state.counter }...</p>
        {
          (this.state.counter < 1) ? (
            <Redirect to='/' />
          ) : null
        }
      </div>
    )
  }
}

export default BlackSea;