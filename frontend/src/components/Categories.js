import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Categories extends Component {
  render() {
    const { categories, category } = this.props;

    return (
      <div className="ui secondary vertical blue pointing menu">
        <Link
          to="/"
          className={'item' + (category === undefined ? ' active' : '')}
        >
          all
        </Link>
        {categories.length &&
          categories.map((cat) => (
            <Link
              className={'item' + (category === cat.path ? ' active' : '')}
              key={cat.path}
              to={`/${cat.path}`}
            >
              {cat.name}
            </Link>
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
