import { LIST_ICON, LIST_ICON_FAIL, LIST_ICON_RESET, LIST_ICON_SUCCESS } from '../../constants/actions/icon/listIcon';

export const listIcon = (quite = false) => ({
  type: LIST_ICON,
  quite,
});

export const listIconSuccess = ({ icons, defaults }, options) => ({
  type: LIST_ICON_SUCCESS,
  options,
  data: {
    icons,
    defaults,
  },
});

export const listIconFail = (error, options) => ({
  type: LIST_ICON_FAIL,
  options,
  error,
});

export const listIconReset = () => ({
  type: LIST_ICON_RESET,
});