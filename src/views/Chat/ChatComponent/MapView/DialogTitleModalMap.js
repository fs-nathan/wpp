import { Avatar, IconButton, ListItem, ListItemText, Typography, withStyles } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { mdiDownload, mdiInformation, mdiRotateLeft, mdiRotateRight, mdiShare } from '@mdi/js';
import Icon from '@mdi/react';
import { actionDownloadFile } from 'actions/documents';
import { getUpdateProgressDate } from 'helpers/jobDetail/stringHelper';
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
            & > div:nth-child(2) {
                color: #9c9797;
                font-size: 13px
            }
        }
    }
`

const DialogTitleModalMap = withStyles(styles)(props => {
  const { t } = useTranslation();
  const dateFormat = useSelector(state => state.system.profile.format_date);

  const { children, classes, onClose,
    user_share_avatar, user_share = '', time_create = '',
    user_create_position = '', image,
    date_create, room, roles,
    address,
    ...other } = props;

  function onClickDownload() {
    actionDownloadFile(image)
  }
  const formattedTime = getUpdateProgressDate(time_create, 'dd/MM/yyyy')

  return (
    <MuiDialogTitle className="DialogTitleModalMap" disableTypography {...other}>
      <Typography className="DialogTitleModalMap--user" component={'div'}>
        <TitleImg component='div'>
          <ListItem>
            {user_share_avatar && <Avatar src={user_share_avatar} />}
            <ListItemText
              style={{ margin: 0 }}
              primary={
                <Typography component='div' className="DialogTitleModalMap--address" >
                  {address}
                </Typography>
              }
              secondary={
                <Typography component='div'>
                  {t('LABEL_CHAT_TASK_CHIS_SE_LUC_USER_TIME', { user: `${user_share} - ${[...roles, room].join(' ')}`, time: `${time_create} ${date_create}` })}
                </Typography>
              }
            />
          </ListItem>
        </TitleImg>
      </Typography>
      <Typography className="DialogTitleModalMap--rotate" component={'div'}>
        &nbsp;
      </Typography>
      <Typography className="DialogTitleModalMap--GroupActionButton" component='div'>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Typography>
    </MuiDialogTitle>
  );
});

export default DialogTitleModalMap
