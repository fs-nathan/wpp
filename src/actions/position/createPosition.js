import {
  CREATE_POSITION,
  CREATE_POSITION_SUCCESS,
  CREATE_POSITION_FAIL,
} from '../../constants/actions/position/createPosition';

export const createPosition = ({ name, description }) => ({
  type: CREATE_POSITION,
  options: {
    name,
    description,
  }
});

export const createPositionSuccess = ({ position }, options) => ({
  type: CREATE_POSITION_SUCCESS,
  options,
  data: {
    position,
  },
});

export const createPositionFail = (error, options) => ({
  type: CREATE_POSITION_FAIL,
  options,
  error,
});