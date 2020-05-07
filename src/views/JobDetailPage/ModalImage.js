import { Avatar, Dialog, GridListTile, IconButton, ListItem, ListItemText, Typography, withStyles } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import { mdiChevronLeftCircle, mdiChevronRightCircle, mdiDownload, mdiInformation, mdiShare } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const styles = theme => ({
  closeButton: {
    color: theme.palette.grey[500],
  },
});
const GroupTitle = styled(MuiDialogTitle)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #000;
    align-items: center;
    padding: 10px 15px;
`
const TitleImg = styled(Typography)`
    & > li {
        padding: 10px 10px 10px 0;
        & > div:nth-child(1) {
            margin-right: 7px;
        }
        & > div:nth-child(2) {
            & > div:nth-child(1) {
                color: white;
                font-size: 15px
            }
            & > div:nth-child(2) {
                color: white;
                font-size: 13px
            }
        }
    }
`
const GroupActionButton = styled(Typography)`
    display : flex;
    margin-left: -150px;
`
const ButtonAction = styled(Typography)`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &&:not(:last-child) {
        margin-right: 20px;
    }
    & > *:first-child {
        margin-bottom: 3px;
    }
    & > *:last-child {
        text-transform: uppercase;
        font-size: 12px;
        color: #fff;
        font-weight: 200;
    }
`

const DialogTitle = withStyles(styles)(props => {
  const { t } = useTranslation();
  const { children, classes, onClose,
    user_create_avatar, user_create_name, time_create,
    user_create_position, image,
    ...other } = props;

  function onClickDownload() {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.name;
    link.target = '_blank';
    link.click();
  }

  return (
    <GroupTitle disableTypography {...other}>
      <Typography component={'div'}>
        <TitleImg component='div'>
          <ListItem>
            <Avatar src={user_create_avatar} />
            <ListItemText
              style={{ margin: 0 }}
              primary={
                <Typography component='div'>
                  {user_create_position}
                </Typography>
              }
              secondary={
                <Typography component='div'>
                  {`${user_create_name} - ${time_create}`}
                </Typography>
              }
            />
          </ListItem>
        </TitleImg>
      </Typography>
      <GroupActionButton component='div'>
        <ButtonAction component='div' onClick={onClickDownload}>
          <Icon path={mdiDownload} size={1} color={'#fff'} />
          <Typography component='div'>{t('LABEL_CHAT_TASK_TAI_XUONG')}</Typography>
        </ButtonAction>
        <ButtonAction component='div'>
          <Icon path={mdiShare} size={1} color={'#fff'} />
          <Typography component='div'>{t('LABEL_CHAT_TASK_CHIA_SE')}</Typography>
        </ButtonAction>
        <ButtonAction component='div'>
          <Icon path={mdiInformation} size={1} color={'#fff'} />
          <Typography component='div'>{t('LABEL_CHAT_TASK_CHI_TIET')}</Typography>
        </ButtonAction>
      </GroupActionButton>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </GroupTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0
  },
}))(MuiDialogActions);
const StyledDialog = styled(Dialog)`
    & > div > div {    
        background: transparent;
    }
`
const ContentDialog = styled(DialogContent)`
    overflow: hidden;
    background: #161616c9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 0 0 0;
    & > div:nth-child(2) {
        height: 750px;
        width: 1100px;
        background-repeat: no-repeat;
        background-size: cover;
        & > img {
            opacity: 1;
            width: 100%;
            height: 100%;
        }
    }
`

const WrapperImage = styled(GridListTile)`
    height: 80px
`
const FooterDialog = styled(DialogActions)`
    padding : 0;
    background: #161616c9;
    display: flex;
    justify-content: center;
    padding: 5px 0 5px 0;
    & > div {
        display: flex;
        background: #00000091;
        padding: 3px;
        border-radius: 2px;
        width: 1200px;
        z-index: 999;
        overflow-x: scroll;
        ::-webkit-scrollbar {
            display: none;
        }
        & > * {
            list-style-type: none;
            margin: 2px 3px;
        }
    }
`
const ButtonImage = styled(IconButton)`
    padding: 0;
    & > span > svg {
        width: 6.5rem !important;
        height: 6.5rem !important;
        &:hover {
            fill: #ccc;
          }
    }
`

const Image = styled.img`
  height: 80px;
  width: 80px;
  margin: 0;
  padding: 0;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${props => props.selected ? 1 : 0.4};
  object-fit: cover;
  &:hover {
    opacity: 1;
  }
`
const ModalImage = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const [currentImage, setCurrentImage] = useState(props.selected);
  const {
    isOpen,
    handleClose,
    images = [],
    type,
    url,
    selected,
  } = props
  function clickNext() {
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1)
    }
  }
  function clickBack() {
    if (currentImage < 0) {
      setCurrentImage(currentImage - 1)
    }
  }

  useEffect(() => {
    setCurrentImage(selected)
  }, [selected]);

  return (
    <StyledDialog
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      fullScreen={fullScreen}
    >
      <DialogTitle id="customized-dialog-title"
        {...props}
        image={images[currentImage]}
        onClose={handleClose}>
      </DialogTitle>
      <ContentDialog>
        <ButtonImage onClick={clickBack}>
          <Icon path={mdiChevronLeftCircle} size={5} />
        </ButtonImage>
        <div>
          <img alt="vtask" src={images[currentImage] && images[currentImage].url} />
        </div>
        <ButtonImage onClick={clickNext}>
          <Icon path={mdiChevronRightCircle} size={5} />
        </ButtonImage>
      </ContentDialog>
      <FooterDialog>
        <div>
          {
            (type === 'mp4') ?
              <ReactPlayer url={url} playing height="100%" width="100%" />
              :
              images.map((image, index) => {
                return (
                  <WrapperImage
                    onClick={() => setCurrentImage(index)}
                    key={`1-${index}`}>
                    <Image src={image.url} alt='avatar' selected={currentImage === index} />
                  </WrapperImage>
                );
              })
          }
        </div>
      </FooterDialog >
    </StyledDialog >
  )
}

export default ModalImage;