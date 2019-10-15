import React from 'react';
import styled from 'styled-components';
import { 
  Fade, Dialog, DialogTitle, DialogContent, 
  DialogActions, Avatar, ButtonBase, IconButton,
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js'; 
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import colorPal from '../../../../helpers/colorPalette';
import avatar from '../../../../assets/avatar.jpg';
import { connect } from 'react-redux';
import { listIcon } from '../../../../actions/icon/listIcon';
import { createIcon } from '../../../../actions/icon/createIcon';
import { deleteIcon } from '../../../../actions/icon/deleteIcon';
import _ from 'lodash';
import { CustomEventListener, CustomEventDispose, CREATE_ICON, DELETE_ICON } from '../../../../constants/events';

const StyledDialogContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > input[type=file] {
    display: none;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  & > h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const LogoList = styled(({ cols, ...rest }) => <div {...rest} />)`
  display: grid;
  grid-template-rows: 70px;
  grid-template-columns: ${props => props.cols ? `repeat(${props.cols}, 70px)` : 'auto'};
  & > * {
    justify-self: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
`;

const LogoBox = styled(({ isSelected, ...rest }) => <div {...rest} />)`
  & > button {
    text-transform: none;
    &:first-child {
      padding: 5px;
      border-radius: 100%;
      border: 1px solid ${props => props.isSelected ? colorPal['green'][0] : 'rgba(0, 0, 0, 0)'};
    }
    &:last-child > span {
      font-size: 11px;
    }
  }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
}); 

function LogoManager({ open, setOpen, listIcon, doListIcon, createIcon, doCreateIcon, deleteIcon, doDeleteIcon, onSelectIcon = (icon_url) => null }) {

  const { data: { icons }, error: listIconError, loading: listIconLoading } = listIcon;
  const { error: deleteIconError, loading: deleteIconLoading } = deleteIcon;
  const { error: createIconError, loading: createIconLoading } = createIcon;
  const error = listIconError || deleteIconError;
  const [selectedIcon, setSelectedIcon] = React.useState(icons[0]);

  React.useEffect(() => {
    doListIcon();
  }, [doListIcon]);

  React.useEffect(() => {
    const doListIconHandler = () => {
      doListIcon();
    }

    CustomEventListener(CREATE_ICON, doListIconHandler);
    CustomEventListener(DELETE_ICON, doListIconHandler);

    return () => {
      CustomEventDispose(CREATE_ICON, doListIconHandler);
      CustomEventDispose(DELETE_ICON, doListIconHandler);
    }
  }, [doListIcon]);

  

  function selectIcon(iconId) {
    setOpen(false);
    onSelectIcon(selectedIcon);
  }

  function handleDeleteIcon(icon) {
    doDeleteIcon({
      iconId: _.get(icon, 'id'),
    })
  }

  function handleUploadIcon(evt) {
    const icon = evt.target.files[0];
    doCreateIcon({
      icon,
    })
  }

  return (
    <Dialog
      maxWidth='sm'
      fullWidth
      open={open}
      TransitionComponent={Transition}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-slide-title"
    >
      <StyledDialogTitle id="alert-dialog-slide-title">
        <ColorTypo uppercase>Quản lý biểu tượng</ColorTypo>
        <IconButton onClick={() => setOpen(false)}>
          <Icon path={mdiClose} size={1} />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        {listIconLoading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!listIconLoading && error === null && (
          <React.Fragment>
            <ColorTypo>Biểu tượng có sẵn</ColorTypo>
            <LogoList cols={8}>
              {Array.from({ length: 4 }).map((icon, index) => (
                <LogoBox key={index}>
                  <ButtonBase>
                    <Avatar src={avatar} alt='avatar' />
                  </ButtonBase>
                </LogoBox>
              ))}
            </LogoList>
            <ColorTypo>Biểu tượng tải lên</ColorTypo>
            <LogoList cols={8}>
              {icons.map(icon => (
                <LogoBox key={_.get(icon, 'id', '')} isSelected={_.get(selectedIcon, 'id', 'x') === _.get(icon, 'id', 'y')}>
                  <ButtonBase onClick={() => setSelectedIcon(icon)}>
                    <Avatar src={_.get(icon, 'url_full')} alt='avatar' />
                  </ButtonBase>
                  <ColorButton fullWidth variant='text' size='small' variantColor='red'
                    onClick={() => handleDeleteIcon(icon)}
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
              onChange={handleUploadIcon}
            />
            <ColorButton variant='text' variantColor='green' size='small' component='label' htmlFor='raised-button-file'>
              {createIconLoading && <LoadingBox size={16} />}
              {createIconError !== null && 'Xảy ra lỗi'}
              {!createIconLoading && createIconError === null && `+ Tải biểu tượng`}
            </ColorButton>
          </React.Fragment>
        )}
      </StyledDialogContent>
      <DialogActions>
        <ColorButton onClick={() => selectIcon(selectedIcon)} variant='text' variantColor='green'>
          Hoàn thành
        </ColorButton>
      </DialogActions>
    </Dialog>
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
    doListIcon: () => dispatch(listIcon()),
    doCreateIcon: ({ icon }) => dispatch(createIcon({ icon })),
    doDeleteIcon: ({ iconId }) => dispatch(deleteIcon({ iconId })),
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(LogoManager);
