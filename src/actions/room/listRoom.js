import {
  LIST_ROOM,
  LIST_ROOM_SUCCESS,
  LIST_ROOM_FAIL,
} from '../../constants/actions/room/listRoom';

export const listRoom = () => ({
  type: LIST_ROOM,
});

export const listRoomSuccess = ({ rooms }) => ({
  type: LIST_ROOM_SUCCESS,
  data: {
    rooms,
  },
});

export const listRoomFail = (error) => ({
  type: LIST_ROOM_FAIL,
  error: error,
});