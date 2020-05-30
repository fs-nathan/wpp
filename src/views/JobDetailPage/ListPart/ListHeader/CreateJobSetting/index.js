import { Checkbox, Typography } from '@material-ui/core';
import { getListTaskDetail } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import './styles.scss';

export const StyledTypography = styled(Typography)`
  .Mui-checked {
    color: ${props => props.selectedColor};
  }
`

export const listTaskDataTypes = ['not-room', 'include-room'];
export const lastJobSettingKey = 'lastJobSettingKey';

function CreateJobSetting(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const groupActiveColor = useSelector(currentColorSelector)
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
        <StyledTypography
          selectedColor={groupActiveColor}
          className="CreateJobSetting--title">
          <Checkbox
            checked={listTaskDataType === listTaskDataTypes[1]}
            onChange={onCheck} />
          {t('LABEL_CHAT_TASK_HIEN_NHOM_CONG_VIEC')}
        </StyledTypography>
      </React.Fragment>
    </JobDetailModalWrap>
  );
}

export default CreateJobSetting;
