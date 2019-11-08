import React from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiClose , mdiSettings } from '@mdi/js';
import ColorTypo from '../../../../../components/ColorTypo';
import AddMemberModal from '../../../ListPart/ListHeader/AddMemberModal'

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 85px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > *:first-child {
    margin-right: auto;
    margin-left: 20px;
    font-size: 16px;
  }
`;

function TabHeader({ setShow }) {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  return (
    <Container>
      <ColorTypo uppercase bold>Thành viên</ColorTypo>
      <IconButton>
        <Icon path={mdiSettings} size={1} onClick={() => setOpenAddModal(true)}/>
      </IconButton>
      <IconButton onClick={() => setShow(0)}>
        <Icon path={mdiClose } size={1}/>
      </IconButton>
      <AddMemberModal isOpen={openAddModal} setOpen={setOpenAddModal}/>
    </Container>
  );
}

export default TabHeader;
