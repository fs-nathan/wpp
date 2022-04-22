import { apiService } from "../../constants/axiosInstance";

export const getListGroupOffer = (params) => {
  const config = {
    url: "/offers/list-group-offer",
    method: "get",
    params,
  };
  return apiService(config);
};
