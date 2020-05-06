import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Header from './Header';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import Error404 from './Error404';

import { handleInitialData } from '../actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <Router>
        <>
          <Header />
          <Switch>
            <Route path="/post/edit/:id" component={PostForm} />
            <Route path="/post/add" exact component={PostForm} />
            <Route path="/:category/:id" component={PostDetail} />
            <Route path="/:category" component={Dashboard} />
            <Route path="/" exact component={Dashboard} />
            <Route component={Error404} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default connect(null, { handleInitialData })(App);
