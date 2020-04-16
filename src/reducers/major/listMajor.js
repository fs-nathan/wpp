import { findIndex, get, remove } from 'lodash';
import { CREATE_MAJOR_SUCCESS } from '../../constants/actions/major/createMajor';
import { DELETE_MAJOR_SUCCESS } from '../../constants/actions/major/deleteMajor';
import { LIST_MAJOR, LIST_MAJOR_FAIL, LIST_MAJOR_SUCCESS } from '../../constants/actions/major/listMajor';
import { UPDATE_MAJOR_SUCCESS } from '../../constants/actions/major/updateMajor';

export const initialState = {
  data: {
    majors: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_MAJOR:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_MAJOR_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_MAJOR_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    case CREATE_MAJOR_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          majors: [...state.data.majors, action.data.major]
        }
      }
    case UPDATE_MAJOR_SUCCESS: {
      const index = findIndex(state.data.majors, { id: get(action.data, 'major.id') });
      let newLevels = state.data.majors;
      newLevels[index] = {
        ...newLevels[index],
        ...get(action.data, 'major')
      }
      return {
        ...state,
        data: {
          ...state.data,
          majors: newLevels
        }
      }
    }
    case DELETE_MAJOR_SUCCESS: {
      let newLevels = state.data.majors;
      remove(newLevels, { id: get(action.options, 'majorId') });
      return {
        ...state,
        data: {
          ...state.data,
          majors: newLevels
        }
      }
    }
    default:
      return state;
  }
}

export default reducer;