import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { fetchPeople, savePeople } from './actions';
import SignUpForm from './components/SignUpForm';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
const ReduxForm = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

export default class App extends React.Component {
  componentWillMount = () => {
    store.dispatch(fetchPeople());
  }

  render = () => {
    return (
      <Provider store={store}>
        <ReduxForm/>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    fields: state.fields,
    people: state.people,
    saveStatus: state.saveStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (people) => {
      dispatch(savePeople(people));
    }
  }
}