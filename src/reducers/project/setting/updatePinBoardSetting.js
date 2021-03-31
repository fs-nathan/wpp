import { UPDATE_PIN_BOARD_SETTING, UPDATE_PIN_BOARD_SETTING_SUCCESS, UPDATE_PIN_BOARD_SETTING_FAIL } from '../../../constants/actions/project/setting/updatePinBoardSetting';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PIN_BOARD_SETTING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_PIN_BOARD_SETTING_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case UPDATE_PIN_BOARD_SETTING_FAIL:
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