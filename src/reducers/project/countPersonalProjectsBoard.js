import {
  COUNT_PERSONAL_PROJECTS_BOARD_SUCCESS,
  COUNT_PERSONAL_PROJECTS_BOARD
} from '../../constants/actions/project/listProject';

export const initialState = {
  projects: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case COUNT_PERSONAL_PROJECTS_BOARD:
      return {...state };
    case COUNT_PERSONAL_PROJECTS_BOARD_SUCCESS:
      return {
        ...state,
        projects: action.projects
      }
    default:
      return state;
  }
}

export default reducer;