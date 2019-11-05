import {
  LIST_ICON,
  LIST_ICON_SUCCESS,
  LIST_ICON_FAIL,
} from '../../constants/actions/icon/listIcon';
import { DELETE_ICON } from '../../constants/actions/icon/deleteIcon';
import { remove, get, concat, } from 'lodash';
import { CREATE_ICON_SUCCESS } from '../../constants/actions/icon/createIcon';

export const initialState = {
  data: {
    icons: [],  
    defaults: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  let icons = [];
  switch (action.type) {
    case LIST_ICON:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_ICON_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_ICON_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case DELETE_ICON:
      icons = [...state.data.icons];
      remove(icons, { id: get(action.options, 'iconId') });
      return {
        ...state,
        data: {
          ...state.data,
          icons,
        },
      };
    default:
      return state;
  }
}

export default reducer;