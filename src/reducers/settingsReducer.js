import { CHANGE_VIEW, TOGGLE_TOUR } from '../actions/settings';
import { RECIEVED_COINS, REQUESTED_COINS } from '../actions/coins';

const initialState = {
	compact: false,
	tourOpen: false,
	pendingCoins: false
};

export default function settingsReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_VIEW:
			return {
				...state,
				compact: !state.compact
			};
		case TOGGLE_TOUR:
			return {
				...state,
				tourOpen: !state.tourOpen
			};
		case REQUESTED_COINS:
			return {
				...state,
				pendingCoins: true
			};
		case RECIEVED_COINS:
			return {
				...state,
				pendingCoins: false
			};
		default:
			return state;
	}
}
