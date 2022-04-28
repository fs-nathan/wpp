import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LabelList from "./LabelList";
import MembersList from "./MembersList";
import PriorityList from "./PriorityList";

const LeftPart = ({
  projectInfo = {},
  status = {},
  handleOpenModal = () => {},
}) => {
  const { membersAdded } = useSelector(
    ({ project }) => project.memberProject.data
  );
  const _handleAddMember = () => {
    handleOpenModal("ADD_MEMBER");
  };

  const dataMembers = membersAdded.length
    ? membersAdded
    : projectInfo?.members || [];

  return (
    <WrapperLeftPart>
      <Typography variant="p" component="div">
        Được tạo bởi {projectInfo?.user_create?.name} ngày{" "}
        {projectInfo?.date_start}
      </Typography>

      <WrapperInformation
        title="Bảng việc"
        description={projectInfo.name}
        styleDescription={{
          fontSize: "17px",
          fontWeight: 500,
          color: "#1e1f21",
        }}
      />

      <WrapperInformation title="Mô tả" description={projectInfo.description} />

      <WrapperInformation title="Phân loại" component="div">
        <LabelList />
      </WrapperInformation>

      <WrapperInformation title="Thành viên" component="div">
        <MembersList data={dataMembers || []} onAddMember={_handleAddMember} />
      </WrapperInformation>

      <WrapperInformation title="Mức độ ưu tiên" component="div">
        <PriorityList
          projectId={projectInfo?.id || null}
          defaultPriority={projectInfo.priority_code}
        />
      </WrapperInformation>

      <WrapperInformation title="Tiến độ" component="div">
        <Typography variant="p" style={{ color: "black", fontWeight: 500 }}>
          {projectInfo?.duration} ngày
        </Typography>
        <p style={{ fontWeight: 500 }}>
          Bắt đầu: Ngày {projectInfo?.date_start}
        </p>
        <Typography variant="p" style={{ fontWeight: 500 }}>
          Kết thúc: Ngày {projectInfo?.date_end}
        </Typography>
      </WrapperInformation>

      <WrapperInformation
        title="Cài đặt"
        style={{ color: "black", fontWeight: "400" }}
      >
        <WrapperSetting>
          <p>Sao chép bảng việc: {status.copy ? "Có" : "Không"}</p>
          <span onClick={() => handleOpenModal("SETTING")}>Thay đổi</span>
        </WrapperSetting>
        <WrapperSetting>
          <p>
            Thông báo tới thành viên: {status.notification ? "Có" : "Không"}
          </p>
          <span onClick={() => handleOpenModal("SETTING")}>Thay đổi</span>
        </WrapperSetting>
        <WrapperSetting>
          <span onClick={() => handleOpenModal("SETTING")}>
            Xem toàn bộ cài đặt
          </span>
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
          lineHeight: "22px",
          color: "#1e1f21",
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
    cursor: pointer;
  }
`;
const WrapperLeftPart = styled.div`
  padding: 20px 25px 20px 65px;
  min-height: 100vh;
  height: 100%;
  color: #878787;
`;
const StyledLabel = styled(Typography)`
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 4px;
  margin-top: 24px;
  width: 280px;
  color: #878787;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

export default LeftPart;
