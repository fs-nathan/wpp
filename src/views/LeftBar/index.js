import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { actionVisibleDrawerMessage } from '../../actions/system/system';
import { Routes } from '../../constants/routes';
import { useTranslation } from 'react-i18next';
import * as icons from '../../assets';
import './LeftBar.scss';

const isDocument = type => {
  switch (type) {
    case Routes.DOCUMENT_RECENT:
    case Routes.DOCUMENT_PROJECT:
    case Routes.DOCUMENT_SHARE:
    case Routes.DOCUMENT_SHARE_ME:
    case Routes.DOCUMENT_ME:
    case Routes.DOCUMENT_GOOGLE_DRIVE:
    case Routes.DOCUMENT_TRASH:
      return true;
    default:
      return false;
  }
};
const LeftBar = ({
  colors,
  history,
  anchorDrawer,
  actionVisibleDrawerMessage
}) => {
  const { t } = useTranslation();
  const pathname = history.location.pathname;
  const bgColor = colors.find(item => item.selected === true);
  const onCloseDrawer = () => {
    actionVisibleDrawerMessage({ type: '', anchor: anchorDrawer });
  };
  const meuList = [
    {
      title: 'Trang chủ',
      isSelected: pathname === Routes.HOME,
      icon: pathname === Routes.HOME ? icons.ic_home_select : icons.ic_home,
      url: Routes.HOME
    },
    {
      title: 'Dự án',
      isSelected: pathname === Routes.PROJECTS,
      icon:
        pathname === Routes.PROJECTS
          ? icons.ic_project_select
          : icons.ic_project,
      url: Routes.PROJECTS
    },
    {
      title: 'Công việc',
      isSelected: pathname === Routes.TASKS,
      icon: pathname === Routes.TASKS ? icons.ic_task_select : icons.ic_task,
      url: Routes.TASKS
    },
    {
      title: 'Báo cáo',
      isSelected: pathname === Routes.REPORT,
      icon:
        pathname === Routes.REPORT ? icons.ic_report_select : icons.ic_report,
      url: Routes.REPORT
    },
    {
      title: 'Tài liệu',
      isSelected: isDocument(pathname),
      icon: isDocument(pathname) ? icons.ic_file_select : icons.ic_file,
      url: Routes.DOCUMENT_RECENT
    },
    {
      title: 'Thành viên',
      isSelected: pathname === Routes.DEPARTMENTS,
      icon:
        pathname === Routes.DEPARTMENTS ? icons.ic_user_select : icons.ic_user,
      url: Routes.DEPARTMENTS
    }
  ];
  return (
    <div className="left-bar-container" style={{ background: bgColor.color }}>
      {meuList.map((el, idx) => (
        <Link
          to={el.url}
          key={idx}
          className={`menu-item ${el.isSelected ? 'actived' : ''}`}
          onClick={() => onCloseDrawer()}
        >
          <img src={el.icon} alt="" className="LeftNavIcon" />
          <span className="titleTab">{el.title}</span>
        </Link>
      ))}
      <Link
        to={Routes.SETTING_GROUP_INFO}
        onClick={onCloseDrawer}
        className="menu-item"
        title={t('IDS_WP_MANAGE_GROUP')}
      >
        <img src={icons.ic_setting} alt="" className="LeftNavIcon" />
      </Link>
    </div>
  );
};

export default connect(
  state => ({
    colors: state.setting.colors,
    anchorDrawer: state.system.anchorDrawer
  }),
  { actionVisibleDrawerMessage }
)(withRouter(LeftBar));
