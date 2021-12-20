import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const LeftPart = () => {
  return (
    <WrapperLeftPart>
      <Typography variant="p" component="div">
        Được tạo bởi Viet App lúc 09:21 ngày 08/01/2021
      </Typography>

      <WrapperInformation
        title="Bảng việc"
        description="Dự án phát triển phần mềm quản lý công việc trực tuyến"
        styleDescription={{ fontSize: "18px", color: "black", fontWeight: 500 }}
      />

      <WrapperInformation
        title="Mô tả"
        description="Xây dựng và phát triển phần mềm quản lý công việc trực tuyến"
      />

      <WrapperInformation title="Phân loại" component="div">
        Phân loại
      </WrapperInformation>

      <WrapperInformation title="Thành viên" component="div">
        Thành viên
      </WrapperInformation>

      <WrapperInformation title="Mức độ ưu tiên" component="div">
        Mức độ ưu tiên
      </WrapperInformation>

      <WrapperInformation title="Tiến độ" component="div">
        <Typography variant="p" style={{ color: "black", fontWeight: 500 }}>
          120 ngày
        </Typography>
        <p style={{ fontWeight: 500 }}>
          Bắt đầu: 08:00 ngày 10/01/2021 (ngày bắt đầu của công việc bắt đầu sớm
          nhất)
        </p>
        <Typography variant="p" style={{ fontWeight: 500 }}>
          Kết thúc: 08:00 ngày 10/01/2021 (ngày kết thúc của công việc kết thúc
          muộn nhất)
        </Typography>
      </WrapperInformation>

      <WrapperInformation
        title="Cài đặt"
        style={{ color: "black", fontWeight: "400" }}
      >
        <WrapperSetting>
          <p>Sao chép bảng việc: Không</p>
          <span>Thay đổi</span>
        </WrapperSetting>
        <WrapperSetting>
          <p>Thông báo tới thành viên: Có</p>
          <span>Thay đổi</span>
        </WrapperSetting>
        <WrapperSetting>
          <span>Xem toàn bộ cài đặt</span>
        </WrapperSetting>
      </WrapperInformation>
    </WrapperLeftPart>
  );
};

const WrapperInformation = ({
  title,
  children,
  style = {},
  description = null,
  styleDescription = {},
}) => (
  <div style={{ marginBottom: "20px", ...style }}>
    <StyledLabel variant="h5" component="div">
      {title}
    </StyledLabel>

    {description ? (
      <Typography
        variant="p"
        component="div"
        style={{
          fontSize: "14px",
          color: "black",
          fontWeight: 400,
          ...styleDescription,
        }}
      >
        {description}
      </Typography>
    ) : (
      children
    )}
  </div>
);

const WrapperSetting = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  margin: 10px 0;
  p {
    margin: 0;
  }
  > span {
    color: #4284f3ff;
    font-weight: 500;
  }
`;
const WrapperLeftPart = styled.div`
  padding: 20px 25px 20px 65px;
  min-height: 100vh;
  height: 100%;
  color: #878787;
`;
const StyledLabel = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0;
`;

export default LeftPart;
