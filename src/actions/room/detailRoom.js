import {
  DETAIL_ROOM,
  DETAIL_ROOM_FAIL,
  DETAIL_ROOM_SUCCESS,
  DETAIL_ROOM_RESET,
} from '../../constants/actions/room/detailRoom';

export const detailRoom = ({ roomId }, quite = false) => ({
  type: DETAIL_ROOM,
  quite,
  options: {
    roomId,
  },
});

export const detailRoomSuccess = ({ room }, options) => ({
  type: DETAIL_ROOM_SUCCESS,
  options,
  data: {
    room,
  },
});

export const detailRoomFail = (error, options) => ({
  type: DETAIL_ROOM_FAIL,
  options,
  error,
});

export const detailRoomReset = () => ({
  type: DETAIL_ROOM_RESET,
})