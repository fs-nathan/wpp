import { get, remove } from 'lodash';
import { CREATE_ICON_SUCCESS } from '../../constants/actions/icon/createIcon';
import { DELETE_ICON_SUCCESS } from '../../constants/actions/icon/deleteIcon';
import { LIST_ICON, LIST_ICON_FAIL, LIST_ICON_RESET, LIST_ICON_SUCCESS } from '../../constants/actions/icon/listIcon';

export const initialState = {
  data: {
    icons: [],
    defaults: [],
  },
  error: null,
  loading: false,
  firstTime: true,
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
        firstTime: false,
      };
    case LIST_ICON_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case DELETE_ICON_SUCCESS:
      icons = [...state.data.icons];
      remove(icons, { id: get(action.options, 'iconId') });
      return {
        ...state,
        data: {
          ...state.data,
          icons,
        },
      };
    case LIST_ICON_RESET:
      return initialState;
    case CREATE_ICON_SUCCESS:
      icons = [...state.data.icons, {
        ...get(action.data, 'dataIcon'),
        url_full: get(action.data, 'dataIcon.url')
      }];
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