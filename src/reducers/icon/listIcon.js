import {
  LIST_ICON,
  LIST_ICON_SUCCESS,
  LIST_ICON_FAIL,
} from '../../constants/actions/icon/listIcon';

export const initialState = {
  data: {
    icons: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_ICON:
      return {
        ...state,
        error: null,
        loading: true,
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
    default:
      return state;
  }
}

export default reducer;