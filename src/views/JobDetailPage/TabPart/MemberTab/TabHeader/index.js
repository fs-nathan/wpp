import React from 'react';
import AddMemberModal from '../../../ListPart/ListHeader/AddMemberModal'
import HeaderTab from '../../HeaderTab';

import '../../HeaderTab/styles.scss';

function TabHeader({ setShow }) {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  return (
    <div className="container-member-tabheader">
      <HeaderTab title="Thành viên"
        onClickBack={() => setShow(0)}
        onClickOpen={() => setOpenAddModal(true)}
      />
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
    </div>
  );
}

export default TabHeader;
