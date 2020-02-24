import {
  CREATE_ICON,
  CREATE_ICON_FAIL,
  CREATE_ICON_SUCCESS,
} from '../../constants/actions/icon/createIcon';

export const createIcon = ({ icon }) => ({
  type: CREATE_ICON,
  options: {
    icon,
  }
});

export const createIconSuccess = ({ dataIcon }, options) => ({
  type: CREATE_ICON_SUCCESS,
  options,
  data: {
    dataIcon,
  },
});

export const createIconFail = (error, options) => ({
  type: CREATE_ICON_FAIL,
  options,
  error,
});