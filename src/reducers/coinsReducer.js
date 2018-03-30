import _ from 'lodash';

import { RECIEVED_COINS, REQUESTED_COINS, FAILED_COINS, SORT_COINS } from '../actions/coins';

const initialState = {
	sortingChange: false,
	primarySort: 'updated',
	secondarySort: 'desc'
};

export default function coinsReducer(state = initialState, action) {
	switch (action.type) {
		case RECIEVED_COINS:
			console.log('RECIEVED_COINS Action');
			/**
			 * TODO: Pull current sort configuration from state so we dont
			 * overwrite this when we get new values every minute
			 */
			const coins = _.orderBy(action.coins, [state.primarySort], [state.secondarySort]);
			return {
				...state,
				...coins
			};
		case REQUESTED_COINS:
			console.log('REQUESTED_COINS Action');
			return state;
		case FAILED_COINS:
			console.log('FAILED_COINS Action');
			return state;
		case SORT_COINS:
			console.log('SORT_COINS Action');
			const sortedCoins = _.orderBy(state, [action.primarySort], [action.secondarySort]);
			return {
				sortingChange: true,
				primarySort: action.primarySort,
				secondarySort: action.secondarySort,
				...sortedCoins
			};
		default:
			return state;
	}
}
