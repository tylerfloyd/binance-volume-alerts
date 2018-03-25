import _ from 'lodash';

import {
  RECIEVED_COINS,
  REQUESTED_COINS,
  FAILED_COINS
} from '../actions/coins';

export default function coinsReducer(state = {}, action) {
  switch (action.type) {
    case RECIEVED_COINS:
      console.log('RECIEVED_COINS Action');
      const coins = _.orderBy(action.coins, ['updated'], ['desc']);
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
    default:
      return state;
  }
}
