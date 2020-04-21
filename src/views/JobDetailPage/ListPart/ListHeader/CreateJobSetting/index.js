import { Checkbox, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import './styles.scss';

function CreateJobSetting(props) {
  const dispatch = useDispatch();
  const listTaskDetail = useSelector(state => state.taskDetail.listDetailTask.listTaskDetail)
  const [isChecked, setChecked] = useState(false)

  function onCheck(e, checked) {
    setChecked(checked)
  }

  return (
    <JobDetailModalWrap
      title="Cài đặt"
      open={props.isOpen}
      setOpen={props.setOpen}
      confirmRender={() => null}
      cancelRender={() => "Thoát"}
      maxWidth='sm'
      className="CreateJobSetting"
    >
      <React.Fragment>
        <Typography>
          <Checkbox checked={isChecked} onChange={onCheck} />
          Hiện nhóm công việc trong danh sách công việc
          </Typography>
      </React.Fragment>
    </JobDetailModalWrap>
  );
}

export default CreateJobSetting;
