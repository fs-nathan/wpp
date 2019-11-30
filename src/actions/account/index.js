import { apiService } from "../../constants/axiosInstance";

export const actionRegister = email => {
  return apiService.post("register", {
    email: email
  });
};

export const actionForgotPassword = email => {
  return apiService.post("forgot-password", {
    email: email
  });
};

export const actionConfirmRegistration = data => {
  return apiService.post("confirm-registration", data);
};
