import React from 'react';
import { 
  Avatar, ButtonBase,
} from '@material-ui/core';
import CropModal from '../../../../components/ImageCropper/ImageCropper';
import ColorButton from '../../../../components/ColorButton';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import AlertModal from '../../../../components/AlertModal';
import { connect } from 'react-redux';
import { listIcon } from '../../../../actions/icon/listIcon';
import { createIcon } from '../../../../actions/icon/createIcon';
import { deleteIcon } from '../../../../actions/icon/deleteIcon';
import { get } from 'lodash';
import './style.scss';

const LogoList = ({ className = '', ...props }) => 
  <div 
    className={`view_Department_Logo_Modal___logo-list ${className}`}
    {...props}
  />;

const LogoBox = ({ className = '', isSelected, ...props }) => 
  <div 
    className={`${isSelected 
      ? 'view_Department_Logo_Modal___logo-box-selected'
      : 'view_Department_Logo_Modal___logo-box'
      } ${className}`}
    {...props}
  />;

function LogoManager({ open, setOpen, listIcon, createIcon, doCreateIcon, deleteIcon, doDeleteIcon, onSelectIcon = (icon_url) => null }) {

  const { data: { icons, defaults }, error: listIconError, loading: listIconLoading } = listIcon;
  const { error: deleteIconError, loading: deleteIconLoading } = deleteIcon;
  const { loading: createIconLoading } = createIcon;
  const error = listIconError || deleteIconError;
  const [selectedIcon, setSelectedIcon] = React.useState({
    id: get(defaults[0], 'id'),
    url_sort: get(defaults[0], 'icon'),
    url_full: get(defaults[0], 'url_icon'),
  });
  const [delIcon, setDelIcon] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [crop, setCrop] = React.useState(false);

  React.useEffect(() => {
    setSelectedIcon({  
      id: get(defaults[0], 'id'),
      url_sort: get(defaults[0], 'icon'),
      url_full: get(defaults[0], 'url_icon'),
    });
  }, [defaults]);

  function selectIcon(iconId) {
    setOpen(false);
    onSelectIcon(selectedIcon);
  }

  function handleDeleteIcon(icon) {
    doDeleteIcon({
      iconId: get(icon, 'id'),
    });
  }

  function handleUploadIcon(evt) {
    const icon = evt.target.files[0];
    setImage(icon);
    setCrop(true);
  }

  function uploadIcon(icon) {
    doCreateIcon({
      icon,
    });
  }

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title='Quản lý biểu tượng'
      onConfirm={() => selectIcon(selectedIcon)}
    >
      {listIconLoading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!listIconLoading && error === null && (
          <React.Fragment>
            <ColorTypo>Biểu tượng có sẵn</ColorTypo>
            <LogoList cols={8}>
              {defaults.map(icon => (
                <LogoBox key={get(icon, 'url_icon')} isSelected={get(selectedIcon, 'url_sort', 'x') === get(icon, 'icon', 'y')}>
                  <ButtonBase onClick={() => setSelectedIcon({
                    id: get(icon, 'id'),
                    url_sort: get(icon, 'icon'),
                    url_full: get(icon, 'url_icon'),
                  })}>
                    <Avatar src={get(icon, 'url_icon')} alt='avatar' />
                  </ButtonBase>
                </LogoBox>
              ))}
            </LogoList>
            <ColorTypo>Biểu tượng tải lên</ColorTypo>
            <LogoList cols={8}>
              {icons.map(icon => (
                <LogoBox key={get(icon, 'id', '')} isSelected={get(selectedIcon, 'id', 'x') === get(icon, 'id', 'y')}>
                  <ButtonBase onClick={() => setSelectedIcon(icon)}>
                    <Avatar src={get(icon, 'url_full')} alt='avatar' />
                  </ButtonBase>
                  <ColorButton fullWidth variant='text' size='small' variantColor='red'
                    onClick={() => {
                      setDelIcon(icon);
                      setAlert(true);
                    }}
                  >
                    {deleteIconLoading && <LoadingBox size={8} />}
                    {!deleteIconLoading && 'Xóa'}
                  </ColorButton>      
                </LogoBox>
              ))}
            </LogoList>
            <input
              accept='image/*'
              id="raised-button-file"
              type="file" 
              onChange={evt => {
                if (createIconLoading) {
                  return;
                }
                handleUploadIcon(evt);
              }}
            />
            {createIconLoading && (
              <ColorButton variant='text' variantColor='green' size='small'>
                <LoadingBox size={16} />
              </ColorButton>
            )}
            {!createIconLoading && (
              <ColorButton variant='text' variantColor='green' size='small' component='label' htmlFor='raised-button-file'>
                + Tải biểu tượng
              </ColorButton>
            )}
            <AlertModal 
              open={alert}
              setOpen={setAlert}
              content='Bạn chắc chắn muốn xóa biểu tượng?'
              onConfirm={() => handleDeleteIcon(delIcon)}
            />
            <CropModal open={crop} setOpen={setCrop} cropType='LOGO' image={image} uploadImage={uploadIcon} />
          </React.Fragment>
        )}
    </CustomModal>
  )
}

const mapStateToProps = state => {
  return {
    listIcon: state.icon.listIcon,
    createIcon: state.icon.createIcon,
    deleteIcon: state.icon.deleteIcon,
  }
}

const mapDispathToProps = dispatch => {
  return {
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doCreateIcon: ({ icon }) => dispatch(createIcon({ icon })),
    doDeleteIcon: ({ iconId }) => dispatch(deleteIcon({ iconId })),
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(LogoManager);
