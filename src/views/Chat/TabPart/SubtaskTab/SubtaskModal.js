import { TextField } from '@material-ui/core';
import { updateSubTask } from 'actions/taskDetail/taskDetailActions';
import TitleSectionModal from 'components/TitleSectionModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import './styles.scss';

const SubtaskModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [name, setStateName] = React.useState(props.name);
  function onClickComplete() {
    dispatch(
      updateSubTask({ sub_task_id: props.task.id, name, taskId })
    )
    props.handleClickClose()
  }
  return (

    <JobDetailModalWrap
      title={t('LABEL_CHAT_TASK_CHINH_SUA_CONG_VIEC_CON')}
      open={props.isOpen}
      setOpen={props.handleClickClose}
      confirmRender={() => t('LABEL_CHAT_TASK_HOAN_THANH')}
      onConfirm={onClickComplete}
      className="editSubtask modal_height_20vh"
    >
      <div className="editSubtask--content">
        <TitleSectionModal label={t('LABEL_CHAT_TASK_NOI_DUNG_CONG_VIEC')} isRequired />
        <TextField
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={e => setStateName(e.target.value)}
          value={name}
        />
      </div>
    </JobDetailModalWrap>
  )
}

export default SubtaskModal;