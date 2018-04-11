export const CHANGE_VIEW = 'CHANGE_VIEW';
export const TOGGLE_TOUR = 'TOGGLE_TOUR';

export function changeView(isCompact) {
	return {
		type: CHANGE_VIEW,
		isCompact
	};
}

export function toggleTour(isOpen) {
	return {
		type: TOGGLE_TOUR,
		isOpen
	};
}
