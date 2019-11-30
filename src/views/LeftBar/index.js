import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Routes } from '../../constants/routes';
import * as icons from '../../assets';
import './LeftBar.scss';

function LeftBar({ colors }) {
  //const bgColor = colors.find(item => item.selected === true);
  return (
    <div className="left-bar-container" /*style={{ background: bgColor.value }}*/>
      <Link to={Routes.HOME} className="menu-item">
        <img src={icons.ic_home} alt="" className="LeftNavIcon" />
        <span>Trang chủ</span>
      </Link>
      <Link to={Routes.PROJECTS} className="menu-item">
        <img src={icons.ic_project} alt="" className="LeftNavIcon" />
        <span>Dự án</span>
      </Link>
      <Link to={Routes.TASKS} className="menu-item">
        <img src={icons.ic_task} alt="" className="LeftNavIcon" />
        <span>Công việc</span>
      </Link>
      <Link to={Routes.REPORT} className="menu-item">
        <img src={icons.ic_report} alt="" className="LeftNavIcon" />
        <span>Báo cáo</span>
      </Link>
      <Link to={Routes.DOCUMENT} className="menu-item">
        <img src={icons.ic_file} alt="" className="LeftNavIcon" />
        <span>Tài liệu</span>
      </Link>
      <Link to={Routes.DEPARTMENTS} className="menu-item">
        <img src={icons.ic_user} alt="" className="LeftNavIcon" />
        <span>Thành viên</span>
      </Link>
      <Link to={Routes.HOME} className="menu-item">
        <img src={icons.ic_setting} alt="" className="LeftNavIcon" />
      </Link>
    </div>
  );
}

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  {}
)(LeftBar);
