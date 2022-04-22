import {
  GET_LIST_TEMPLATE_ME_SHARED_SUCCESS,
  GET_LIST_TEMPLATE_ME_SHARED_FAIL,
  GET_LIST_TEMPLATE_ME_SHARED,
} from "../../constants/actions/project/getListTemplateMeShared";

export const getListTemplateMeShared = () => ({
  type: GET_LIST_TEMPLATE_ME_SHARED,
});

export const getListTemplateMeSharedSuccess = ({ data }) => ({
  type: GET_LIST_TEMPLATE_ME_SHARED_SUCCESS,
  data,
});

export const getListTemplateMeSharedFail = (error) => ({
  type: GET_LIST_TEMPLATE_ME_SHARED_FAIL,
  error,
});
