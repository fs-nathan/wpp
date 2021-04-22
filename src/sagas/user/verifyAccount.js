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
    console.log(`ee`);
    try {
      const data = yield call(doVerifyAccount, action.options);
      
      // console.log(data)
      // if(data === "Error: Tài khoản này đã được xác thực"){
      //   console.log(`true`);
      // }
      yield put(actionCheckVerifyAccountSuccess(data));
      
     
    } catch (error) {
      console.log(error)
      yield put(actionCheckVerifyAccountFail(error));
    }
  }
  
  export { verifyAccount};