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

export const createIconSuccess = ({ dataIcon }) => ({
  type: CREATE_ICON_SUCCESS,
  data: {
    dataIcon,
  },
});

export const createIconFail = (error) => ({
  type: CREATE_ICON_FAIL,
  error: error,
});