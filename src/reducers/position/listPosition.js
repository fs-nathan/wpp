import {
  LIST_POSITION,
  LIST_POSITION_SUCCESS,
  LIST_POSITION_FAIL,
} from '../../constants/actions/position/listPosition';
import { 
  CREATE_POSITION_SUCCESS 
} from '../../constants/actions/position/createPosition';
import { concat, findIndex, get, remove } from 'lodash';
import { UPDATE_POSITION_SUCCESS } from '../../constants/actions/position/updatePosition';
import { DELETE_POSITION_SUCCESS } from '../../constants/actions/position/deletePosition';

export const initialState = {
  data: {
    positions: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
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
    case CREATE_POSITION_SUCCESS: {
      let newPositions = concat(state.data.positions, action.data.position);
      return {
        ...state,
        data: {
          ...state.data,
          positions: newPositions,
        }
      };
    }
    case UPDATE_POSITION_SUCCESS: {
      const index = findIndex(state.data.positions, { id: get(action.data.position, 'positionId') });
      let newPositions = [...state.data.positions];
      newPositions[index] = {
        ...state.data.positions[index],
        ...action.data.position,
      };
      return {
        ...state,
        data: {
          ...state.data,
          positions: newPositions,
        }
      };
    }
    case DELETE_POSITION_SUCCESS: {
      let newPositions = state.data.positions;
      remove(newPositions, { id: get(action.options, 'positionId') });
      return {
        ...state,
        data: {
          ...state.data,
          positions: newPositions,
        }
      };
    }
    default:
      return state;
  }
}

export default reducer;