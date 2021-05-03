import { getMember, getMemberNotAssigned } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AddMemberModal from '../../../ListPart/ListHeader/AddMemberModal';
import HeaderTab from '../../HeaderTab';
import '../../HeaderTab/styles.scss';
import { get } from 'lodash';


function TabHeader({ setShow }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const {manage_member} = useSelector(state => get(state, 'taskDetail.detailTask.taskDetails.permissions', {}));
  const [openAddModal, setOpenAddModal] = React.useState(false);
  function onClickCreateMember() {
    setOpenAddModal(true)
    dispatch(getMember({ task_id: taskId }))
    dispatch(getMemberNotAssigned({ task_id: taskId }))
  }
  return (
    <div className="container-member-tabheader">
      <HeaderTab title={t('LABEL_CHAT_TASK_THANH_VIEN')}
        buttonTooltipText={t('LABEL_CHAT_TASK_THEM_THANH_VIEN')}
        onClickBack={() => setShow(0)}
        onClickOpen={onClickCreateMember}
        rightIcon={null}
      />
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
    </div>
  );
}

export default TabHeader;
