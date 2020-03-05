import React from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiSettings } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import AddMemberModal from '../../../ListPart/ListHeader/AddMemberModal'

const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`

function TabHeader({ setShow }) {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  return (
    <div className="container-member-tabheader">
      <ButtonIcon onClick={() => setShow(0)}>
        <Icon path={mdiChevronLeft} size={1} />
      </ButtonIcon>
      <ColorTypo uppercase bold style={{ fontSize: 17 }}> Thành viên</ColorTypo>
      <div>
      <ButtonIcon onClick={() => setOpenAddModal(true)}>
        <Icon path={mdiSettings} size={1} />
      </ButtonIcon>
      {/* modal */}
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal} />
      </div>
    </div>
  );
}

export default TabHeader;
