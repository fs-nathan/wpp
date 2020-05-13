import { TextField } from '@material-ui/core';
import { updateSubTask } from 'actions/taskDetail/taskDetailActions';
import DialogWrap from 'components/DialogWrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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
    <DialogWrap
      title={t('LABEL_CHAT_TASK_CHINH_SUA_CONG_VIEC_CON')}
      isOpen={props.isOpen}
      handleClickClose={props.handleClickClose}
      successLabel={t('LABEL_CHAT_TASK_HOAN_THANH')}
      onClickSuccess={onClickComplete}
    >
      <div className="editSubtask--content">
        <TextField
          label={t('LABEL_CHAT_TASK_NOI_DUNG_CONG_VIEC')}
          margin="normal"
          fullWidth
          onChange={e => setStateName(e.target.value)}
          value={name}
        />
      </div>
    </DialogWrap>
  )
}

export default SubtaskModal;