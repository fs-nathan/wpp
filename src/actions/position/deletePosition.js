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

export const deletePositionSuccess = () => ({
  type: DELETE_POSITION_SUCCESS,
});

export const deletePositionFail = (error) => ({
  type: DELETE_POSITION_FAIL,
  error: error,
});