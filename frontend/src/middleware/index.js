import { applyMiddleware } from 'redux';
import logger from './logger';
import thunk from 'redux-thunk';

// Middleware wiring
export default applyMiddleware(thunk, logger);
