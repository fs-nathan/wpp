import React from 'react';
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
import { useRequiredString } from '../../../../hooks';
import './style.scss';

const LogoBox = ({ className = '', ...props }) =>
  <div 
    className={`view_Department_Create_Modal___logo-box ${className}`}
    {...props}
  />;

function CreateDepartment({ updateDepartment = null, open, setOpen, doCreateRoom, doUpdateRoom }) {

  const [name, setName, errorName] = useRequiredString(get(updateDepartment, 'name', ''), 150);
  const [description, setDescription, errorDescription] = useRequiredString(get(updateDepartment, 'description', ''), 500);
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
        canConfirm={!errorName && !errorDescription}
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
              {get(errorName, 'message', '')}
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
              {get(errorDescription, 'message', '')}
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
