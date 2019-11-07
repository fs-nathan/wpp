import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import LogoManagerModal from '../LogoManager';
import CustomModal from '../../../../components/CustomModal';
import CustomAvatar from '../../../../components/CustomAvatar';
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import { createRoom } from '../../../../actions/room/createRoom';
import { updateRoom } from '../../../../actions/room/updateRoom';
import { connect } from 'react-redux';
import { get } from 'lodash';

const LogoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & > div {
    & > *:not(:last-child) {
      margin-bottom: 8px;
    }
    & > button {
      text-transform: none;
    }
  }
`;

function CreateDepartment({ updateDepartment = null, open, setOpen, doCreateRoom, doUpdateRoom }) {

  const [name, setName] = React.useState(get(updateDepartment, 'name', ''));
  const [description, setDescription] = React.useState(get(updateDepartment, 'description', ''));
  const __icon = get(updateDepartment, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png');
  const [icon, setIcon] = React.useState({
    url_full: __icon,
    url_sort: __icon.replace('https://storage.googleapis.com', ''),
  });
  const [openLogoModal, setOpenLogoModal] = React.useState(false);

  function onSelectIcon(iconURL) {
    setIcon(iconURL);
  }

  function handleCreateDepartment() {
    if (updateDepartment === null) {
      doCreateRoom({
        name,
        description,
        icon: icon.url_sort,
      }); 
    } else {
      doUpdateRoom({
        roomId: get(updateDepartment, 'id'),
        name,
        description,
        icon: icon.url_sort,
      });
    }
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        title={`${updateDepartment ? 'Cập nhật' : 'Tạo'} bộ phận`}
        open={open}
        setOpen={setOpen}
        onConfirm={() => handleCreateDepartment()}
      >
        <TextField
          value={name}
          onChange={evt => setName(evt.target.value)}
          margin="normal"
          variant="outlined"
          label='Tên bộ phận'
          fullWidth
          helperText={
            <ColorTypo variant='caption' color='red'>
              Tối đa 150 ký tự
            </ColorTypo>
          }
        />
        <TextField
          value={description}
          onChange={evt => setDescription(evt.target.value)}
          margin="normal"
          variant="outlined"
          label='Mô tả bộ phận'
          fullWidth
          multiline
          rowsMax='4'
          helperText={
            <ColorTypo variant='caption' color='red'>
              Tối đa 150 ký tự
            </ColorTypo>
          }
        />
        <LogoBox>
          <div>  
            <ColorTypo>Biểu tượng</ColorTypo>
            <ColorButton color='primary' onClick={() => setOpenLogoModal(true)}>+ Chọn biểu tượng</ColorButton>
          </div>
          <CustomAvatar src={icon.url_full} alt='avatar' />
        </LogoBox>
      </CustomModal>
      <LogoManagerModal open={openLogoModal} setOpen={setOpenLogoModal} onSelectIcon={onSelectIcon} />
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doCreateRoom: ({ name, icon, description }) => dispatch(createRoom({ name, icon, description })),
    doUpdateRoom: ({ roomId, name, icon, description }) => dispatch(updateRoom({ roomId, name, icon, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateDepartment);
