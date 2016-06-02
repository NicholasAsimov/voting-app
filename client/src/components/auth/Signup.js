import React from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends React.Component {
  handleFormSubmit = (formProps) => {
    this.props.signupUser(formProps);
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.signupUser)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
         <fieldset className="form-group">
           <label>Password:</label>
           <input type="password" className="form-control" {...password} />
           {password.touched && password.error && <div className="error">{password.error}</div>}
         </fieldset>
         <fieldset className="form-group">
           <label>Confirm Password:</label>
           <input type="password" className="form-control" {...passwordConfirm} />
           {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
         </fieldset>
         {this.renderAlert()}
         <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = ['email', 'password', 'passwordConfirm'];

  requiredFields.forEach(field => {
    if (!values[field] || values[field].trim() == '') {
      errors[field] = 'Required'
    }
  });

  if (values.email && !/[^\s@]+@[^\s@]+\.[^\s@]+/.test(values.email)) {
    errors.email = 'Enter a correct email';
  }

  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
