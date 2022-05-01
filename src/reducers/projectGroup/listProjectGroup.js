import { get, remove, slice } from "lodash";
import {
  LIST_PROJECT_GROUP,
  LIST_PROJECT_GROUP_FAIL,
  LIST_PROJECT_GROUP_RESET,
  LIST_PROJECT_GROUP_SUCCESS,
} from "../../constants/actions/projectGroup/listProjectGroup";
import {
  SORT_PROJECT_GROUP,
  SORT_PROJECT_GROUP_SUCCESS,
} from "../../constants/actions/projectGroup/sortProjectGroup";

export const initialState = {
  data: {
    projectGroups: [],
  },
  error: null,
  loading: false,
  firstTime: true,
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
        firstTime: false,
      };
    case LIST_PROJECT_GROUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case LIST_PROJECT_GROUP_RESET:
      return initialState;
    /*
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
    */
    case SORT_PROJECT_GROUP: {
      let newProjectGroups = [...state.data.projectGroups];

      const currentDestinationGroupIndex = newProjectGroups.findIndex(
        (ele) => ele.sort_index === action.options.sortIndex
      );
      const currentSourceGroupIndex = newProjectGroups.findIndex(
        (ele) => ele.id === get(action.options, "projectGroupId")
      );

      const removed = newProjectGroups.splice(currentSourceGroupIndex, 1)[0];

      newProjectGroups.splice(currentDestinationGroupIndex, 0, removed);
      return {
        ...state,
        data: {
          ...state.data,
          projectGroups: newProjectGroups,
        },
      };
    }
    case SORT_PROJECT_GROUP_SUCCESS:
      return state;
    default:
      return state;
  }
}

export default reducer;
