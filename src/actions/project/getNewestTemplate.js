import {
  GET_NEWEST_TEMPLATE_SUCCESS,
  GET_NEWEST_TEMPLATE_FAIL,
  GET_NEWEST_TEMPLATE,
} from "../../constants/actions/project/getNewestTemplate";

export const getNewestTemplate = () => ({
  type: GET_NEWEST_TEMPLATE,
});

export const getNewestTemplateSuccess = ({ data }) => ({
  type: GET_NEWEST_TEMPLATE_SUCCESS,
  data,
});

export const getNewestTemplateFail = (error) => ({
  type: GET_NEWEST_TEMPLATE_FAIL,
  error,
});
