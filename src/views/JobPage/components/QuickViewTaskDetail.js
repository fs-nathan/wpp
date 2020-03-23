import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import QuickView from "../Layout/QuickView";
export const QuickViewTaskDetailHeaderWrap = styled.div`
  display: flex;
`;
export const QuickViewTaskDetailTitle = styled.div`
  flex: 1;
  padding: 0 1em;
`;
export const QuickViewTaskDetailHeader = ({ avatar, title }) => {
  return (
    <QuickViewTaskDetailHeaderWrap>
      <Avatar src={avatar}></Avatar>
      <QuickViewTaskDetailTitle>{title}</QuickViewTaskDetailTitle>
    </QuickViewTaskDetailHeaderWrap>
  );
};
function QuickViewTaskDetail({ avatar, user_name }) {
  return <QuickView title={<QuickViewTaskDetailHeader />}></QuickView>;
}

export default QuickViewTaskDetail;
