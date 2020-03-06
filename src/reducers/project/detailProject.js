import {
  DETAIL_PROJECT,
  DETAIL_PROJECT_SUCCESS,
  DETAIL_PROJECT_FAIL,
} from '../../constants/actions/project/detailProject';
import { get } from 'lodash';
import { UPDATE_PROJECT_SUCCESS } from '../../constants/actions/project/updateProject';
import { HIDE_PROJECT_SUCCESS } from '../../constants/actions/project/hideProject';
import { SHOW_PROJECT_SUCCESS } from '../../constants/actions/project/showProject';

export const initialState = {
  data: {
    project: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_PROJECT:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DETAIL_PROJECT_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case UPDATE_PROJECT_SUCCESS: {
      let newProject = state.data.project;
      if (get(newProject, 'id') === get(action.data, 'project.id')) {
        newProject = {
          ...state.data.project,
          ...get(action.data, 'project'),
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          project: newProject,
        },
      };
    }
    case HIDE_PROJECT_SUCCESS: {
      let newProject = state.data.project;
      if (get(newProject, 'id') === get(action.options, 'projectId')) {
        newProject = {
          ...state.data.project,
          visibility: false,
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          project: newProject,
        },
      };
    }
    case SHOW_PROJECT_SUCCESS: {
      let newProject = state.data.project;
      if (get(newProject, 'id') === get(action.options, 'projectId')) {
        newProject = {
          ...state.data.project,
          visibility: true,
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          project: newProject,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;