import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends React.Component {
  componentWillMount() {
    this.props.getPolls();
  }

  render() {
    return (
      <div>
        {this.props.polls.map(poll => <div>{poll.title}</div>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    polls: state.polls
  };
}

export default connect(mapStateToProps, actions)(Home);
