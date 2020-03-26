import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useContext } from "react";
import styled from "styled-components";
import { JobPageContext } from "../JobPageContext";
export const QuickViewWrapper = styled.div`
  height: 100%;
  display: flex;
  padding-right: 10px;
  flex-direction: column;
  font-size: 14px;
  // grid-template-rows: 70px calc(100% - 70px) 50px;
  // grid-template-columns: 1fr;
  // grid-template-areas:
  //   "header"
  //   "body"
  //   "footer";
`;
export const QuickViewHeader = styled.div`
  grid-area: header;
  padding: 15px;
  display: flex;

  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 1;
`;
export const QuickViewHeaderLeft = styled.div`
  flex: 1;
`;
export const QuickViewHeaderRight = styled.div``;
export const QuickViewBody = styled.div`
  grid-area: body;
  padding: 15px;
  padding-bottom: 50px;
  min-height: calc(100% - 70px);
`;
export const QuickViewFooter = styled.div`
  grid-area: footer;
  height: 50px;
  display: flex;
  items-align: center;
  padding: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  bottom: 0px;
`;
export const CloseButton = () => {
  const { setQuickTask } = useContext(JobPageContext);
  return (
    <IconButton onClick={() => setQuickTask(undefined)}>
      <CloseIcon />
    </IconButton>
  );
};
function QuickView({ title, children, bottom }) {
  return (
    <QuickViewWrapper>
      <QuickViewHeader>
        <QuickViewHeaderLeft>{title}</QuickViewHeaderLeft>
        <QuickViewHeaderRight>
          <CloseButton />
        </QuickViewHeaderRight>
      </QuickViewHeader>
      <QuickViewBody>{children}</QuickViewBody>
      {bottom && <QuickViewFooter>{bottom}</QuickViewFooter>}
    </QuickViewWrapper>
  );
}

export default QuickView;
