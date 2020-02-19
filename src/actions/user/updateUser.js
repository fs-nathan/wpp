import {
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from '../../constants/actions/user/updateUser';

export const updateUser = ({ userId, roomId, positionId, levelId, majorId, description }) => ({
  type: UPDATE_USER,
  options: {
    userId,
    roomId,
    positionId,
    levelId,
    majorId,
    description,
  },
});

export const updateUserSuccess = (options) => ({
  type: UPDATE_USER_SUCCESS,
  options,
});

export const updateUserFail = (error, options) => ({
  type: UPDATE_USER_FAIL,
  options,
  error,
});