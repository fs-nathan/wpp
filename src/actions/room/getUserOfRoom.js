import {
  GET_USER_OF_ROOM,
  GET_USER_OF_ROOM_SUCCESS,
  GET_USER_OF_ROOM_FAIL,
  GET_USER_OF_ROOM_RESET,
  FILTER_USER_OF_GROUP_SUCCESS,
} from '../../constants/actions/room/getUserOfRoom';

export const getUserOfRoom = ({ roomId }, quite = false) => ({
  type: GET_USER_OF_ROOM,
  quite,
  options: {
    roomId,
  },
});

export const getUserOfRoomSuccess = ({ users }, options) => ({
  type: GET_USER_OF_ROOM_SUCCESS,
  options,
  data: {
    users,
  },
});
export const filterUserOfRoomSuccess = ({users}, options ) => ({
  type: FILTER_USER_OF_GROUP_SUCCESS,
  options,
  data: {
    users,
  },
});
export const getUserOfRoomFail = (error, options) => ({
  type: GET_USER_OF_ROOM_FAIL,
  options,
  error,
});

export const getUserOfRoomReset = () => ({
  type: GET_USER_OF_ROOM_RESET,
});