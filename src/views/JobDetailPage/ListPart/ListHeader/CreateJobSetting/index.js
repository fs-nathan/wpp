import { Checkbox, Typography } from '@material-ui/core';
import { getListTaskDetail } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import './styles.scss';

export const listTaskDataTypes = ['not-room', 'include-room'];
export const lastJobSettingKey = 'lastJobSettingKey';

function CreateJobSetting(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listTaskDataType = useSelector(state => state.taskDetail.listDetailTask.listTaskDataType)
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  const userId = useSelector(state => state.system.profile.id);

  function onCheck(e, checked) {
    const key = `${userId}:${lastJobSettingKey}`;
    if (listTaskDataType === listTaskDataTypes[1]) {
      dispatch(getListTaskDetail(projectId, listTaskDataTypes[0]));
      localStorage.setItem(key, listTaskDataTypes[0])
    } else {
      dispatch(getListTaskDetail(projectId, listTaskDataTypes[1]));
      localStorage.setItem(key, listTaskDataTypes[1])
    }
  }

  return (
    <JobDetailModalWrap
      title={t('LABEL_CHAT_TASK_CAI_DAT_CONG_VIEC')}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={null}
      cancleRender={() => t('LABEL_CHAT_TASK_THOAT')}
      maxWidth='sm'
      className="CreateJobSetting"
    >
      <React.Fragment>
        <Typography className="CreateJobSetting--title">
          <Checkbox checked={listTaskDataType === listTaskDataTypes[1]} onChange={onCheck} />{t('LABEL_CHAT_TASK_HIEN_NHOM_CONG_VIEC')}</Typography>
      </React.Fragment>
    </JobDetailModalWrap>
  );
}

export default CreateJobSetting;
