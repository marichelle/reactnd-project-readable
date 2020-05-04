import { fetchCategories } from './categories';
import { fetchPosts } from './posts';
import { getInitialData } from '../utils/api';

export const handleInitialData = () => {
  // redux thunk pattern
  return (dispatch) => {
    return getInitialData().then(({ categories, posts }) => {
      dispatch(fetchCategories(categories));
      dispatch(fetchPosts(posts));
    });
  };
};
