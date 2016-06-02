import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import _ from 'lodash';
import {Pie as PieChart} from 'react-chartjs';

function randomColor() {
  return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
};

class Poll extends React.Component {
  state = {
    selected: null,
    custom: '',
  };

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ selected: nextProps.poll.choices[0].name });
  // }

  renderChart(poll) {
    const chartData = {
      labels: poll.choices.reduce((a, b) => a.concat([b.name]), []),
      datasets: [{
        label: '# of Votes',
        data: poll.choices.reduce((a, b) => a.concat([b.votes]), []),
        backgroundColor: poll.choices.reduce((a, b) => a.concat([randomColor()]), []),
      }]
    };

    const chartOptions = {
      responsive: false,
      // maintainAspectRatio: false
    };

    return (
      <PieChart
        data={chartData}
        options={chartOptions}
        width={280}
        height={280}
      />
    );
  }

  handleChange = (e) => this.setState({ custom: e.target.value });

  handleSelect = (e) => this.setState({ selected: e.target.value });

  handleVote = (e) => {
    e.preventDefault();

    // This needs some cleanup
    const defaultChoice = _.find(this.props.polls, poll => poll._id == this.props.params.id).choices[0].name;
    const choice = this.state.selected == 'custom' ? this.state.custom : this.state.selected || defaultChoice;

    this.props.vote({ id: this.props.params.id, choice });
  };

  renderCustomChoice = () => {
    if (this.props.authenticated && this.state.selected == 'custom') {
      return (
        <FormGroup>
          <ControlLabel>Your choice:</ControlLabel>
          <FormControl
            type="text"
            id="input-custom"
            onChange={this.handleChange}
          />
        </FormGroup>
      );
    }
  }

  render() {
    if (_.isEmpty(this.props.polls)) return <div>Loading...</div>;

    const poll = _.find(this.props.polls, poll => poll._id == this.props.params.id);

    return (
      <div>
        <h3>{poll.title}</h3>
        <Row>
          <Col xs={5}>
            <form onSubmit={this.handleVote}>
              <FormGroup>
                <ControlLabel>I want to vote for:</ControlLabel>
                <FormControl componentClass="select" ref="choiceSelect" onChange={this.handleSelect}>
                  {poll.choices.map((choice, index) => (
                    <option key={index} value={choice.name}>{choice.name}</option>
                  ))}
                  <option value='custom'>I want my own choice</option>
                </FormControl>
              </FormGroup>
              {this.renderCustomChoice()}
              <Button type="submit" bsStyle="primary" >Vote!</Button>
            </form>
            <br />
            <a
              className="btn btn-social btn-twitter"
              target="_blank"
              href={`https://twitter.com/intent/tweet?text=${poll.title} - Voting App&url=http://wannavote.herokuapp.com/poll/${poll._id}`}
            >
              <i className="fa fa-twitter" />
              <span>Share with friends</span>
            </a>
          </Col>
          <Col xs={7}>
            {this.renderChart(poll)}
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    polls: state.polls,
    authenticated: state.auth
  };
}

export default connect(mapStateToProps, actions)(Poll);
