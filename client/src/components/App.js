import React from 'react';
import Header from './Header';
import { Grid, Jumbotron } from 'react-bootstrap'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Grid>
          <Jumbotron className="text-center">
            {this.props.children}
          </Jumbotron>
        </Grid>
      </div>
    );
  }
}
