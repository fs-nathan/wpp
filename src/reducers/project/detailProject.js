import {
  DETAIL_PROJECT,
  DETAIL_PROJECT_SUCCESS,
  DETAIL_PROJECT_FAIL,
} from '../../constants/actions/project/detailProject';
import { get } from 'lodash';
import { UPDATE_PROJECT } from '../../constants/actions/project/updateProject';
import { HIDE_PROJECT } from '../../constants/actions/project/hideProject';

export const initialState = {
  data: {
    project: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  let project = null;
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
    case UPDATE_PROJECT:
      project = state.data.project;
      if (get(project, 'id') === get(action.options, 'projectId')) {
        project = {
          ...project,
          ...action.options,
        };
      };
      return {
        ...state,
        data: {
          ...state.data,
          project,
        },
      };
    case HIDE_PROJECT:
      project = state.data.project;
      if (get(project, 'id') === get(action.options, 'projectId')) {
        project = {
          ...project,
          visibility: false,
        };
      };
      return {
        ...state,
        data: {
          ...state.data,
          project,
        },
      };
    default:
      return state;
  }
}

export default reducer;