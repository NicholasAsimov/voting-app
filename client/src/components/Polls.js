import React from 'react';
import { connect } from 'react-redux';
import Poll from './Poll';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Polls extends React.Component {
  render() {
    return (
      <div>
        <h2>Public polls</h2>
        <p>Select a poll to see the results and vote, or make a <Link to="/newpoll">new poll</Link>!</p>
        <ListGroup>
          {this.props.polls.map((poll, index) => (
            <LinkContainer to={"/poll/" + poll._id} key={index}>
              <ListGroupItem>{poll.title}</ListGroupItem>
            </LinkContainer>
          ))}
      </ListGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { polls: state.polls };
}

export default connect(mapStateToProps)(Polls);
