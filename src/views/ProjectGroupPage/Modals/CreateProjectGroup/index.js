import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import LogoManagerModal from '../../../DepartmentPage/Modals/LogoManager';
import CustomModal from '../../../../components/CustomModal';
import CustomAvatar from '../../../../components/CustomAvatar';
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import ErrorBox from '../../../../components/ErrorBox';
import LoadingBox from '../../../../components/LoadingBox';
import { createProjectGroup } from '../../../../actions/projectGroup/createProjectGroup';
import { editProjectGroup } from '../../../../actions/projectGroup/editProjectGroup';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useRequiredString } from '../../../../hooks';

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

function CreateProjectGroup({ updateProjectGroup = null, open, setOpen, createProjectGroup, doCreateProjectGroup, editProjectGroup, doEditProjectGroup }) {

  const [name, setName, errorName] = useRequiredString(get(updateProjectGroup, 'name', ''), 150);
  const [description, setDescription, errorDescription] = useRequiredString(get(updateProjectGroup, 'description', ''), 300);
  const __icon = get(updateProjectGroup, 'icon', 'https://storage.googleapis.com/storage_vtask_net/Icon_default/bt0.png');
  const [icon, setIcon] = React.useState({
    url_full: __icon,
    url_sort: __icon.replace('https://storage.googleapis.com', ''),
  });
  const [openLogoModal, setOpenLogoModal] = React.useState(false);

  const loading = updateProjectGroup ? editProjectGroup.loading : createProjectGroup.loading;
  const error = updateProjectGroup ? editProjectGroup.error : createProjectGroup.error;

  function onSelectIcon(iconURL) {
    setIcon(iconURL);
  }

  function handleCreateProjectGroup() {
    if (updateProjectGroup === null) {
      doCreateProjectGroup({
        name,
        description,
        icon: icon.url_sort,
      }); 
    } else {
      doEditProjectGroup({
        projectGroupId: get(updateProjectGroup, 'id'),
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
        title={`${updateProjectGroup ? 'Cập nhật' : 'Tạo'} nhóm dự án`}
        open={open}
        setOpen={setOpen}
        canConfirm={!errorName && !errorDescription}
        onConfirm={() => handleCreateProjectGroup()}
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
                <ColorButton color='primary' onClick={() => setOpenLogoModal(true)}>+ Chọn biểu tượng</ColorButton>
              </div>
              <CustomAvatar src={icon.url_full} alt='avatar' />
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
    createProjectGroup: state.projectGroup.createProjectGroup,
    editProjectGroup: state.projectGroup.editProjectGroup,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doCreateProjectGroup: ({ name, icon, description }) => dispatch(createProjectGroup({ name, icon, description })),
    doEditProjectGroup: ({ projectGroupId, name, icon, description }) => dispatch(editProjectGroup({ projectGroupId, name, icon, description })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProjectGroup);
