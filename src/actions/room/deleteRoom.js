import {
  DELETE_ROOM,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_SUCCESS,
} from '../../constants/actions/room/deleteRoom';

export const deleteRoom = ({ roomId }) => ({
  type: DELETE_ROOM,
  options: {
    roomId,
  },
});

export const deleteRoomSuccess = () => ({
  type: DELETE_ROOM_SUCCESS,
});

export const deleteRoomFail = (error) => ({
  type: DELETE_ROOM_FAIL,
  error: error,
});