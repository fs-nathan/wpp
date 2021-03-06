import { DETAIL_PROJECT_GROUP, DETAIL_PROJECT_GROUP_FAIL, DETAIL_PROJECT_GROUP_RESET, DETAIL_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/detailProjectGroup';

export const initialState = {
  data: {
    projectGroup: null,
  },
  error: null,
  loading: false,
  firstTime: true,
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
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case DETAIL_PROJECT_GROUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case DETAIL_PROJECT_GROUP_RESET:
      return initialState;
    /*
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
    */
    default:
      return state;
  }
}

export default reducer;