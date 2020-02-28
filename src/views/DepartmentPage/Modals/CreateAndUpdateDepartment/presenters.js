import React from 'react';
import { TextField } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import CustomAvatar from '../../../../components/CustomAvatar';
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import { get } from 'lodash';
import { useRequiredString, useMaxlenString } from '../../../../hooks';
import './style.scss';

const LogoBox = ({ className = '', ...props }) =>
  <div 
    className={`view_Department_Create_Modal___logo-box ${className}`}
    {...props}
  />;

function CreateAndUpdateDepartment({ 
  updateDepartment = null, 
  open, setOpen, 
  handleCreateOrUpdateRoom, 
  handleOpenModal,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 500);
  const [icon, setIcon] = React.useState({
    url_full: 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png',
    url_sort: '/storage_vtask_net/Icon_default/bt0.png',
  });

  React.useEffect(() => {
    if (updateDepartment) {
      setName(get(updateDepartment, 'name', ''));
      setDescription(get(updateDepartment, 'description', ''));
      setIcon({
        url_full: get(updateDepartment, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png'),
        url_sort: get(updateDepartment, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png')
          .replace('https://storage.googleapis.com', ''),
      });
    }
  }, [updateDepartment, setName, setDescription]);

  return (
    <React.Fragment>
      <CustomModal
        title={`${updateDepartment ? 'Cập nhật' : 'Tạo'} bộ phận`}
        open={open}
        setOpen={setOpen}
        onConfirm={() => handleCreateOrUpdateRoom(name, description, icon)}
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
            <ColorButton 
              color='primary' 
              onClick={() => handleOpenModal('LOGO', {
                doSelectIcon: icon => setIcon(icon),
              })}
            >+ Chọn biểu tượng</ColorButton>
          </div>
          <CustomAvatar src={icon.url_full} alt='avatar' />
        </LogoBox>
      </CustomModal>
    </React.Fragment>
  )
};

export default CreateAndUpdateDepartment;
