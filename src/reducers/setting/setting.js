import * as actionTypes from '../../constants/actions/setting/setting';
import { SETTING_ACCOUNT, SETTING_GROUP } from '../../constants/constants';

const THEME_COLOR_KEY = 'wp-theme-colors';
let theme_colors = [];
if (!localStorage.getItem(THEME_COLOR_KEY)) {
  theme_colors = [
    { value: '#01b374', selected: true },
    { value: '#f35700', selected: false },
    { value: '#c62db9', selected: false },
    { value: '#2db7c6', selected: false },
    { value: '#0076f3', selected: false },
    { value: '#c62d60', selected: false },
    { value: '#5a5a5a', selected: false },
    { value: '#4b41b1', selected: false },
    { value: '#009cf3', selected: false },
    { value: '#2dc63a', selected: false },
    { value: '#c63c2d', selected: false },
    { value: '#f37c00', selected: false },
    { value: '#2dbbc6', selected: false },
    { value: '#8f44c8', selected: false }
  ];
  localStorage.setItem(THEME_COLOR_KEY, JSON.stringify(theme_colors));
}

export const initialState = {
  settingAccountType: SETTING_ACCOUNT.INFO,
  settingGroupType: SETTING_GROUP.INFO,
  notificationSelected: {},
  colors: JSON.parse(localStorage.getItem(THEME_COLOR_KEY)) || theme_colors,
  breadCrumbs: []
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SETTING_ACCOUNT:
      return { ...state, settingAccountType: action.payload };
    case actionTypes.CHANGE_SETTING_GROUP:
      return { ...state, settingGroupType: action.payload };
    case actionTypes.SELECTED_NOTIFICATION:
      return { ...state, notificationSelected: action.payload };
    case actionTypes.CHANGE_BACKGROUND_MENU: {
      localStorage.setItem(THEME_COLOR_KEY, JSON.stringify(action.payload));
      return { ...state, colors: action.payload };
    }
    case actionTypes.CHANGE_DOCUMENT_BREAD_CRUMBS:
      return { ...state, breadCrumbs: action.payload };
    default:
      return state;
  }
};

export default settingReducer;
