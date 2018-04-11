import { CHANGE_VIEW, TOGGLE_TOUR } from '../actions/settings';

const initialState = {
	compact: false,
	tourOpen: false
};

export default function settingsReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_VIEW:
			console.log('CHANGE_VIEW Action');
			return state;
		case TOGGLE_TOUR:
			console.log('TOGGLE_TOUR Action');
			return {
				...state,
				tourOpen: !state.tourOpen
			};
		default:
			return state;
	}
}
