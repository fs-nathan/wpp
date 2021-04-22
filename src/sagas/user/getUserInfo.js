import { call, put } from "@redux-saga/core/effects";
import {  actionGetInforFail, actionGetInforSuccess } from "actions/user/detailUser";
import { apiService } from "constants/axiosInstance";

async function doGetInfor(userId) {
    try {
      const config = {
        url: `/list-user?user_id=${userId}`,
        method: 'get',
        // header: new Headers({
        //    'authorization': `Bearer ${accessToken}` 
        // })
      }
      const result = await apiService(config);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  
  function* getUserInfor(action) {
    try {
      const data = yield call(doGetInfor(action.userId));
      yield put(actionGetInforSuccess(data));
     
    } catch (error) {
      yield put(actionGetInforFail(error));
    }
  }
  
  export { getUserInfor};