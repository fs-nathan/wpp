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

export const createPositionSuccess = ({ position }) => ({
  type: CREATE_POSITION_SUCCESS,
  data: {
    position,
  },
});

export const createPositionFail = (error) => ({
  type: CREATE_POSITION_FAIL,
  error: error,
});