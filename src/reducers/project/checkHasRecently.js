import {
  CHECK_HAS_RECENTLY_PROJECT,
  CHECK_HAS_RECENTLY_PROJECT_SUCCESS
} from '../../constants/actions/project/listProject';

export const initialState = {
  hasRecently: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_HAS_RECENTLY_PROJECT:
      return {...state };
    case CHECK_HAS_RECENTLY_PROJECT_SUCCESS:
      return {
        ...state,
        hasRecently: action.isHas
      }
    default:
      return state;
  }
}

export default reducer;