import _ from 'lodash';

import { RECIEVED_COINS, REQUESTED_COINS, FAILED_COINS, SORT_COINS } from '../actions/coins';

const initialState = {
	sort: {
		primary: 'updated',
		secondary: 'desc'
	},
	list: []
};

export default function coinsReducer(state = initialState, action) {
	switch (action.type) {
		case RECIEVED_COINS:
			const coins = _.orderBy(action.coins, [state.sort.primary], [state.sort.secondary]);
			return {
				sort: state.sort,
				list: [...coins]
			};
		case REQUESTED_COINS:
			return state;
		case FAILED_COINS:
			return state;
		case SORT_COINS:
			const sortedCoins = _.orderBy(state, [action.primarySort], [action.secondarySort]);
			return {
				sort: {
					primary: action.primarySort,
					secondary: action.secondarySort
				},
				list: [...sortedCoins]
			};
		default:
			return state;
	}
}
