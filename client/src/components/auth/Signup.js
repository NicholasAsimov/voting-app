import React from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
        <TextField
          hintText="test@xample.com"
          floatingLabelText="Email"
          errorText={email.touched && email.error}
          {...email}
        /><br />
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          errorText={password.touched && password.error}
          type="password"
          {...password}
        /><br />
        <TextField
          hintText="Confirm Password"
          floatingLabelText="Confirm Password"
          errorText={passwordConfirm.touched && passwordConfirm.error}
          type="password"
          {...passwordConfirm}
        /><br />
        {this.renderAlert()}
        <RaisedButton label="Sign Up" primary={true} type="submit" />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = ['email', 'password', 'passwordConfirm'];

  requiredFields.forEach(field => {
    if (!values[field]) {
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
