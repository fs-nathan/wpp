import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./style.scss";

export const Container = ({ className = "", ...props }) => (
  <div className={`comp_TableComponents___container ${className}`} {...props} />
);

export const SubTitle = ({ className = "", ...props }) => (
  <span
    className={`comp_TableComponents___sub-title ${className}`}
    {...props}
  />
);

export const LinkSpan = ({ className = "", ...props }) => (
  <span className={`comp_TableComponents___link ${className}`} {...props} />
);

export const SettingContainer = ({ className = "", ...props }) => (
  <div
    className={`comp_TableComponents___setting-container ${className}`}
    {...props}
  />
);

export const StateBox = ({ stateCode, className = "", ...props }) => (
  <div
    className={`comp_TableComponents___state-box-${stateCode} ${className}`}
    {...props}
  />
);

export const DateBox = ({ className = "", ...props }) => (
  <div className={`comp_TableComponents___date-box`} {...props} />
);

export const ScrollbarsContainer = ({ className = "", ...rest }) => (
  <Scrollbars
    className={`comp_CustomTable_TableMain___container ${className}`}
    {...rest}
  />
);
