import _ from 'lodash';

import { RECIEVED_COINS, REQUESTED_COINS, FAILED_COINS, SORT_COINS } from '../actions/coins';

const initialState = {
	sort: {
		primary: 'updated',
		secondary: 'desc'
	}
};

export default function coinsReducer(state = initialState, action) {
	switch (action.type) {
		case RECIEVED_COINS:
			console.log('RECIEVED_COINS Action');
			const coins = _.orderBy(action.coins, [state.sort.primary], [state.sort.secondary]);
			return {
				sort: state.sort,
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
				sort: {
					primary: action.primarySort,
					secondary: action.secondarySort
				},
				...sortedCoins
			};
		default:
			return state;
	}
}
