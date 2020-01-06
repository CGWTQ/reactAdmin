import {fromJS} from 'immutable';
import * as constants from './actionTypes';

const defaultState = fromJS({
  data:[]
});

export default (state=defaultState, action) => {
  switch(action.type)
  {
    case constants.CAN_LIMITS:
      return state.set('data', fromJS(action.data));
    default:
      return state;         
  }
}
