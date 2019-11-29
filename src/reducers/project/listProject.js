import {
  LIST_PROJECT,
  LIST_PROJECT_SUCCESS,
  LIST_PROJECT_FAIL,
} from '../../constants/actions/project/listProject';
import { get, findIndex, remove, slice, concat } from 'lodash';
import { UPDATE_PROJECT } from '../../constants/actions/project/updateProject';
import { DELETE_PROJECT } from '../../constants/actions/project/deleteProject';
import { HIDE_PROJECT } from '../../constants/actions/project/hideProject';
import { SORT_PROJECT } from '../../constants/actions/project/sortProject';

export const initialState = {
  data: {
    projects: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  let projects = [];
  let index = -1;
  let removed = null;
  switch (action.type) {
    case LIST_PROJECT:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_PROJECT_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_PROJECT:
      projects = [...state.data.projects];
      index = findIndex(projects, { id: get(action.options, 'projectId') });
      projects[index] = {
        ...projects[index],
        ...action.options,
      }
      return {
        ...state,
        data: {
          ...state.data,
          projects,
        },
      };
    case DELETE_PROJECT: 
      projects = [...state.data.projects];
      remove(projects, { id: get(action.options, 'projectId') });
      return {
        ...state,
        data: {
          ...state.data,
          projects,
        },
      };
    case HIDE_PROJECT: 
      projects = [...state.data.projects];
      index = findIndex(projects, { id: get(action.options, 'projectId') });
      projects[index] = {
        ...projects[index],
        visibility: false,
      };
      return {
        ...state,
        data: {
          ...state.data,
          projects,
        },
      };
    case SORT_PROJECT:
      projects = [...state.data.projects];
      removed = remove(projects, { id: get(action.options, 'projectId') });
      projects = [...slice(projects, 0, action.options.sortIndex), ...removed, ...slice(projects, action.options.sortIndex)];
      return {
        ...state,
        data: {
          ...state.data,
          projects,
        },
      };
    default:
      return state;
  }
}

export default reducer;