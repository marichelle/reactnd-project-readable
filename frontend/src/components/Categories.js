import React, { Component } from 'react';
import { connect } from 'react-redux';

class Categories extends Component {
  render() {
    const { categories, category, onClick } = this.props;

    return (
      <div className="ui secondary vertical blue pointing menu">
        <a
          className={'item' + (category === 'all' ? ' active' : '')}
          onClick={(e) => onClick(e, 'all')}
        >
          all
        </a>
        {categories.length &&
          categories.map((cat) => (
            <a
              key={cat.path}
              className={'item' + (category === cat.path ? ' active' : '')}
              onClick={(e) => onClick(e, cat.path)}
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
