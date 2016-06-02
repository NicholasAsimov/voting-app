import React from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends React.Component {
  handleFormSubmit = ({ email, password }) => {
    this.props.signinUser({ email, password });
  };

  renderAlert = () => {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  };

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
         </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" {...password} />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = ['email', 'password'];

  requiredFields.forEach(field => {
    if (!values[field] || values[field].trim() == '') {
      errors[field] = 'Required'
    }
  });

  if (values.email && !/[^\s@]+@[^\s@]+\.[^\s@]+/.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
  validate
}, mapStateToProps, actions)(Signin);
