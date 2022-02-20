import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";

const MembersList = ({ data = [], total = data.length || 0 }) => {
  return (
    <WrapperList>
      <MemberItem
        avatar={data?.[0]?.avatar || ""}
        name={data?.[0]?.name}
        role="Chủ sở hữu"
      />
      {total > 1 && <CountItem total={total} />}
      <AddMemberButton />
    </WrapperList>
  );
};

const MemberItem = ({ customCircle = null, name, role, avatar }) => {
  return (
    <WrapperItem>
      {customCircle || <Avatar alt="Avatar" src={avatar} />}
      <div className="information">
        <div className="name">{name}</div>
        <div className="role">{role}</div>
      </div>
    </WrapperItem>
  );
};

const CountItem = ({ total = 0 }) => {
  return (
    <MemberItem
      customCircle={
        <Avatar
          sx={{ bgcolor: "black" }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          +{total - 1}
        </Avatar>
      }
      name="Thành viên"
      role="Tham gia"
    />
  );
};

const AddMemberButton = () => {
  return (
    <MemberItem customCircle={<AddCircle />} name="Thêm" role="Thành viên" />
  );
};

const AddCircle = () => {
  return (
    <WrapperCircle>
      <AddIcon />
    </WrapperCircle>
  );
};

const WrapperList = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(181px, 1fr));
  justify-content: space-between;
`;

const WrapperItem = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(55, 23, 23, 0.03);
  }
  .information {
    margin-left: 10px;
    color: #1e1f21;
    .name {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
    .role {
      color: #6d6e6f;
      font-size: 12px;
      line-height: 18px;
    }
  }
`;

const WrapperCircle = styled.div`
  align-items: center;
  border: 1px dashed #6d6e6f;
  border-radius: 50%;
  display: flex;
  fill: #6d6e6f;
  flex-grow: 0;
  flex-shrink: 0;
  height: 33px;
  justify-content: center;
  margin-right: 8px;
  width: 33px;
`;

export default MembersList;
