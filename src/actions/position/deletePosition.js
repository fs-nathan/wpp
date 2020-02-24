import {
  DELETE_POSITION,
  DELETE_POSITION_SUCCESS,
  DELETE_POSITION_FAIL,
} from '../../constants/actions/position/deletePosition';

export const deletePosition = ({ positionId }) => ({
  type: DELETE_POSITION,
  options: {
    positionId,
  }
});

export const deletePositionSuccess = (options) => ({
  type: DELETE_POSITION_SUCCESS,
  options,
});

export const deletePositionFail = (error, options) => ({
  type: DELETE_POSITION_FAIL,
  options,
  error,
});