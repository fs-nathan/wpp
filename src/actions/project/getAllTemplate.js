import {
  GET_ALL_TEMPLATE_SUCCESS,
  GET_ALL_TEMPLATE_FAIL,
  GET_ALL_TEMPLATE,
} from "../../constants/actions/project/getAllTemplate";

export const getAllTemplate = () => ({
  type: GET_ALL_TEMPLATE,
});

export const getAllTemplateSuccess = ({ data }) => ({
  type: GET_ALL_TEMPLATE_SUCCESS,
  data,
});

export const getAllTemplateFail = (error) => ({
  type: GET_ALL_TEMPLATE_FAIL,
  error,
});
