import database from '../common/data/database';

export const RECIEVED_COINS = 'RECIEVED_COINS';
export const REQUESTED_COINS = 'REQUESTED_COINS';
export const FAILED_COINS = 'FAILED_COINS';
export const SORT_COINS = 'SORT_COINS';

export function getCoins() {
	return dispatch => {
		/**
		 * Because Firebase has eventual consistency, tell the reducer
		 * that we got the request, but nothing else until we get our promise
		 */
		dispatch(getCoinsRequested());
		return database.ref().on('value', snapshot => {
			/**
			 * Once we have our promise, then tell the reducer
			 */
			const coins = snapshot.val().coins;
			dispatch(getCoinsFulfilled(coins));
		});
	};
}

export function sortCoins(data) {
	return {
		type: SORT_COINS,
		...data
	};
}

function getCoinsRequested() {
	return {
		type: REQUESTED_COINS
	};
}

function getCoinsFulfilled(coins) {
	return {
		type: RECIEVED_COINS,
		coins
	};
}

function getCoinsFailed() {
	return {
		type: FAILED_COINS
	};
}
