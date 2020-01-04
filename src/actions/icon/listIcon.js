import {
  LIST_ICON,
  LIST_ICON_FAIL,
  LIST_ICON_SUCCESS,
} from '../../constants/actions/icon/listIcon';

export const listIcon = (quite = false) => ({
  type: LIST_ICON,
  quite,
});

export const listIconSuccess = ({ icons, defaults }) => ({
  type: LIST_ICON_SUCCESS,
  data: {
    icons,
    defaults,
  },
});

export const listIconFail = (error) => ({
  type: LIST_ICON_FAIL,
  error: error,
});