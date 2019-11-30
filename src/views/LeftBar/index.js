import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { Routes } from '../../constants/routes';
import * as icons from '../../assets';
import './LeftBar.scss';

function LeftBar({ colors, history }) {
  const pathname = history.location.pathname;
  const bgColor = colors.find(item => item.selected === true);
  return (
    <div className="left-bar-container" style={{ background: bgColor.value }}>
      <Link to={Routes.HOME} className="menu-item">
        <img src={pathname === Routes.HOME ? icons.ic_home_select : icons.ic_home} alt="" className="LeftNavIcon" />
        <span>Trang chủ</span>
      </Link>
      <Link to={Routes.PROJECTS} className="menu-item">
        <img src={pathname === Routes.PROJECTS ? icons.ic_project_select : icons.ic_project} alt="" className="LeftNavIcon" />
        <span>Dự án</span>
      </Link>
      <Link to={Routes.TASKS} className="menu-item">
        <img src={pathname === Routes.TASKS ? icons.ic_task_select : icons.ic_task} alt="" className="LeftNavIcon" />
        <span>Công việc</span>
      </Link>
      <Link to={Routes.REPORT} className="menu-item">
        <img src={pathname === Routes.REPORT ? icons.ic_report_select : icons.ic_report} alt="" className="LeftNavIcon" />
        <span>Báo cáo</span>
      </Link>
      <Link to={Routes.DOCUMENT} className="menu-item">
        <img src={pathname === Routes.DOCUMENT ? icons.ic_file_select : icons.ic_file} alt="" className="LeftNavIcon" />
        <span>Tài liệu</span>
      </Link>
      <Link to={Routes.DEPARTMENTS} className="menu-item">
        <img src={pathname === Routes.DEPARTMENTS ? icons.ic_user_select : icons.ic_user} alt="" className="LeftNavIcon" />
        <span>Thành viên</span>
      </Link>
      <Link to={Routes.HOME} className="menu-item">
        <img src={pathname === Routes.HOME ? icons.ic_setting : icons.ic_setting} alt="" className="LeftNavIcon" />
      </Link>
    </div>
  );
}

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  {}
)(withRouter(LeftBar));
