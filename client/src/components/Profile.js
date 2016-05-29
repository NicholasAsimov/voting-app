import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends React.Component {
  componentWillMount() {
    this.props.getUserInfo();
  }

  render() {
    const polls = this.props.polls.filter(poll => poll.author == this.props.user.email);

    return (
      <div>
        <div>This is protected feature, your email is {this.props.user.email}</div>
        <div>Your polls:</div>
        {polls.map(poll => <div>{poll.title}</div>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    polls: state.polls,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(Profile);
