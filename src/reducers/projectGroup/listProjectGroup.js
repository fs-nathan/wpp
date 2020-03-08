import {
  LIST_PROJECT_GROUP,
  LIST_PROJECT_GROUP_SUCCESS,
  LIST_PROJECT_GROUP_FAIL,
} from '../../constants/actions/projectGroup/listProjectGroup';
import {
  CREATE_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/createProjectGroup';
import {
  EDIT_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/editProjectGroup';
import {
  DELETE_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/deleteProjectGroup';
import {
  SORT_PROJECT_GROUP_SUCCESS,
} from '../../constants/actions/projectGroup/sortProjectGroup';
import { findIndex, get, remove, slice, concat } from 'lodash';

export const initialState = {
  data: {
    projectGroups: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PROJECT_GROUP:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_PROJECT_GROUP_SUCCESS: 
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_PROJECT_GROUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case CREATE_PROJECT_GROUP_SUCCESS: {
      const newProjectGroups = concat(state.data.projectGroups, get(action.data, 'projectGroup'));
      return {
        ...state,
        data: {
          ...state.data,
          projectGroups: newProjectGroups
        }
      }
    }
    case EDIT_PROJECT_GROUP_SUCCESS: {
      let newProjectGroups = state.data.projectGroups;
      const index = findIndex(newProjectGroups, { id: get(action.data, 'projectGroup.id') });
      newProjectGroups[index] = {
        ...newProjectGroups[index],
        ...get(action.data, 'projectGroup'),
      };
      return {
        ...state,
        data: {
          ...state.data,
          projectGroups: newProjectGroups,
        },
      };
    }
    case DELETE_PROJECT_GROUP_SUCCESS: {
      let newProjectGroups = state.data.projectGroups;
      remove(newProjectGroups, { id: get(action.options, 'projectGroupId') });
      return {
        ...state,
        data: {
          ...state.data,
          projectGroups: newProjectGroups,
        },
      };
    }
    case SORT_PROJECT_GROUP_SUCCESS: {
      let newProjectGroups = state.data.projectGroups;
      const removed = remove(newProjectGroups, { id: get(action.options, 'projectGroupId') });
      newProjectGroups = [
        ...slice(newProjectGroups, 0, action.options.sortIndex), 
        ...removed, 
        ...slice(newProjectGroups, action.options.sortIndex)
      ];
      return {
        ...state,
        data: {
          ...state.data,
          projectGroups: newProjectGroups,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;