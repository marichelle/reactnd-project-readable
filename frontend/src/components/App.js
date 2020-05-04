import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import Header from './Header';

import { handleInitialData } from '../actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <>
        <Header />
        <div className="ui hidden divider" />
        <Dashboard />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { handleInitialData })(App);
