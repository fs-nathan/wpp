import {
  UPDATE_ROOM,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_SUCCESS,
} from '../../constants/actions/room/updateRoom';

export const updateRoom = ({ roomId, name, icon, description }) => ({
  type: UPDATE_ROOM,
  options: {
    roomId,
    name,
    icon,
    description,
  },
});

export const updateRoomSuccess = () => ({
  type: UPDATE_ROOM_SUCCESS,
});

export const updateRoomFail = (error) => ({
  type: UPDATE_ROOM_FAIL,
  error: error,
});