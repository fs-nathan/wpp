import {
  LIST_PROJECT_GROUP,
  LIST_PROJECT_GROUP_SUCCESS,
  LIST_PROJECT_GROUP_FAIL,
} from '../../constants/actions/projectGroup/listProjectGroup';
import {
  EDIT_PROJECT_GROUP,
} from '../../constants/actions/projectGroup/editProjectGroup';
import {
  DELETE_PROJECT_GROUP,
} from '../../constants/actions/projectGroup/deleteProjectGroup';
import {
  SORT_PROJECT_GROUP,
} from '../../constants/actions/projectGroup/sortProjectGroup';
import { findIndex, get, remove, slice } from 'lodash';

export const initialState = {
  data: {
    projectGroups: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  let projectGroups = [];
  let index = -1;
  let removed = [];
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
    case EDIT_PROJECT_GROUP:
      projectGroups = [...state.data.projectGroups];
      index = findIndex(projectGroups, { id: get(action.options, 'projectGroupId') });
      projectGroups[index] = {
        ...projectGroups[index],
        ...action.options,
      };
      return {
        ...state,
        data: {
          ...state.data,
          projectGroups,
        },
      };
    case DELETE_PROJECT_GROUP:
      projectGroups = [...state.data.projectGroups];
      remove(projectGroups, { id: get(action.options, 'projectGroupId') });
      return {
        ...state,
        data: {
          ...state.data,
          projectGroups,
        },
      };
    case SORT_PROJECT_GROUP: 
      projectGroups = [...state.data.projectGroups];
      removed = remove(projectGroups, { id: get(action.options, 'projectGroupId') });
      projectGroups = [...slice(projectGroups, 0, action.options.sortIndex), ...removed, ...slice(projectGroups, action.options.sortIndex)];
      return {
        ...state,
        data: {
          ...state.data,
          projectGroups,
        },
      };
    default:
      return state;
  }
}

export default reducer;