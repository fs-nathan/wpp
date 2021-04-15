import {findIndex, get} from 'lodash';
import {HIDE_PROJECT_SUCCESS} from '../../constants/actions/project/hideProject';
import {
  LIST_PROJECT,
  LIST_PROJECT_FAIL,
  LIST_PROJECT_RESET,
  LIST_PROJECT_SELECT,
  LIST_PROJECT_SELECT_SUCCESS,
  LIST_PROJECT_SUCCESS
} from '../../constants/actions/project/listProject';
import {SHOW_PROJECT_SUCCESS} from '../../constants/actions/project/showProject';
import {SORT_PROJECT, SORT_PROJECT_SUCCESS} from '../../constants/actions/project/sortProject';

export const initialState = {
  data: {
    projects: [],
    projectsForSelect: [],
    summary: null,
  },
  error: null,
  loading: false,
  firstTime: true,
  isForSelect: false,
  selectLoading: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LIST_PROJECT_SELECT:
      return {
        ...state,
        error: null,
        selectLoading: true
      };
    case LIST_PROJECT_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case LIST_PROJECT_SELECT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          projectsForSelect: action.projects
        },
        error: null,
        loading: false,
        firstTime: false,
        selectLoading: false
      };
    case LIST_PROJECT_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case LIST_PROJECT_RESET:
      return initialState;
    case HIDE_PROJECT_SUCCESS: {
      let newProjects = state.data.projects;
      const index = findIndex(newProjects, { id: get(action.options, 'projectId') });
      newProjects[index] = {
        ...newProjects[index],
        visibility: false,
      }
      return {
        ...state,
        data: {
          ...state.data,
          projects: newProjects
        },
      };
    }
    case SHOW_PROJECT_SUCCESS: {
      let newProjects = state.data.projects;
      const index = findIndex(newProjects, { id: get(action.options, 'projectId') });
      newProjects[index] = {
        ...newProjects[index],
        visibility: true,
      }
      return {
        ...state,
        data: {
          ...state.data,
          projects: newProjects
        },
      };
    }
    case SORT_PROJECT:
    case SORT_PROJECT_SUCCESS: {
      let newProjects = action.options.sortData;
      return {
        ...state,
        data: {
          ...state.data,
          projects: newProjects
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;