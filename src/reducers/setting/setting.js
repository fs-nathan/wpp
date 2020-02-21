import * as actionTypes from '../../constants/actions/setting/setting';
import { SETTING_ACCOUNT, SETTING_GROUP } from '../../constants/constants';
import { COLOR_ACTIVE } from '../../constants/actions/system/system';

export const initialState = {
  isLoading: false,
  settingAccountType: SETTING_ACCOUNT.INFO,
  settingGroupType: SETTING_GROUP.INFO,
  notificationSelected: {},
  colors: [
    { color: localStorage.getItem(COLOR_ACTIVE) || '#01b374', selected: true }
  ],
  settingDate: [{ date_format: 'DD/MM/YYYY', selected: true }],
  orders: [],
  bill: {},
  groupDetail: {}
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOADING:
      return { ...state, isLoading: action.payload };
    case actionTypes.CHANGE_SETTING_ACCOUNT:
      return { ...state, settingAccountType: action.payload };
    case actionTypes.CHANGE_SETTING_GROUP:
      return { ...state, settingGroupType: action.payload };
    case actionTypes.SELECTED_NOTIFICATION:
      return { ...state, notificationSelected: action.payload };
    case actionTypes.FETCH_ORDER_LIST:
      return { ...state, orders: action.payload };
    case actionTypes.FETCH_BILL:
      return { ...state, bill: action.payload };
    case actionTypes.SETTING_HIDE_LOADING:
      return { ...state, isLoading: false };
    case actionTypes.FETCH_GROUP_DETAIL:
      return { ...state, isLoading: !action.quite };
    case actionTypes.FETCH_GROUP_DETAIL_SUCCESS:
      return { ...state, groupDetail: action.payload, isLoading: false };
    case actionTypes.FETCH_LIST_COLOR_GROUP_SUCCESS:
      return { ...state, colors: action.payload };
    case actionTypes.GET_SETTING_DATE_SUCCESS:
      return { ...state, settingDate: action.payload };
    default:
      return state;
  }
};

export default settingReducer;
