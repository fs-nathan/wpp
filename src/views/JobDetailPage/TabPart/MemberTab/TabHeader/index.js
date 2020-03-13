import React from 'react';
import { IconButton } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiPlus } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import AddMemberModal from '../../../ListPart/ListHeader/AddMemberModal'

import '../../HeaderTab/styles.scss';

function TabHeader({ setShow }) {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  return (
    <div className="container-member-tabheader">
      <IconButton className="headerTab--button" onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft} size={1} />
      </IconButton>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}> Thành viên</ColorTypo>
      <div>
      <IconButton className="headerTab--button" onClick={() => setOpenAddModal(true)}>
        <Icon path={mdiPlus} size={1} />
      </IconButton>
      {/* modal */}
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
      </div>
    </div>
  );
}

export default TabHeader;
