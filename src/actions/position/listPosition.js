import {
  LIST_POSITION,
  LIST_POSITION_SUCCESS,
  LIST_POSITION_FAIL,
} from '../../constants/actions/position/listPosition';

export const listPosition = (quite = false) => ({
  type: LIST_POSITION,
  quite,
});

export const listPositionSuccess = ({ positions }) => ({
  type: LIST_POSITION_SUCCESS,
  data: {
    positions,
  },
});

export const listPositionFail = (error) => ({
  type: LIST_POSITION_FAIL,
  error: error,
});