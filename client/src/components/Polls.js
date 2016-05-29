import React from 'react';
import { connect } from 'react-redux';
import Poll from './Poll';

class Home extends React.Component {
  render() {
    return (
      <div>
        {this.props.polls.map((poll, index) => (
          <Poll poll={poll} key={index} />
        ))}
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { polls: state.polls };
}

export default connect(mapStateToProps)(Home);
