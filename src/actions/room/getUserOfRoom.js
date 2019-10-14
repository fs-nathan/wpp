import {
  GET_USER_OF_ROOM,
  GET_USER_OF_ROOM_SUCCESS,
  GET_USER_OF_ROOM_FAIL,
} from '../../constants/actions/room/getUserOfRoom';

export const getUserOfRoom = ({ roomId }) => ({
  type: GET_USER_OF_ROOM,
  options: {
    roomId,
  },
});

export const getUserOfRoomSuccess = ({ users }) => ({
  type: GET_USER_OF_ROOM_SUCCESS,
  data: {
    users,
  },
});

export const getUserOfRoomFail = (error) => ({
  type: GET_USER_OF_ROOM_FAIL,
  error: error,
});