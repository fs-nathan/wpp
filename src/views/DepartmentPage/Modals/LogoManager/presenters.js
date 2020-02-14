import React from 'react';
import { 
  Avatar, ButtonBase,
} from '@material-ui/core';
import ColorButton from '../../../../components/ColorButton';
import CustomModal from '../../../../components/CustomModal';
import ColorTypo from '../../../../components/ColorTypo';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import { get } from 'lodash';
import './style.scss';

const LogoList = ({ className = '', ...props }) => 
  <div 
    className={`view_Department_Logo_Modal___logo-list ${className}`}
    {...props}
  />;

const LogoBox = ({ className = '', isSelect, ...props }) => 
  <div 
    className={`${isSelect 
      ? 'view_Department_Logo_Modal___logo-box-selected'
      : 'view_Department_Logo_Modal___logo-box'
      } ${className}`}
    {...props}
  />;

function LogoManager({ 
  open, setOpen, 
  icons, mutateIcon, isSelect, 
  handleCreateIcon, handleDeleteIcon, handleSelectIcon,
  handleOpenModal
}) {

  const [selectedIcon, setSelectedIcon] = React.useState({
    id: get(icons.defaults[0], 'id'),
    url_sort: get(icons.defaults[0], 'icon'),
    url_full: get(icons.defaults[0], 'url_icon'),
  });

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title='Quản lý biểu tượng'
      onConfirm={() => handleSelectIcon(selectedIcon)}
      cancleRender={() => isSelect ? 'Hủy' : 'Thoát'}
      confirmRender={isSelect ? () => 'Hoàn thành' : null}
    >
      {icons.loading && <LoadingBox />}
      {icons.error !== null && <ErrorBox />}
      {!icons.loading && icons.error === null && (
        <>
          <ColorTypo>Biểu tượng có sẵn</ColorTypo>
          <LogoList cols={8}>
            {icons.defaults.map(icon => (
              <LogoBox 
                key={get(icon, 'url_icon')} 
                isSelect={isSelect && (get(selectedIcon, 'url_sort', 'x') === get(icon, 'icon', 'y'))}
              >
                <ButtonBase 
                  disabled={!isSelect}
                  onClick={() => isSelect && setSelectedIcon({
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
            {icons.createds.map(icon => (
              <LogoBox 
                key={get(icon, 'id', '')} 
                isSelect={isSelect && (get(selectedIcon, 'id', 'x') === get(icon, 'id', 'y'))}
              >
                <ButtonBase 
                  disabled={!isSelect}
                  onClick={() => isSelect && setSelectedIcon(icon)}
                >
                  <Avatar src={get(icon, 'url_full')} alt='avatar' />
                </ButtonBase>
                <ColorButton 
                  fullWidth 
                  variant='text' 
                  size='small' 
                  variantColor='red'
                  onClick={() => handleOpenModal('ALERT', {
                    content: 'Bạn chắc chắn muốn xóa biểu tượng?',
                    onConfirm: () => handleDeleteIcon(icon)
                  })}
                >
                  {mutateIcon.loading 
                    ? <LoadingBox size={8} />
                    : 'Xóa'}
                </ColorButton>      
              </LogoBox>
            ))}
          </LogoList>
          <input
            disabled={mutateIcon.loading}
            accept='image/*'
            id="raised-button-file"
            type="file" 
            onChange={evt => !mutateIcon.loading && handleOpenModal('UPLOAD', {
              image: evt.target.files[0], 
              uploadImage: handleCreateIcon,
            })}
          />
          {mutateIcon.loading 
            ? (
              <ColorButton variant='text' variantColor='green' size='small'>
                <LoadingBox size={16} />
              </ColorButton>
            )
            : (
              <ColorButton variant='text' variantColor='green' size='small' component='label' htmlFor='raised-button-file'>
                + Tải biểu tượng
              </ColorButton>
            )}
        </>
      )}
    </CustomModal>
  )
}

export default LogoManager;
