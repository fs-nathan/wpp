import { apiService } from "constants/axiosInstance";

export const actionAddMutipleMember = data=>{
    const config = {
      url: '/users/create-account',
      method: 'post',
      data
    };
    return apiService(config);
  }