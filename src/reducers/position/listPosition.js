import {
  LIST_POSITION,
  LIST_POSITION_SUCCESS,
  LIST_POSITION_FAIL,
} from '../../constants/actions/position/listPosition';
import { 
  CREATE_POSITION_SUCCESS 
} from '../../constants/actions/position/createPosition';

import { concat, findIndex, get, remove } from 'lodash';
import { UPDATE_POSITION, UPDATE_POSITION_SUCCESS } from '../../constants/actions/position/updatePosition';
import { DELETE_POSITION } from '../../constants/actions/position/deletePosition';

export const initialState = {
  data: {
    positions: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  let positions = [];
  let index = 0;  
  switch (action.type) {
    case LIST_POSITION:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_POSITION_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_POSITION_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case CREATE_POSITION_SUCCESS: 
      positions = concat(state.data.positions, action.data.position);
      return {
        ...state,
        data: {
          positions,
        }
      };
    case UPDATE_POSITION: 
      positions = [...state.data.positions];
      index = findIndex(positions, { id: get(action.options, 'positionId') });
      positions[index] = {
        ...positions[index],
        ...action.options,
      };
      return {
        ...state,
        data: {
          positions,
        }
      };
    case UPDATE_POSITION_SUCCESS: 
      positions = [...state.data.positions];
      index = findIndex(positions, { id: get(action.data.position, 'positionId') });
      positions[index] = {
        ...positions[index],
        ...action.data.position,
      };
      return {
        ...state,
        data: {
          positions,
        }
      };
    case DELETE_POSITION: 
      positions = [...state.data.positions];
      remove(positions, { id: get(action.options, 'positionId') });
      return {
        ...state,
        data: {
          positions,
        }
      };
    default:
      return state;
  }
}

export default reducer;