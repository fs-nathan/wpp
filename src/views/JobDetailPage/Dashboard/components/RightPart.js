import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ListInformation from "./ListInformation";

const RightPart = () => {
  return (
    <WrapperRightPart>
      <Title variant="h5" component="div">
        Thông tin bổ sung
      </Title>
      <ListInformation />
      <DeleteGroup>Xoá bảng việc</DeleteGroup>
    </WrapperRightPart>
  );
};

const WrapperRightPart = styled.div`
  background-color: #f3f6f7;
  padding: 20px;
  min-height: 100vh;
  height: 100%;
`;

const Title = styled(Typography)`
  color: #878787;
  font-weight: 500;
  margin-bottom: 20px;
  font-size: 18px;
`;

const DeleteGroup = styled.div`
  padding: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 400;
  font-size: 1.3rem;
  text-align: center;
  margin-top: 30px;
  color: red;
  border: 1px solid red;
`;

export default RightPart;
