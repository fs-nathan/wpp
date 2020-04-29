import { IconButton, Typography } from '@material-ui/core';
import { mdiChevronDown, mdiPlus, mdiSettingsOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
// import CreateProjectGroup from 'views/ProjectGroupPage/Modals/CreateProject';
import { searchTask } from '../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../components/SearchInput';
import '../ListPart.scss';
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
  const dispatch = useDispatch();
  const listTaskDetail = useSelector(state => state.taskDetail.listDetailTask.listTaskDetail)
  const [openCreateJobModal, setOpenCreateJobModal] = React.useState(false);
  const [isOpenCreateGroup, setOpenCreateGroup] = React.useState(false);
  const [isOpenSettings, setOpenSettings] = React.useState(false);

  function onClickSettings() {
    setOpenSettings(true)
  }

  function onClickCreateJob() {
    if (listTaskDetail) {
      if (listTaskDetail.tasks.length === 0) {
        setOpenCreateGroup(true)
        return
      }
    }
    setOpenCreateJobModal(true);
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
            placeholder="Tìm công việc trong dự án..."
            style={{ height: 'auto' }}
            onChange={e => searchListTask(e)}
          />
          <ButtonIcon
            className="dropdown-icon"
            onClick={onClickSettings}
          >
            <Icon path={mdiSettingsOutline} size={1.2} className="job-detail-icon" />
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
      {/* <CreateProjectGroup open={isOpenCreateGroup} setOpen={setOpenCreateGroup}></CreateProjectGroup> */}
    </div>
  );
}

export default ListHeader;
