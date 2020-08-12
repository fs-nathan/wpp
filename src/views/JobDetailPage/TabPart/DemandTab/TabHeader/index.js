import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createCommand, getCommand } from '../../../../../actions/taskDetail/taskDetailActions';
import { taskIdSelector } from '../../../selectors';
import HeaderTab from '../../HeaderTab';
import DemandModal from '../DemandModal';
import get from 'lodash/get';

function TabHeader(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const {
    manage_command_decision
  } = useSelector(state => get(state, 'taskDetail.detailTask.taskDetails.permissions', {}));

  useEffect(() => {
    dispatch(getCommand({ task_id: taskId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId])
  const [open, setOpen] = React.useState(false)
  // console.log('props nè', props )
  const handleClickOpen = () => {
    setOpen(true);
  };

  const confirmCreateCommand = ({ content, type }) => {
    dispatch(createCommand({ task_id: taskId, content, type }))
  }
  return (
    <div className="container-normal-tabheader">
      <HeaderTab title={t('LABEL_CHAT_TASK_CHI_DAO_QUYET_DINH')}
        buttonTooltipText={t('LABEL_CHAT_TASK_TAO_MOI')}
        onClickBack={() => props.setShow(0)}
        onClickOpen={handleClickOpen}
        rightIcon={manage_command_decision ? 'add' : null}
      />
      {/* modal chi dao quyet dinh */}
      <DemandModal
        isOpen={open}
        setOpen={setOpen}
        taskId={taskId}
        confirmCreateCommand={confirmCreateCommand}
        item={{ content: "", type: -1 }}
        {...props}
      />
    </div>
  );
}

export default TabHeader;
