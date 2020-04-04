import { concat, findIndex, get, remove } from 'lodash';
import { COPY_PROJECT_SUCCESS } from '../../constants/actions/project/copyProject';
import { CREATE_PROJECT_SUCCESS } from '../../constants/actions/project/createProject';
import { DELETE_PROJECT_SUCCESS } from '../../constants/actions/project/deleteProject';
import { HIDE_PROJECT_SUCCESS } from '../../constants/actions/project/hideProject';
import { LIST_PROJECT, LIST_PROJECT_FAIL, LIST_PROJECT_SUCCESS } from '../../constants/actions/project/listProject';
import { UPDATE_STATUS_COPY_SUCCESS } from '../../constants/actions/project/setting/updateStatusCopy';
import { SHOW_PROJECT_SUCCESS } from '../../constants/actions/project/showProject';
import { SORT_PROJECT_SUCCESS } from '../../constants/actions/project/sortProject';
import { UPDATE_PROJECT_SUCCESS } from '../../constants/actions/project/updateProject';

export const initialState = {
  data: {
    projects: [],
    summary: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
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
        ...initialState,
        error: action.error,
        loading: false,
      };
    case CREATE_PROJECT_SUCCESS: {
      let newProjects = concat(state.data.projects, action.data.project);
      return {
        ...state,
        data: {
          ...state.data,
          projects: newProjects
        }
      }
    }
    case COPY_PROJECT_SUCCESS: {
      let newProjects = concat(state.data.projects, action.data.project);
      return {
        ...state,
        data: {
          ...state.data,
          projects: newProjects
        }
      }
    }
    case UPDATE_PROJECT_SUCCESS: {
      let newProjects = state.data.projects;
      const index = findIndex(newProjects, { id: get(action.data, 'project.id') });
      newProjects[index] = {
        ...newProjects[index],
        ...get(action.data, 'project'),
      }
      return {
        ...state,
        data: {
          ...state.data,
          projects: newProjects
        },
      };
    }
    case DELETE_PROJECT_SUCCESS: {
      let newProjects = state.data.projects;
      remove(newProjects, { id: get(action.options, 'projectId') });
      return {
        ...state,
        data: {
          ...state.data,
          projects: newProjects
        },
      };
    }
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
    case UPDATE_STATUS_COPY_SUCCESS: {
      let newProjects = state.data.projects;
      const index = findIndex(newProjects, { id: get(action.options, 'projectId') });
      newProjects[index] = {
        ...newProjects[index],
        can_copy: get(action.options, 'status'),
      }
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