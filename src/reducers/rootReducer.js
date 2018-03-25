import { combineReducers } from 'redux';

import coins from './coinsReducer';

const rootReducer = combineReducers({
  coins
});

export default rootReducer;
