import { CHECK_VERIFY_ACCOUNT, CHECK_VERIFY_ACCOUNT_FAIL, CHECK_VERIFY_ACCOUNT_SUCCESS, DETAIL_USER, DETAIL_USER_FAIL, DETAIL_USER_SUCCESS, GET_USER_INFOR, GET_USER_INFOR_FAIL, GET_USER_INFOR_SUCCESS } from '../../constants/actions/user/detailUser';

export const initialState = {
  data: {
    user: null,
  },
  dataVerify: null,
  error: null,
  loading: false,
  firstTime: true,
  userInfor: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_USER:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DETAIL_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case DETAIL_USER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };

    case CHECK_VERIFY_ACCOUNT: 
    return {
      ...state,
      loading: true
    } 
    case CHECK_VERIFY_ACCOUNT_SUCCESS: 
  
    return {
      ...state,
      loading: false,
      dataVerify: action.data
    }
    case CHECK_VERIFY_ACCOUNT_FAIL: 
    return {
      ...state,
      loading: false,
      error: action.error
    }
    case GET_USER_INFOR: 
  
    return {
      ...state,
      loading: true,
    }
    case GET_USER_INFOR_SUCCESS: 
    return {
      ...state,
      loading: false,
      userInfor: action.data
    }
    case GET_USER_INFOR_FAIL: 
    return {
      ...state,
      loading: false,
      error: action.error
    }
    default:
      return state;
  }
}

export default reducer;