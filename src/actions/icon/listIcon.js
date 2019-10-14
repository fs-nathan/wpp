import {
  LIST_ICON,
  LIST_ICON_FAIL,
  LIST_ICON_SUCCESS,
} from '../../constants/actions/icon/listIcon';

export const listIcon = () => ({
  type: LIST_ICON,
});

export const listIconSuccess = ({ icons }) => ({
  type: LIST_ICON_SUCCESS,
  data: {
    icons,
  },
});

export const listIconFail = (error) => ({
  type: LIST_ICON_FAIL,
  error: error,
});