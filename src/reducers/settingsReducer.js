import { CHANGE_VIEW, TOGGLE_TOUR } from '../actions/settings';

const initialState = {
	compact: false,
	tourOpen: false
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
		default:
			return state;
	}
}
