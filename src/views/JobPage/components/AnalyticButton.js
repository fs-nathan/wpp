import classnames from "classnames";
import React from "react";
import "./AnalyticButton.scss";

export default function AnalyticButton({
  active,
  onCloseClick,
  count = 0,
  color = "rgb(0, 156, 243)",
  label = "",
  circleText,
  ...props
}) {
  return (
    <div
      // focusRipple
      className={classnames(
        "comp_AnalyticButton",
        active && "comp_AnalyticButton__active"
      )}
      style={{ color }}
      {...props}
    >
      <div className="comp_AnalyticButton__circle">
        <div className="comp_AnalyticButton__circleBackground"></div>
        <div className="comp_AnalyticButton__circleText">{circleText}</div>
      </div>
      <div className="comp_AnalyticButton__right">
        <div className="comp_AnalyticButton__count">{count}</div>
        <div className="comp_AnalyticButton__label">{label}</div>
      </div>
    </div>
  );
}
