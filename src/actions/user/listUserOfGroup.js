import {
  LIST_USER_OF_GROUP,
  LIST_USER_OF_GROUP_FAIL,
  LIST_USER_OF_GROUP_SUCCESS,
  LIST_USER_OF_GROUP_RESET,
} from '../../constants/actions/user/listUserOfGroup';

export const listUserOfGroup = (quite = false) => ({
  type: LIST_USER_OF_GROUP,
  quite,
});

export const listUserOfGroupSuccess = ({ rooms, maxUser }, options) => ({
  type: LIST_USER_OF_GROUP_SUCCESS,
  options,
  data: {
    rooms,
    maxUser,
  },
});

export const listUserOfGroupFail = (error, options) => ({
  type: LIST_USER_OF_GROUP_FAIL,
  options,
  error,
});

export const listUserOfGroupReset = () => ({
  type: LIST_USER_OF_GROUP_RESET,
});