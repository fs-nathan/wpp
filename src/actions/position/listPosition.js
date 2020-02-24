import {
  LIST_POSITION,
  LIST_POSITION_SUCCESS,
  LIST_POSITION_FAIL,
  LIST_POSITION_RESET,
} from '../../constants/actions/position/listPosition';

export const listPosition = (quite = false) => ({
  type: LIST_POSITION,
  quite,
});

export const listPositionSuccess = ({ positions }, options) => ({
  type: LIST_POSITION_SUCCESS,
  options,
  data: {
    positions,
  },
});

export const listPositionFail = (error, options) => ({
  type: LIST_POSITION_FAIL,
  options,
  error,
});

export const listPositionReset = () => ({
  type: LIST_POSITION_RESET,
})