import {
  COUNT_PERSONAL_PROJECTS_BOARD_SUCCESS,
  COUNT_PERSONAL_PROJECTS_BOARD
} from '../../constants/actions/project/listProject';

export const initialState = {
  numberOfProjects: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case COUNT_PERSONAL_PROJECTS_BOARD:
      return {...state };
    case COUNT_PERSONAL_PROJECTS_BOARD_SUCCESS:
      return {
        ...state,
        numberOfProjects: action.numberOfProjects
      }
    default:
      return state;
  }
}

export default reducer;