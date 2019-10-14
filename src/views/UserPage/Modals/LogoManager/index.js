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
import avatar from '../../../../assets/avatar.jpg';
import colorPal from '../../../../helpers/colorPalette';
import { connect } from 'react-redux';
import { listIcon } from '../../../../actions/icon/listIcon';
import _ from 'lodash';

const StyledDialogContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
  border-bottom: 1px solid rgba(0, 0, 0, .1);
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

function LogoManager({ open, setOpen, listIcon, doListIcon, onSelectIcon = (icon_url) => null }) {

  const { data: { icons }, error, loading } = listIcon;
  const [selectedIcon, setSelectedIcon] = React.useState(null);

  React.useEffect(() => {
    doListIcon();
  }, [doListIcon]);

  function selectIcon(iconId) {
    setOpen(false);
    onSelectIcon(selectedIcon);
  }

  return (
    <Dialog
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
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!loading && error === null && (
          <React.Fragment>
            <ColorTypo>Biểu tượng có sẵn</ColorTypo>
            <LogoList cols={4}>
              {icons.map(icon => (
                <LogoBox key={_.get(icon, 'id', '')} isSelected={_.get(selectedIcon, 'id', 'x') === _.get(icon, 'id', 'y')}>
                  <ButtonBase onClick={() => setSelectedIcon(icon)}>
                    <Avatar src={_.get(icon, 'url_full')} alt='avatar' />
                  </ButtonBase>
                </LogoBox>
              ))}
            </LogoList>
            <ColorTypo>Biểu tượng tải lên</ColorTypo>
            <LogoList cols={4}>
              {Array.from({ length: 3 }).map((_, index) => (
                <LogoBox key={index}>
                  <ButtonBase>
                    <Avatar src={avatar} alt='avatar' />
                  </ButtonBase>
                  <ColorButton fullWidth variant='text' size='small' variantColor='red'>Xóa</ColorButton>
                </LogoBox>
              ))}
            </LogoList>
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
  }
}

const mapDispathToProps = dispatch => {
  return {
    doListIcon: () => dispatch(listIcon()),
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(LogoManager);
