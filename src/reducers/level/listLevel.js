import { findIndex, get, remove } from 'lodash';
import { CREATE_LEVEL_SUCCESS } from '../../constants/actions/level/createLevel';
import { DELETE_LEVEL_SUCCESS } from '../../constants/actions/level/deleteLevel';
import { LIST_LEVEL, LIST_LEVEL_FAIL, LIST_LEVEL_SUCCESS } from '../../constants/actions/level/listLevel';
import { UPDATE_LEVEL_SUCCESS } from '../../constants/actions/level/updateLevel';

export const initialState = {
  data: {
    levels: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_LEVEL:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_LEVEL_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_LEVEL_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    case CREATE_LEVEL_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          levels: [...state.data.levels, action.data.level]
        }
      }
    case UPDATE_LEVEL_SUCCESS: {
      const index = findIndex(state.data.levels, { id: get(action.data, 'level.id') });
      let newLevels = state.data.levels;
      newLevels[index] = {
        ...newLevels[index],
        ...get(action.data, 'level')
      }
      return {
        ...state,
        data: {
          ...state.data,
          levels: newLevels
        }
      }
    }
    case DELETE_LEVEL_SUCCESS: {
      let newLevels = state.data.levels;
      remove(newLevels, { id: get(action.options, 'levelId') });
      return {
        ...state,
        data: {
          ...state.data,
          levels: newLevels
        }
      }
    }
    default:
      return state;
  }
}

export default reducer;