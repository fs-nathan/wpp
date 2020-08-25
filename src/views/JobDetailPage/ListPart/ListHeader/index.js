import { IconButton, Typography } from '@material-ui/core';
import { mdiChevronDown, mdiPlus, mdiSettingsOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { searchTask, getProjectListBasic } from '../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../components/SearchInput';
import '../ListPart.scss';
import CreateJobModal from './CreateJobModal';
import CreateJobSetting from './CreateJobSetting';
import { get } from 'lodash';

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
  const { t } = useTranslation();
  const projectDetail = useSelector(state => state.taskDetail.commonTaskDetail.projectDetail);
  const dispatch = useDispatch();

  const openListProject = () => {
    setShow(true);
    dispatch(getProjectListBasic());
  };

  return (
    <div onClick={openListProject} style={{ marginTop: 8 }}>
      <HeaderText component={'div'}>{projectDetail && projectDetail.name}</HeaderText>
      <abbr title={t('LABEL_CHAT_TASK_CHON_DU_AN')}>
        <ButtonIcon className="dropdown-icon">
          <Icon path={mdiChevronDown} size={1.2} className="job-detail-icon" />
        </ButtonIcon>
      </abbr>
    </div>
  );
}

function ListHeader(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const projectDetail = useSelector(state => state.taskDetail.commonTaskDetail.projectDetail);
  const viewPermissions = useSelector(state => state.viewPermissions);
  const create_task = get(viewPermissions, `data.detailProject.${projectDetail.id}.create_task`, false)

  const [openCreateJobModal, setOpenCreateJobModal] = React.useState(false);
  const [isOpenSettings, setOpenSettings] = React.useState(false);

  function onClickSettings() {
    setOpenSettings(true)
  }

  function onClickCreateJob() {
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
            placeholder={t('LABEL_CHAT_TASK_TIM_CONG_VIEC_TRONG_DU_AN')}
            style={{ height: 'auto' }}
            onChange={e => searchListTask(e)}
          />
          <abbr title={t('LABEL_CHAT_TASK_CAI_DAT')}>
            <ButtonIcon
              className="dropdown-icon"
              onClick={onClickSettings}
            >
              <Icon path={mdiSettingsOutline} size={1.2} className="job-detail-icon setting-icon" />
            </ButtonIcon>
          </abbr>
          {create_task &&
            <abbr title={t('LABEL_CHAT_TASK_TAO_CONG_VIEC')}>
              < ButtonIcon
                className="dropdown-icon"
                onClick={onClickCreateJob}
              >
                <Icon path={mdiPlus} size={1.2} className="job-detail-icon" />
              </ButtonIcon>
            </abbr>
          }
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
    </div >
  );
}

export default ListHeader;
