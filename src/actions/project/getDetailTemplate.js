import {
  GET_DETAIL_TEMPLATE_SUCCESS,
  GET_DETAIL_TEMPLATE_FAIL,
  GET_DETAIL_TEMPLATE,
} from "../../constants/actions/project/getDetailTemplate";

export const getDetailTemplate = ({ template_id }) => ({
  type: GET_DETAIL_TEMPLATE,
  options: { template_id },
});

export const getDetailTemplateSuccess = ({ data }) => ({
  type: GET_DETAIL_TEMPLATE_SUCCESS,
  data,
});

export const getDetailTemplateFail = (error) => ({
  type: GET_DETAIL_TEMPLATE_FAIL,
  error,
});
