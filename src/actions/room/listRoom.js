import {
  LIST_ROOM,
  LIST_ROOM_SUCCESS,
  LIST_ROOM_FAIL,
  LIST_ROOM_RESET,
} from '../../constants/actions/room/listRoom';

export const listRoom = (quite = false) => ({
  type: LIST_ROOM,
  quite,
});

export const listRoomSuccess = ({ rooms }, options) => ({
  type: LIST_ROOM_SUCCESS,
  options,
  data: {
    rooms,
  },
});

export const listRoomFail = (error, options) => ({
  type: LIST_ROOM_FAIL,
  options,
  error,
});

export const listRoomReset = () => ({
  type: LIST_ROOM_RESET,
});