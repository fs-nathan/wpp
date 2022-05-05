import React from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";

const TemplateGroup = ({ thumbnail, title, id }) => {
  const history = useHistory();
  return (
    <div
      className="template-group"
      onClick={() => history.push("/projects/template/" + id)}
    >
      <span>
        <img src={thumbnail} alt="" />
      </span>
      <p>{title}</p>
    </div>
  );
};

export default TemplateGroup;
