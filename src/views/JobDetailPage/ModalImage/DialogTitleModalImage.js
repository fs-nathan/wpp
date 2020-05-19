import { Avatar, IconButton, ListItem, ListItemText, Typography, withStyles } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { mdiDownload, mdiInformation, mdiRotateLeft, mdiRotateRight, mdiShare } from '@mdi/js';
import Icon from '@mdi/react';
import { actionDownloadFile } from 'actions/documents';
import { getDialogDate } from 'helpers/jobDetail/stringHelper';
import compact from 'lodash/compact';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import './styles.scss';

const styles = theme => ({
  closeButton: {
    color: theme.palette.grey[500],
  },
});

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

const DialogTitleModalImage = withStyles(styles)(props => {
  const { t } = useTranslation();
  const dateFormat = useSelector(state => state.system.profile.format_date);

  const { children, classes, onClose,
    user_create_avatar, user_create_name = '', time_create = '',
    user_create_position = '', image,
    onClickShare,
    onClickDetail,
    onClickRotateLeft,
    onClickRotateRight,
    ...other } = props;

  function onClickDownload() {
    actionDownloadFile(image)
  }
  const formattedTime = getDialogDate(time_create, dateFormat)

  return (
    <MuiDialogTitle className="DialogTitleModalImage" disableTypography {...other}>
      <Typography className="DialogTitleModalImage--user" component={'div'}>
        <TitleImg component='div'>
          <ListItem>
            {user_create_avatar && <Avatar src={user_create_avatar} />}
            <ListItemText
              style={{ margin: 0 }}
              primary={
                <Typography component='div'>
                  {user_create_position}
                </Typography>
              }
              secondary={
                <Typography component='div'>
                  {compact([user_create_name, formattedTime]).join(' - ')}
                </Typography>
              }
            />
          </ListItem>
        </TitleImg>
      </Typography>
      <Typography className="DialogTitleModalImage--rotate" component={'div'}>
        <IconButton onClick={onClickRotateLeft}>
          <Icon path={mdiRotateLeft} size="30px" color={'#fff'} />
        </IconButton>
        <IconButton onClick={onClickRotateRight}>
          <Icon path={mdiRotateRight} size="30px" color={'#fff'} />
        </IconButton>
      </Typography>
      <Typography className="DialogTitleModalImage--GroupActionButton" component='div'>
        <ButtonAction component='div' onClick={onClickDownload}>
          <Icon path={mdiDownload} size={1} color={'#fff'} />
          <Typography component='div'>{t('LABEL_CHAT_TASK_TAI_XUONG')}</Typography>
        </ButtonAction>
        <ButtonAction component='div' onClick={onClickShare}>
          <Icon path={mdiShare} size={1} color={'#fff'} />
          <Typography component='div'>{t('LABEL_CHAT_TASK_CHIA_SE')}</Typography>
        </ButtonAction>
        <ButtonAction component='div' onClick={onClickDetail}>
          <Icon path={mdiInformation} size={1} color={'#fff'} />
          <Typography component='div'>{t('LABEL_CHAT_TASK_CHI_TIET')}</Typography>
        </ButtonAction>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Typography>
    </MuiDialogTitle>
  );
});

export default DialogTitleModalImage
