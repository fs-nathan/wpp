import { call, put } from "@redux-saga/core/effects";
import { actionCheckVerifyAccountFail, actionCheckVerifyAccountSuccess } from "actions/user/detailUser";
import { apiService } from "constants/axiosInstance";

async function doVerifyAccount() {
    const accessToken = localStorage.getItem('token')
    try {
      const config = {
        url: '/request-verify',
        method: 'post',
        header: new Headers({
           'authorization': `Bearer ${accessToken}` 
        })
      }
      const result = await apiService(config);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  function* verifyAccount(action) {
    try {
      const data = yield call(doVerifyAccount, action.options);
      yield put(actionCheckVerifyAccountSuccess(data));
      
     
    } catch (error) {
      yield put(actionCheckVerifyAccountFail(error));
    }
  }
  
  export { verifyAccount};