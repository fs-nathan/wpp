import {
  CREATE_ROOM,
  CREATE_ROOM_FAIL,
  CREATE_ROOM_SUCCESS,
} from '../../constants/actions/room/createRoom';

export const createRoom = ({ name, icon, description }) => ({
  type: CREATE_ROOM,
  options: {
    name,
    icon,
    description,
  },
});

export const createRoomSuccess = ({ roomId }) => ({
  type: CREATE_ROOM_SUCCESS,
  data: {
    roomId,
  },
});

export const createRoomFail = (error) => ({
  type: CREATE_ROOM_FAIL,
  error: error,
});