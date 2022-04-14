import { Button } from "@mui/material";
import { DETAIL_TEMPLATE } from "mocks/detail-template";
import React from "react";
import TemplateCard from "../TemplateCard/TemplateCard";
import "./index.scss";
const TemplateSection = ({ icon, title, templates, extra }) => {
  return (
    <div className="template-group__section">
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
    </div>
  );
};

export default TemplateSection;
