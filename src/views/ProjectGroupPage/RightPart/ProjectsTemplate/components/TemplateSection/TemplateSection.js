import { Button } from "@mui/material";
import { getListTemplate } from "actions/project/getListTemplate";
import { getTemplateByCategory } from "actions/project/getTemplateByCategory";
import { DETAIL_TEMPLATE } from "mocks/detail-template";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TemplateCard from "../TemplateCard/TemplateCard";
import "./index.scss";

const TemplateSection = ({
  isMainPage = false,
  categoryId,
  icon,
  title,
  extra,
  isEmpty,
  templates,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="template-group__section">
      {isMainPage ? (
        templates &&
        templates.length > 0 && (
          <div className="template-group__section__title">
            <span>{icon}</span>
            <h3>{title}</h3>
            <div>{extra && extra}</div>
          </div>
        )
      ) : (
        <div className="template-group__section__title">
          <span>{icon}</span>
          <h3>{title}</h3>
          <div>{extra && extra}</div>
        </div>
      )}

      <div className="template-group__section__card">
        {templates &&
          templates.length > 0 &&
          templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        {isEmpty && <TemplateCard isEmpty />}
      </div>
    </div>
  );
};

export default TemplateSection;
