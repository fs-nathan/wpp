import {
  CREATE_ROOM,
  CREATE_ROOM_FAIL,
  CREATE_ROOM_SUCCESS,
} from '../../constants/actions/room/createRoom';

export const createRoom = ({ name, icon, description, members }) => ({
  type: CREATE_ROOM,
  options: {
    name,
    icon,
    description,
    members,
  },
});

export const createRoomSuccess = ({ room }, options) => ({
  type: CREATE_ROOM_SUCCESS,
  options,
  data: {
    room,
  },
});

export const createRoomFail = (error, options) => ({
  type: CREATE_ROOM_FAIL,
  options,
  error,
});