import noDataImg from "assets/no-data.png";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bgColorSelector } from "views/ProjectGroupPage/RightPart/AllProjectTable/selectors";
import "./EmptyHolder.css";
function EmptyHolder({
  image = noDataImg,
  bgColor,
  title = "Không có dữ liệu",
  description = "Hãy tạo mới công việc hoặc kiểm tra bộ lọc để xuất hiện dữ liệu công việc",
}) {
  const { t } = useTranslation();
  return (
    <div className="comp_EmptyHolder__wrapper">
      {image ? (
        image
      ) : (
        <img
          className="comp_EmptyHolder__img"
          src={noDataImg}
          alt="empty"
        ></img>
      )}
      <div
        className="comp_EmptyHolder__title"
        style={{
          color: bgColor.color,
        }}
      >
        {t(title)}
      </div>
      <div className="comp_EmptyHolder__description">{t(description)}</div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    bgColor: bgColorSelector(state),
  };
};
export default connect(mapStateToProps)(EmptyHolder);
