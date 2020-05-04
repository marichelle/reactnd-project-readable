import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import Header from './Header';

import { handleInitialData } from '../actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <>
        <Header />
        <Dashboard />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);

  return state;
};

export default connect(mapStateToProps)(App);
