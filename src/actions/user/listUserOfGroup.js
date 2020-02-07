import {
  LIST_USER_OF_GROUP,
  LIST_USER_OF_GROUP_FAIL,
  LIST_USER_OF_GROUP_SUCCESS,
} from '../../constants/actions/user/listUserOfGroup';

export const listUserOfGroup = (quite = false) => ({
  type: LIST_USER_OF_GROUP,
  quite,
});

export const listUserOfGroupSuccess = ({ rooms, maxUser }) => ({
  type: LIST_USER_OF_GROUP_SUCCESS,
  data: {
    rooms,
    maxUser,
  },
});

export const listUserOfGroupFail = (error) => ({
  type: LIST_USER_OF_GROUP_FAIL,
  error: error,
});