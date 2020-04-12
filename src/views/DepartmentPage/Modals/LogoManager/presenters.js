import { Avatar, ButtonBase } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import CustomModal from '../../../../components/CustomModal';
import ErrorBox from '../../../../components/ErrorBox';
import LoadingBox from '../../../../components/LoadingBox';
import './style.scss';

const LogoList = ({ className = '', tall = false, ...props }) =>
  <div
    className={`view_Department_Logo_Modal___logo-list${tall ? '-tall' : ''} ${className}`}
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

const CustomTypo = ({ className = '', ...props }) =>
  <ColorTypo
    className={`view_Department_Logo_Modal___typo ${className}`}
    {...props}
  />

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
  const { t } = useTranslation();

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={t('DMH.VIEW.DP.MODAL.LOGO.TITLE')}
      onConfirm={() => handleSelectIcon(selectedIcon)}
      cancleRender={() => isSelect ? t('DMH.VIEW.DP.MODAL.LOGO.CANCLE') : t('DMH.VIEW.DP.MODAL.LOGO.EXIT')}
      confirmRender={isSelect ? () => t('DMH.VIEW.DP.MODAL.LOGO.DONE') : null}
      loading={icons.loading}
    >
      {icons.error !== null
        ? <ErrorBox />
        : <>
          <CustomTypo>{t('DMH.VIEW.DP.MODAL.LOGO.DEFAULT')}</CustomTypo>
          <LogoList>
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
          <CustomTypo>{t('DMH.VIEW.DP.MODAL.LOGO.UPLOADED')}</CustomTypo>
          <LogoList tall={true}>
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
                    content: t('DMH.VIEW.DP.MODAL.LOGO.ALERT'),
                    onConfirm: () => handleDeleteIcon(icon)
                  })}
                >
                  {mutateIcon.loading
                    ? <LoadingBox size={8} />
                    : t('DMH.VIEW.DP.MODAL.LOGO.DEL')}
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
                {t('DMH.VIEW.DP.MODAL.LOGO.UPLOAD')}
              </ColorButton>
            )}
        </>
      }
    </CustomModal>
  )
}

export default LogoManager;
