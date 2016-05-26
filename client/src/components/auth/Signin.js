import React from 'react';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
      {this.renderAlert()}
      <RaisedButton label="Sign In" primary={true} type="submit" />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = ['email', 'password'];

  requiredFields.forEach(field => {
    if (!values[field]) {
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
