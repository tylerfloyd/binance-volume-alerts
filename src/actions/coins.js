import database from '../database';

export const RECIEVED_COINS = 'RECIEVED_COINS';
export const REQUESTED_COINS = 'REQUESTED_COINS';
export const FAILED_COINS = 'FAILED_COINS';

export function getCoins() {
  return dispatch => {
    dispatch(getCoinsRequested());
    return database.ref().on('value', snapshot => {
      const coins = snapshot.val().coins;
      dispatch(getCoinsFulfilled(coins));
    });
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
