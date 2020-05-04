import React, { Component } from 'react';
import { connect } from 'react-redux';

class Categories extends Component {
  state = {
    activeCategory: 'all',
  };

  handleOnClick = (e, id) => {
    e.preventDefault();

    this.setState(() => ({
      activeCategory: id,
    }));
  };

  render() {
    const { categories } = this.props;
    const { activeCategory } = this.state;

    return (
      <div className="ui secondary vertical teal pointing menu">
        <a
          className={'item' + (activeCategory === 'all' ? ' active' : '')}
          onClick={(e) => this.handleOnClick(e, 'all')}
        >
          all
        </a>
        {categories.length &&
          categories.map((cat) => (
            <a
              key={cat.path}
              className={'item' + (activeCategory === cat.path ? ' active' : '')}
              onClick={(e) => this.handleOnClick(e, cat.path)}
            >
              {cat.name}
            </a>
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories,
  };
};

export default connect(mapStateToProps)(Categories);
