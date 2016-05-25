import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
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

export default connect(mapStateToProps)(Home);
