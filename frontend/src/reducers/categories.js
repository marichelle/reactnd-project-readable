import { FETCH_CATEGORIES } from '../actions/categories';

export default function categories(categories = [], action) {
  const { payload } = action;

  switch (action.type) {
    case FETCH_CATEGORIES:
      return [...categories, ...payload.categories];

    default:
      return categories;
  }
}
