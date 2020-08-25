import { listIcon } from "actions/icon/listIcon";
import ErrorBox from "components/ErrorBox";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { LogoManagerContainer } from "views/DepartmentPage/Modals/LogoManager";
import {
  LogoManagerContext,
  LogoMnanagerStateLess,
  UploadButton,
} from "views/DepartmentPage/Modals/LogoManager/presenters";
import { Stack } from "../Home/components/Stack";
const HomeWrap = styled.div`
  padding: 20px;
  font-size: 16px;
  line-height: 1.4;
`;
function IconManager({ ...props }) {
  return (
    <HomeWrap>
      <LogoManagerContainer {...props}>
        <LogoManagerContext.Consumer>
          {({ icons }) => {
            return icons.error !== null ? (
              <ErrorBox />
            ) : (
              <Stack large>
                <LogoMnanagerStateLess />
                <UploadButton />
              </Stack>
            );
          }}
        </LogoManagerContext.Consumer>
      </LogoManagerContainer>
    </HomeWrap>
  );
}

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listIcon());
  }, [dispatch]);
  return <IconManager />;
};
