import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends React.Component {
  render() {
    return (
      <div>This is protected feature</div>
    );
  }
}



export default connect(null, actions)(Feature);
