import {
  SORT_ROOM,
  SORT_ROOM_FAIL,
  SORT_ROOM_SUCCESS,
} from '../../constants/actions/room/sortRoom';

export const sortRoom = ({ roomId, sortIndex }) => ({
  type: SORT_ROOM,
  options: {
    roomId,
    sortIndex,
  },
});

export const sortRoomSuccess = (options) => ({
  type: SORT_ROOM_SUCCESS,
  options,
});

export const sortRoomFail = (error, options) => ({
  type: SORT_ROOM_FAIL,
  options,
  error,
});