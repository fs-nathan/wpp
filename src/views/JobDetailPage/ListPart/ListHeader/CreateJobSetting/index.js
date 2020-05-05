import { Checkbox, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import './styles.scss';

function CreateJobSetting(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listTaskDetail = useSelector(state => state.taskDetail.listDetailTask.listTaskDetail)
  const [isChecked, setChecked] = useState(false)

  function onCheck(e, checked) {
    setChecked(checked)
  }

  return (
    <JobDetailModalWrap
      title={t('LABEL_CHAT_TASK_CAI_DAT')}
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => null}
      cancelRender={() => t('LABEL_CHAT_TASK_THOAT')}
      maxWidth='sm'
      className="CreateJobSetting"
    >
      <React.Fragment>
        <Typography>
          <Checkbox checked={isChecked} onChange={onCheck} />{t('LABEL_CHAT_TASK_HIEN_NHOM_CONG_VIEC')}</Typography>
      </React.Fragment>
    </JobDetailModalWrap>
  );
}

export default CreateJobSetting;
