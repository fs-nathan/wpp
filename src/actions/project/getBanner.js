import {
  GET_BANNER_SUCCESS,
  GET_BANNER_FAIL,
  GET_BANNER,
} from "../../constants/actions/project/getBanner";

export const getBanner = () => ({
  type: GET_BANNER,
});

export const getBannerSuccess = ({ data }) => ({
  type: GET_BANNER_SUCCESS,
  data,
});

export const getBannerFail = (error) => ({
  type: GET_BANNER_FAIL,
  error,
});
