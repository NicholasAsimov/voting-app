import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { PanelGroup, Panel, Button } from 'react-bootstrap';
import { Link } from 'react-router';

class Profile extends React.Component {
  componentWillMount() {
    this.props.getUserInfo();
  }

  handleClick = (e) => {
    const id = e.target.getAttribute('data-id');
    const authorEmail = this.props.user.email;
    this.props.removePoll({ id, authorEmail });
  };

  render() {
    const polls = this.props.polls.filter(poll => poll.author == this.props.user.email);

    return (
      <div>
        <p>Hello, your email is {this.props.user.email}</p>
        <hr />
        <h3>Your polls</h3>
        <PanelGroup className="text-left">
          {polls.map((poll, index) => (
            <Panel key={index}>
              <Link to={"/poll/" + poll._id}>{poll.title}</Link>
              <Button
                bsStyle="warning"
                bsSize="xs"
                className="pull-right"
                data-id={poll._id}
                onClick={this.handleClick}
              >
                <i data-id={poll._id} className="glyphicon glyphicon-trash" />
              </Button>
            </Panel>
          ))}
        </PanelGroup>
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
