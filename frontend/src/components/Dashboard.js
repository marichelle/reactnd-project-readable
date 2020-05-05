import React, { Component } from 'react';

import Categories from './Categories';
import Posts from './Posts';
import SortPosts from './SortPosts';

export default class Dashboard extends Component {
  state = {
    category: 'all',
    sort: 'date', // comments || date || votes
  };

  handleActiveCategory = (e, category) => {
    e.preventDefault();

    this.setState(() => ({
      category,
    }));
  };

  handleSortSelection = (e, sort) => {
    e.preventDefault();

    this.setState(() => ({
      sort,
    }));
  };

  render() {
    const { category, sort } = this.state;

    return (
      <div className="ui grid container app-container">
        <div className="ui four wide column">
          <Categories category={category} onClick={this.handleActiveCategory} />
        </div>
        <div className="ui eight wide column">
          <Posts category={category} sort={sort} />
        </div>
        <div className="ui four wide column">
          <SortPosts sort={sort} onClick={this.handleSortSelection} />
        </div>
      </div>
    );
  }
}
