import { combineReducers } from 'redux';

import coins from './coinsReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
	coins,
	settings
});

export default rootReducer;
