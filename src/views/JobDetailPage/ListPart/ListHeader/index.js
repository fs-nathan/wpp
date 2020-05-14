import { IconButton, Typography } from '@material-ui/core';
import { mdiChevronDown, mdiPlus, mdiSettingsOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
// import CreateProjectGroup from 'views/ProjectGroupPage/Modals/CreateProject';
import { searchTask } from '../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../components/SearchInput';
import '../ListPart.scss';
import CreateGroupTaskModal from './CreateGroupTaskModal';
import CreateJobModal from './CreateJobModal';
import CreateJobSetting from './CreateJobSetting';

const HeaderText = styled(Typography)`
  width: 315px;
  font-weight: 500;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`;

function ListHeaderSelect({ setShow }) {
  const projectDetail = useSelector(state => state.taskDetail.commonTaskDetail.projectDetail);

  const openListProject = () => {
    setShow(true);
  };

  return (
    <div onClick={openListProject} style={{ marginTop: 8 }}>
      <HeaderText component={'div'}>{projectDetail && projectDetail.name}</HeaderText>
      <ButtonIcon className="dropdown-icon">
        <Icon path={mdiChevronDown} size={1.2} className="job-detail-icon" />
      </ButtonIcon>
    </div>
  );
}

function ListHeader(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listGroupTaskData = useSelector(state => state.taskDetail.listGroupTask.listGroupTask);
  const [openCreateJobModal, setOpenCreateJobModal] = React.useState(false);
  const [isOpenCreateGroup, setOpenCreateGroup] = React.useState(false);
  const [isOpenProjectGroup, setOpenProjectGroup] = React.useState(false);
  const [isOpenSettings, setOpenSettings] = React.useState(false);

  function onClickSettings() {
    setOpenSettings(true)
  }

  function onClickCreateJob() {
    if (!listGroupTaskData || listGroupTaskData.group_tasks.length === 0) {
      setOpenCreateGroup(true)
    } else {
      setOpenCreateJobModal(true);
    }
  }

  function onClickCreateProject() {
    setOpenCreateGroup(false)
    setOpenProjectGroup(true)
  }

  const searchListTask = e => {
    dispatch(searchTask(e.target.value));
  };

  return (
    <div>
      <div className="list-header">
        <ListHeaderSelect {...props} />
        <div className="header-bottom-box">
          <SearchInput
            placeholder={t('LABEL_CHAT_TASK_TIM_CONG_VIEC_TRONG_DU_AN')}
            style={{ height: 'auto' }}
            onChange={e => searchListTask(e)}
          />
          <ButtonIcon
            className="dropdown-icon"
            onClick={onClickSettings}
          >
            <Icon path={mdiSettingsOutline} size={1.2} className="job-detail-icon setting-icon" />
          </ButtonIcon>
          <ButtonIcon
            className="dropdown-icon"
            onClick={onClickCreateJob}
          >
            <Icon path={mdiPlus} size={1.2} className="job-detail-icon" />
          </ButtonIcon>
        </div>
      </div>
      <CreateJobModal
        isOpen={openCreateJobModal}
        setOpen={setOpenCreateJobModal}
      />
      <CreateJobSetting
        isOpen={isOpenSettings}
        setOpen={setOpenSettings}
      />
      {/* <CreateProjectGroup
        open={isOpenProjectGroup}
        setOpen={setOpenProjectGroup} /> */}
      <CreateGroupTaskModal
        isOpen={isOpenCreateGroup}
        setOpen={setOpenCreateGroup}
        onClickCreate={onClickCreateProject}
      />
    </div>
  );
}

export default ListHeader;
