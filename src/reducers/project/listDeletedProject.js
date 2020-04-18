import { get, remove } from 'lodash';
import { DELETE_TRASH_PROJECT_SUCCESS } from '../../constants/actions/project/deleteTrashProject';
import { LIST_DELETED_PROJECT, LIST_DELETED_PROJECT_FAIL, LIST_DELETED_PROJECT_RESET, LIST_DELETED_PROJECT_SUCCESS } from '../../constants/actions/project/listDeletedProject';
import { RESTORE_TRASH_PROJECT_SUCCESS } from '../../constants/actions/project/restoreTrashProject';

export const initialState = {
  data: {
    projects: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_DELETED_PROJECT:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_DELETED_PROJECT_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_DELETED_PROJECT_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    case LIST_DELETED_PROJECT_RESET:
      return initialState;
    case DELETE_TRASH_PROJECT_SUCCESS:
    case RESTORE_TRASH_PROJECT_SUCCESS: {
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
    default:
      return state;
  }
}

export default reducer;