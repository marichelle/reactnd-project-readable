import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Categories from './Categories';
import PostList from './PostList';
import SortPosts from './SortPosts';

export default class Dashboard extends Component {
  state = {
    sort: 'date', // comments || date || votes
  };

  handleSortSelection = (e, sort) => {
    e.preventDefault();

    this.setState(() => ({
      sort,
    }));
  };

  render() {
    const { category } = this.props.match.params;
    const { sort } = this.state;

    return (
      <div className="ui grid container">
        <div className="ui four wide column">
          <Categories category={category} />
        </div>
        <div className="ui eight wide column">
          <div className="ui grid">
            <div className="sixteen wide column">
              <Link to="/post/add">
                <button className="ui right floated primary button">
                  Add New Post
                </button>
              </Link>
            </div>
          </div>
          <PostList category={category} sort={sort} />
        </div>
        <div className="ui four wide column">
          <SortPosts sort={sort} onClick={this.handleSortSelection} />
        </div>
      </div>
    );
  }
}
