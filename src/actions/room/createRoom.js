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

export const createRoomSuccess = ({ room }) => ({
  type: CREATE_ROOM_SUCCESS,
  data: {
    room,
  },
});

export const createRoomFail = (error) => ({
  type: CREATE_ROOM_FAIL,
  error: error,
});