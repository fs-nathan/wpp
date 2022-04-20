import {
  GET_LIST_TEMPLATE_SUCCESS,
  GET_LIST_TEMPLATE_FAIL,
  GET_LIST_TEMPLATE,
} from "../../constants/actions/project/getListTemplate";

export const getListTemplate = () => ({
  type: GET_LIST_TEMPLATE,
});

export const getListTemplateSuccess = ({ data }) => ({
  type: GET_LIST_TEMPLATE_SUCCESS,
  data,
});

export const getListTemplateFail = (error) => ({
  type: GET_LIST_TEMPLATE_FAIL,
  error,
});
