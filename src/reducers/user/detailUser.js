import { CHECK_VERIFY_ACCOUNT, CHECK_VERIFY_ACCOUNT_FAIL, CHECK_VERIFY_ACCOUNT_SUCCESS, DETAIL_USER, DETAIL_USER_FAIL, DETAIL_USER_SUCCESS, GET_USER_INFOR, GET_USER_INFOR_FAIL, GET_USER_INFOR_SUCCESS, UPDATE_ACCOUNT, UPDATE_ACCOUNT_SUCCESS,UPDATE_ACCOUNT_FAIL } from '../../constants/actions/user/detailUser';

export const initialState = {
  data: {
    user: null,
  },
  dataVerify: null,
  error: null,
  loading: false,
  firstTime: true,
  userInfor: null,
  update_account: null
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
      error: action.payload.message
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
      userInfor: action.payload
    }
    case GET_USER_INFOR_FAIL: 
    return {
      ...state,
      loading: false,
      error: action.error
    }
    case UPDATE_ACCOUNT: 
  
    return {
      ...state,
      loading: true,
    }
    case UPDATE_ACCOUNT_SUCCESS: 
    console.log(`action`, action);
    return {
      ...state,
      loading: false,
      update_account: action.payload.state
    }
    case UPDATE_ACCOUNT_FAIL: 
    return {
      ...state,
      loading: false,
      error: action.payload
    }
    default:
      return state;
  }
}

export default reducer;