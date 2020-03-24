import { Box } from "@material-ui/core";
import noDataImg from "assets/no-data.png";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bgColorSelector } from "views/ProjectGroupPage/RightPart/AllProjectTable/selectors";
function EmptyHolder({
  bgColor,
  title = "Không có dữ liệu",
  description = "Hãy tạo mới công việc hoặc kiểm tra bộ lọc để xuất hiện dữ liệu công việc"
}) {
  const { t } = useTranslation();
  return (
    <Box
      width="100%"
      padding="70px 30px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <img
        style={{
          filter: "opacity(0.5)"
        }}
        width="300px"
        src={noDataImg}
        alt="empty"
      ></img>
      <Box
        fontWeight="bold"
        fontSize="19px"
        marginTop="40px"
        style={{
          color: bgColor.color
        }}
      >
        {t(title)}
      </Box>
      <Box fontSize="14px" marginTop="15px" color={"#555555"}>
        {t(description)}
      </Box>
    </Box>
  );
}
const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state)
  };
};
export default connect(mapStateToProps)(EmptyHolder);
