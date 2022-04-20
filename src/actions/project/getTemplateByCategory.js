import {
  GET_TEMPLATE_BY_CATEGORY_SUCCESS,
  GET_TEMPLATE_BY_CATEGORY_FAIL,
  GET_TEMPLATE_BY_CATEGORY,
} from "../../constants/actions/project/getTemplateByCategory";

export const getTemplateByCategory = ({ category_id }) => ({
  type: GET_TEMPLATE_BY_CATEGORY,
  options: { category_id },
});

export const getTemplateByCategorySuccess = ({ data }) => ({
  type: GET_TEMPLATE_BY_CATEGORY_SUCCESS,
  data,
});

export const getTemplateByCategoryFail = (error) => ({
  type: GET_TEMPLATE_BY_CATEGORY_FAIL,
  error,
});
