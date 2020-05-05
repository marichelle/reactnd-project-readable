import React from 'react';

const sortTypes = [
  {
    key: 'date',
    name: 'Date',
  },
  {
    key: 'comments',
    name: 'Most Comments',
  },
  {
    key: 'votes',
    name: 'Most Votes',
  },
];

export default ({ sort, onClick }) => (
  <div className="ui vertical text menu">
    <div className="header item">Sort By</div>
    {sortTypes
      .sort((a, b) =>
        sort === 'date'
          ? a.timestamp - b.timestamp
          : sort === 'comments'
          ? b.commentCount - a.commentCount
          : b.voteScore - a.voteScore
      )
      .map((sortType) => (
        <a
          key={sortType.key}
          className={'blue item' + (sort === sortType.key ? ' active' : '')}
          onClick={(e) => onClick(e, sortType.key)}
        >
          {sortType.name}
        </a>
      ))}
  </div>
);
