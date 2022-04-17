import { Button } from "@mui/material";
import { getListTemplate } from "actions/project/getListTemplate";
import { getTemplateByCategory } from "actions/project/getTemplateByCategory";
import { DETAIL_TEMPLATE } from "mocks/detail-template";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TemplateCard from "../TemplateCard/TemplateCard";
import "./index.scss";

const TemplateSection = ({ categoryId, icon, title, extra }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.project.getListTemplate.data);

  const templates = useMemo(() => {
    if (data && data.length > 0) {
      const currentTemplates = data.find(
        (template) => template.category_id === categoryId
      );
      return currentTemplates ? currentTemplates.templates : [];
    }
    return [];
  }, [data]);

  const fetchData = useCallback(async () => {
    await Promise.all[dispatch(getListTemplate())];
  }, [dispatch, getListTemplate, categoryId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="template-group__section">
      {templates && templates.length > 0 && (
        <>
          <div className="template-group__section__title">
            <span>{icon}</span>
            <h3>{title}</h3>
            <div>{extra && extra}</div>
          </div>

          <div className="template-group__section__card">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateSection;
