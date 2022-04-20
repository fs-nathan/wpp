import {
  GET_TEMPLATE_CATEGORY_SUCCESS,
  GET_TEMPLATE_CATEGORY_FAIL,
  GET_TEMPLATE_CATEGORY,
} from "../../constants/actions/project/getTemplateCategory";

export const getTemplateCategory = () => ({
  type: GET_TEMPLATE_CATEGORY,
});

export const getTemplateCategorySuccess = ({ data }) => ({
  type: GET_TEMPLATE_CATEGORY_SUCCESS,
  data,
});

export const getTemplateCategoryFail = (error) => ({
  type: GET_TEMPLATE_CATEGORY_FAIL,
  error,
});
