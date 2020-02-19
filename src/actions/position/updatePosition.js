import {
  UPDATE_POSITION,
  UPDATE_POSITION_SUCCESS,
  UPDATE_POSITION_FAIL,
} from '../../constants/actions/position/updatePosition';

export const updatePosition = ({ positionId, name, description }) => ({
  type: UPDATE_POSITION,
  options: {
    positionId,
    name,
    description,
  }
});

export const updatePositionSuccess = ({ position }, options) => ({
  type: UPDATE_POSITION_SUCCESS,
  options,
  data: {
    position,
  }
});

export const updatePositionFail = (error, options) => ({
  type: UPDATE_POSITION_FAIL,
  options,
  error,
});