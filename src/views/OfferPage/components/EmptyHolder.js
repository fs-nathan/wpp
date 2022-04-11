import noDataImg from "assets/no-data.png";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bgColorSelector } from "views/ProjectGroupPage/RightPart/AllProjectGrid/selectors";
import "./EmptyHolder.css";
function EmptyHolder({
  bgColor
}) {
  const { t } = useTranslation();
  return (
    <div className="comp_EmptyHolder__wrapper">
      <img className="comp_EmptyHolder__img" src={noDataImg} alt="empty"></img>
      <div
        className="comp_EmptyHolder__title"
        style={{
          color: bgColor.color
        }}
      >
        {t("VIEW_OFFER_LABEL_DATA_NOT_FOUND")}
      </div>
      <div className="comp_EmptyHolder__description">{t("VIEW_OFFER_TEXT_DATA_NOT_FOUND_DISCRIPTION")}</div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state)
  };
};
export default connect(mapStateToProps)(EmptyHolder);
