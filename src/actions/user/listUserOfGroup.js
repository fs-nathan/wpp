import {
  LIST_USER_OF_GROUP,
  LIST_USER_OF_GROUP_FAIL,
  LIST_USER_OF_GROUP_SUCCESS,
} from '../../constants/actions/user/listUserOfGroup';

export const listUserOfGroup = () => ({
  type: LIST_USER_OF_GROUP,
});

export const listUserOfGroupSuccess = ({ rooms }) => ({
  type: LIST_USER_OF_GROUP_SUCCESS,
  data: {
    rooms,
  },
});

export const listUserOfGroupFail = (error) => ({
  type: LIST_USER_OF_GROUP_FAIL,
  error: error,
});