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
    className={`view_ProjectGroup_Create_ProjectGroup___logo-box ${className}`}
    {...props}
  />;

function CreateProjectGroup({ 
  updatedProjectGroup, 
  open, setOpen, 
  handleCreateOrEditProjectGroup, handleOpenModal 
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 300);
  const [icon, setIcon] = React.useState({
    url_full: 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png',
    url_sort: '/storage_vtask_net/Icon_default/bt0.png',
  });

  React.useEffect(() => {
    setName(get(updatedProjectGroup, 'name'));
    setDescription(get(updatedProjectGroup, 'description'));
    setIcon({
      url_full: get(updatedProjectGroup, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png'),
      url_sort: get(updatedProjectGroup, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png')
        .replace('https://storage.googleapis.com', ''),
    });
  }, [updatedProjectGroup, setName, setDescription]);

  return (
    <CustomModal
      title={`${updatedProjectGroup ? 'Cập nhật' : 'Tạo'} nhóm dự án`}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrEditProjectGroup(name, description, icon)}
    >
      <TextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        margin="normal"
        variant="outlined"
        label='Tên nhóm dự án'
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
        label='Mô tả nhóm dự án'
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
          <ColorTypo>Biểu tượng nhóm</ColorTypo>
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
  )
}

export default CreateProjectGroup;
