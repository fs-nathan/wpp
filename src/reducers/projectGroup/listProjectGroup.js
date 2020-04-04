import { concat, findIndex, get, remove, slice } from 'lodash';
import { CREATE_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/createProjectGroup';
import { DELETE_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/deleteProjectGroup';
import { EDIT_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/editProjectGroup';
import { LIST_PROJECT_GROUP, LIST_PROJECT_GROUP_FAIL, LIST_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/listProjectGroup';
import { SORT_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/sortProjectGroup';

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
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_PROJECT_GROUP_FAIL:
      return {
        ...state,
        ...initialState,
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