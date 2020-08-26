import { UPDATE_NOTIFICATION_SETTING_SUCCESS, UPDATE_NOTIFICATION_SETTING_FAIL, UPDATE_NOTIFICATION_SETTING } from '../../../constants/actions/project/setting/updateNotificationSetting';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NOTIFICATION_SETTING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_NOTIFICATION_SETTING_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case UPDATE_NOTIFICATION_SETTING_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;