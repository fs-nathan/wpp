import {
  DETAIL_ROOM,
  DETAIL_ROOM_FAIL,
  DETAIL_ROOM_SUCCESS,
} from '../../constants/actions/room/detailRoom';

export const detailRoom = ({ roomId }, quite = false) => ({
  type: DETAIL_ROOM,
  quite,
  options: {
    roomId,
  },
});

export const detailRoomSuccess = ({ room }) => ({
  type: DETAIL_ROOM_SUCCESS,
  data: {
    room,
  },
});

export const detailRoomFail = (error) => ({
  type: DETAIL_ROOM_FAIL,
  error: error,
});