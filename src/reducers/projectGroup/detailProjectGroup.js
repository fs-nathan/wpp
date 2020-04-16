import { get } from 'lodash';
import { DETAIL_PROJECT_GROUP, DETAIL_PROJECT_GROUP_FAIL, DETAIL_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/detailProjectGroup';
import { EDIT_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/editProjectGroup';

export const initialState = {
  data: {
    projectGroup: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_PROJECT_GROUP:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DETAIL_PROJECT_GROUP_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_PROJECT_GROUP_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    case EDIT_PROJECT_GROUP_SUCCESS: {
      let newProjectGroup = state.data.projectGroup;
      if (get(newProjectGroup, 'id') === get(action.data, 'projectGroup.id')) {
        newProjectGroup = {
          ...newProjectGroup,
          ...get(action.data, 'projectGroup'),
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          projectGroup: newProjectGroup,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;