import { Checkbox, Typography } from '@material-ui/core';
import { getListTaskDetail } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import './styles.scss';

export const listTaskDataTypes = ['not-room', 'include-room'];

function CreateJobSetting(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listTaskDataType = useSelector(state => state.taskDetail.listDetailTask.listTaskDataType)
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);

  function onCheck(e, checked) {
    if (listTaskDataType === listTaskDataTypes[1]) {
      dispatch(getListTaskDetail(projectId, listTaskDataTypes[0]));
    } else {
      dispatch(getListTaskDetail(projectId, listTaskDataTypes[1]));
    }
  }

  return (
    <JobDetailModalWrap
      title={t('LABEL_CHAT_TASK_CAI_DAT')}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={null}
      cancelRender={() => t('LABEL_CHAT_TASK_THOAT')}
      maxWidth='sm'
      className="CreateJobSetting"
    >
      <React.Fragment>
        <Typography>
          <Checkbox checked={listTaskDataType === listTaskDataTypes[1]} onChange={onCheck} />{t('LABEL_CHAT_TASK_HIEN_NHOM_CONG_VIEC')}</Typography>
      </React.Fragment>
    </JobDetailModalWrap>
  );
}

export default CreateJobSetting;
