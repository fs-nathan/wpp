import React from "react";
import "./index.scss";

const TemplateGroup = ({ thumbnail, title }) => {
  return (
    <div className="template-group">
      <span>
        <img src={thumbnail} alt="" />
      </span>
      <p>{title}</p>
    </div>
  );
};

export default TemplateGroup;
