import React, { Component } from 'react';

import Categories from './Categories';
import Posts from './Posts';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="ui grid container app-container">
        <div className="ui four wide column">
          <Categories />
        </div>
        <div className="ui twelve wide column">
          <Posts />
        </div>
      </div>
    );
  }
}
