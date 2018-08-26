import React from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import Field from './Field';
import CourseSelect from './CourseSelect';
import apiClient from '../services';

export default class SignUpForm extends React.PureComponent {
  state = {
    fields: this.props.fields || { name: '', email: '', course: null, department: null },
    fieldErrors: {},

    // * No Redux way *
    // people: [],
    // _loading: false,
    // _saveStatus: 'READY',
  };

  static propTypes = {
    people: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    saveStatus: PropTypes.string.isRequired,
    fields: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
  }

  componentWillReceiveProps = (update) => {
    this.setState({fields: update.fields});
  }

  // * No Redux way *
  // componentWillMount = () => {
  //   this.setState({ _loading: true });
  //   apiClient.loadPeople().then(people => {
  //     this.setState({ _loading: false, people: people });
  //   });
  // }

  onFormSubmit = (e) => {
    const person = this.state.fields;
    e.preventDefault();
    if (this.validate()) return;

    // * No Redux way *
    // const people = [...this.state.people, person];
    // this.setState({ _saveStatus: 'SAVING' });
    // apiClient.savePeople(people).then(() => {
    //   this.setState({
    //     people,
    //     fields: { name: '', email: '', course: null, department: null },
    //     _saveStatus: 'SUCCESS',
    //   });
    // }).catch(err => {
    //   console.error(err);
    //   this.setState({ _saveStatus: 'ERROR' });
    // });

    this.props.onSubmit([...this.props.people, person]);
  }

  onInputChange = ({name, value, error}) => {
    const { fields, fieldErrors } = this.state;
    fields[name] = value;
    fieldErrors[name] = error;
    // * No Redux way *
    // this.setState({ fields, fieldErrors, _saveStatus: 'READY' });
    this.setState({ fields, fieldErrors });
  }

  validate = () => {
    const { fields, fieldErrors } = this.state;
    const errorMsg = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    if (!fields.name) return true;
    if (!fields.email) return true;
    if (!fields.course) return true;
    if (!fields.department) return true;
    if (errorMsg.length) return true;

    return false;
  }

  render = () => {
    // * No Redux way *
    // if (this.state._loading) {
    //   return <img alt='loading' src='/img/loading.gif' />;
    // }

    if (this.props.isLoading) {
      return <img alt='loading' src='/img/loading.gif' />;
    }

    const dirty = Object.keys(this.state.fields).length;
    let status = this.props.saveStatus;
    if (status === 'SUCCESS' && dirty) status = 'READY';

    return (
      <div>
        <h1>
          Sign Up Form
        </h1>
        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='Name'
            name='name'
            onChange={this.onInputChange}
            value={this.state.fields.name}
            validate={val => (val ? false : 'Name required')}
          />
          <br />
          <Field
            placeholder='Email'
            name='email'
            onChange={this.onInputChange}
            value={this.state.fields.email}
            validate={val => (isEmail(val) ? false : 'Invalid Email')}
          />
          <CourseSelect
            department={this.state.fields.department}
            course={this.state.fields.course}
            onChange={this.onInputChange}
          />
          <br />
          {{
            SAVING: <input value='Saving...' type='submit' disabled />,
            SUCCESS: <input value='Submit' type='submit'/>,
            ERROR: <input value='Save failed - Retry?' type='submit'/>,
            READY: <input value='Submit' type='submit' />
          }[status]}
        </form>
        <div>
          <h3>People</h3>
          <ul>
            {
              this.props.people.map(({ name, email, department, course }, i) => (
                <li key={i}>{[name, email, department, course].join(' - ')}</li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}