import {
  CREATE_ICON,
  CREATE_ICON_SUCCESS,
  CREATE_ICON_FAIL,
} from '../../constants/actions/icon/createIcon';

export const initialState = {
  data: {
    dataIcon: null,  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ICON:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_ICON_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_ICON_FAIL:
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