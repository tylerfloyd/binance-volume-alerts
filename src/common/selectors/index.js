import { createSelector } from 'reselect';

export const determineStatus = createSelector(
	(data = {}) => data.count,
	(data = {}) => data.positiveVolume,
	(count = 0, positiveVolume = false) => {
		const result = {
			percent: 0,
			color: 'red'
		};

		if (count > 0 && count < 3 && positiveVolume) {
			result.percent = 25;
			result.color = 'grey';
		} else if (count > 2 && count < 5 && positiveVolume) {
			result.percent = 50;
			result.color = 'yellow';
		} else if ((count > 4 && count < 10 && positiveVolume) || positiveVolume) {
			result.percent = 75;
			result.color = 'green';
		} else {
			result.percent = 100;
			result.color = 'red';
		}

		return result;
	}
);
