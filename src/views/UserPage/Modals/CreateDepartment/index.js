import React from 'react';
import styled from 'styled-components';
import { TextField, Avatar } from '@material-ui/core';
import LogoManagerModal from '../LogoManager';
import CustomModal from '../../../../components/CustomModal';
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import ErrorBox from '../../../../components/ErrorBox';
import LoadingBox from '../../../../components/LoadingBox';
import { createRoom } from '../../../../actions/room/createRoom';
import { updateRoom } from '../../../../actions/room/updateRoom';
import { connect } from 'react-redux';
import _ from 'lodash';

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

function CreateDepartment({ updateDepartment = null, open, setOpen, createRoom, doCreateRoom, updateRoom, doUpdateRoom }) {

  const [name, setName] = React.useState(_.get(updateDepartment, 'name', ''));
  const [description, setDescription] = React.useState(_.get(updateDepartment, 'description', ''));
  const __icon = _.get(updateDepartment, 'icon', 'https://storage.googleapis.com/storage_vtask_net/1568456743119-teamwork.png');
  const [icon, setIcon] = React.useState({
    url_full: __icon,
    url_sort: __icon.replace('https://storage.googleapis.com', ''),
  });
  const [openLogoModal, setOpenLogoModal] = React.useState(false);

  const loading = updateDepartment ? updateRoom.loading : createRoom.loading;
  const error = updateDepartment ? updateRoom.error : createRoom.error;

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
        roomId: _.get(updateDepartment, 'id'),
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
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!loading && error === null && (
          <React.Fragment>
            <TextField
              value={name}
              onChange={evt => setName(evt.target.value)}
              margin="normal"
              variant="outlined"
              label='Tên Phòng/Ban/Nhóm'
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
              label='Mô tả Phòng/Ban/Nhóm'
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
              <Avatar src={icon.url_full} alt='avatar' />
            </LogoBox>
          </React.Fragment>
        )}
      </CustomModal>
      <LogoManagerModal open={openLogoModal} setOpen={setOpenLogoModal} onSelectIcon={onSelectIcon} />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    createRoom: state.room.createRoom,
    updateRoom: state.room.updateRoom,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doCreateRoom: ({ name, icon, description }) => dispatch(createRoom({ name, icon, description })),
    doUpdateRoom: ({ roomId, name, icon, description }) => dispatch(updateRoom({ roomId, name, icon, description })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDepartment);
