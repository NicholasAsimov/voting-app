import React from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';
import { browserHistory } from 'react-router';

class NewPoll extends React.Component {
  handleFormSubmit = ({ title, choices }) => {
    const choicesArr = choices.trim().split('\n');
    this.props.addPoll({ title: title.trim(), choices: choicesArr });
    browserHistory.push('/');
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
    const { handleSubmit, fields: { title, choices } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)} className="text-left">
        <fieldset className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          {title.touched && title.error && <div className="error">{title.error}</div>}
         </fieldset>
        <fieldset className="form-group">
          <label>Choices (seperated by line)</label>
          <textarea rows="3" className="form-control" {...choices} />
          {choices.touched && choices.error && <div className="error">{choices.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Add Poll</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = ['title', 'choices'];

  requiredFields.forEach(field => {
    if (!values[field] || values[field].trim() == '') {
      errors[field] = 'Required'
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: 'newpoll',
  fields: ['title', 'choices'],
  validate
}, mapStateToProps, actions)(NewPoll);
