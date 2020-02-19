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

export const deleteRoomSuccess = (options) => ({
  type: DELETE_ROOM_SUCCESS,
  options,
});

export const deleteRoomFail = (error, options) => ({
  type: DELETE_ROOM_FAIL,
  options,
  error,
});