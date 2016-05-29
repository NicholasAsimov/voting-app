import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import {Pie as PieChart} from 'react-chartjs';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

function randomColor() {
  return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
};

class Poll extends React.Component {
  state = {
    value: this.props.poll.choices[0].name
  };

  handleChange = (event, index, value) => this.setState({ value });

  handleVote = () => {
    this.props.vote(this.props.poll._id, this.state.value);
  };

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
        width={300}
        height={200}
      />
    );
  }

  render() {
    const poll = this.props.poll;
    return (
      <Card>
        <CardHeader
          title={poll.title}
          subtitle={poll.choices.map(choice => choice.name).join(' vs ')}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true} className="split-container">
          <div className="split-item">
            I want to vote for:
            <SelectField value={this.state.value} onChange={this.handleChange}>
              {poll.choices.map((choice, index) => (
                <MenuItem
                  key={index}
                  value={choice.name}
                  primaryText={choice.name}
                />
              ))}
            </SelectField>
            <RaisedButton onClick={this.handleVote} label="Vote!" primary />
          </div>
          <div className="split-item">
            {this.renderChart(poll)}
          </div>
        </CardText>
      </Card>
    );
  }
}

export default connect(null, actions)(Poll);
