import { call, put } from "@redux-saga/core/effects";
import {  actionChangeAccountFail, actionChangeAccountSuccess, actionGetInforFail, actionGetInforSuccess } from "actions/user/detailUser";
import { apiService } from "constants/axiosInstance";

async function doUpdate(data) {
    try {
        const accessToken = localStorage.getItem('token')

        const config = {
          url: '/update-account',
          method: 'post',
          header: new Headers({
            'authorization': `Bearer ${accessToken}` 
         }),
          data
        };
        return apiService(config);
    } catch (error) {
      throw error;
    }
  }
  
  function* updateAccount(action) {
    try {
      const {data} = yield call(doUpdate, action.payload);
      if(data.state){
          yield put (actionChangeAccountSuccess(data));
        
      }
     
    } catch (error) {
        console.log(`err`, error);
      yield put(actionChangeAccountFail(error));
    }
  }
  
  export { updateAccount};