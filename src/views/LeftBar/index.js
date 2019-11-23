import React from 'react';
import styled from 'styled-components';
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import {
  mdiFolderMultipleOutline,
  mdiViewDashboard,
  mdiApps,
  mdiBallotOutline,
  mdiEqualizer,
  mdiAccountGroup,
  mdiDotsHorizontal
} from "@mdi/js";

const Container = styled.div`
  grid-area: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(45deg,#33505e,#4caf50);
  & > *:first-child {
    margin-top: 10px;
  }
  & > *:last-child {
    margin-top: auto;
  }
`;

const NavLink = styled(Link)`
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-decoration: none;
  &:hover {
    background-color: rgba(0, 0, 0, .12);
  }
  & > *:not(:first-child) {
    margin-top: 3px;
  }
`;

function LeftBar() {
  return (
    <Container>
      <NavLink to="/">  
        <Icon path={mdiViewDashboard} size={1.5} color={"#fff"} />
        <span>Trang chủ</span>
      </NavLink>
      <NavLink to="/projects">  
        <Icon path={mdiApps} size={1.5} color={"#fff"} />
        <span>Dự án</span>
      </NavLink>
      <NavLink to="/tasks">  
        <Icon path={mdiBallotOutline} size={1.5} color={"#fff"} />
        <span>Công việc</span>
      </NavLink>
      <NavLink to="/bao-cao">  
        <Icon path={mdiEqualizer} size={1.5} color={"#fff"} />
        <span>Báo cáo</span>
      </NavLink>
      <NavLink to="/tai-lieu">  
        <Icon path={mdiFolderMultipleOutline} size={1.5} color={"#fff"} />
        <span>Tài liệu</span>
      </NavLink>
      <NavLink to="/departments">  
        <Icon path={mdiAccountGroup} size={1.5} color={"#fff"} />
        <span>Thành viên</span>
      </NavLink>
      <NavLink to="/">  
        <Icon path={mdiDotsHorizontal} size={1.5} color={"#fff"} />
      </NavLink>
    </Container>
  )
}

export default LeftBar;
