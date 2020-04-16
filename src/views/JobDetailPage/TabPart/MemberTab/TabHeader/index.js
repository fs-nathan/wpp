import { getMember, getMemberNotAssigned } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddMemberModal from '../../../ListPart/ListHeader/AddMemberModal';
import HeaderTab from '../../HeaderTab';
import '../../HeaderTab/styles.scss';


function TabHeader({ setShow }) {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  function onClickCreateMember() {
    setOpenAddModal(true)
    dispatch(getMember({ task_id: taskId }))
    dispatch(getMemberNotAssigned({ task_id: taskId }))
  }
  return (
    <div className="container-member-tabheader">
      <HeaderTab title="Thành viên"
        onClickBack={() => setShow(0)}
        onClickOpen={onClickCreateMember}
      />
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
    </div>
  );
}

export default TabHeader;
