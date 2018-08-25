import React from 'react';
import isEmail from 'validator/lib/isEmail';
import Field from './Field';
import CourseSelect from './CourseSelect';

const apiClient = {
  loadPeople: function () {
    return {
      then: function (cb) {
        setTimeout(() => {
          cb(JSON.parse(localStorage.people || '[]'));
        }, 1000);
      },
    };
  },

  savePeople: function (people) {
    const success = !!(this.count++ % 2);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({ success });

        localStorage.people = JSON.stringify(people);
        return resolve({ success });
      }, 1000);
    });
  },

  count: 1,
};

export default class SignUpForm extends React.PureComponent {
  state = {
    fields: {},
    fieldErrors: {},
    people: [],
    _loading: false,
    _saveStatus: 'READY',
  };

  componentWillMount = () => {
    this.setState({ _loading: true });
    apiClient.loadPeople().then(people => {
      this.setState({ _loading: false, people: people });
    });
  }

  onFormSubmit = (e) => {
    const person = this.state.fields;
    e.preventDefault();
    if (this.validate()) return;

    const people = [...this.state.people, person];
    this.setState({ _saveStatus: 'SAVING' });
    apiClient.savePeople(people).then(() => {
      this.setState({
        people,
        fields: {},
        _saveStatus: 'SUCCESS',
      });
    }).catch(err => {
      console.error(err);
      this.setState({ _saveStatus: 'ERROR' });
    });
  }

  onInputChange = ({name, value, error}) => {
    const { fields, fieldErrors } = this.state;
    fields[name] = value;
    fieldErrors[name] = error;
    this.setState({ fields, fieldErrors, _saveStatus: 'READY' });
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
    if (this.state._loading) {
      return <img alt='loading' src='/img/loading.gif' />;
    }

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
            SUCCESS: <input value='Saved!' type='submit' disabled />,
            ERROR: <input value='Save failed - Retry?' type='submit' disabled={this.validate} />,
            READY: <input value='Submit' type='submit' disabled={this.validate} />
          }[this.state._saveStatus]}
        </form>
        <div>
          <h3>People</h3>
          <ul>
            {
              this.state.people.map(({ name, email, department, course }, i) => (
                <li key={i}>{[name, email, department, course].join(' - ')}</li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}