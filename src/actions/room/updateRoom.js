import {
  UPDATE_ROOM,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_SUCCESS,
} from '../../constants/actions/room/updateRoom';

export const updateRoom = ({ roomId, name, icon, description, members }) => ({
  type: UPDATE_ROOM,
  options: {
    roomId,
    name,
    icon,
    description,
    members,
  },
});

export const updateRoomSuccess = ({ room }, options) => ({
  type: UPDATE_ROOM_SUCCESS,
  options,
  data: {
    room,
  }
});

export const updateRoomFail = (error, options) => ({
  type: UPDATE_ROOM_FAIL,
  options,
  error,
});