import {
  GET_PROJECT_PERSONAL_BOARD,
  GET_PROJECT_PERSONAL_BOARD_FAIL,
  GET_PROJECT_PERSONAL_BOARD_SUCCESS
} from '../../constants/actions/project/projectOnPersonalBoard';

export const getProjectOnPersonalBoard = () => ({
  type: GET_PROJECT_PERSONAL_BOARD,
});

export const getProjectOnPersonalBoardSuccess = ({ projects }) => ({
  type: GET_PROJECT_PERSONAL_BOARD_SUCCESS,
  data: projects
});

export const getProjectOnPersonalBoardFail = (error) => ({
  type: GET_PROJECT_PERSONAL_BOARD_FAIL,
  error,
});