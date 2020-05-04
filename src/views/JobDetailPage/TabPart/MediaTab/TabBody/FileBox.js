import { IconButton, List, ListItem, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsHorizontal, mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';
import iconDoc from 'assets/doc.png';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const FileBox = (props) => {
  const { t } = useTranslation();
  const file = useSelector(state => state.taskDetail.media.file);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <List>
      {file.files && file.files.map((item, idx) => {
        return (
          <ListItem className="fileBoxItem" key={idx}>
            <img src={iconDoc} alt='avatar' />
            <div className="fileBoxItem--content" >
              <div className="fileBoxItem--name">{item.name}</div>
              <div className="fileBoxItem--downloaded">
                <IconButton className="fileBoxItem--button" size='small'>
                  <a href={item.url}>
                    <Icon path={mdiDownload} size={1} />
                  </a>
                </IconButton>
                {item.size}
              </div>
            </div>
            <div>
              <div className="fileBoxItem--createdAt">{item.date_create}</div>
              <IconButton className="fileBoxItem--buttonMenu" size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                <Icon path={mdiDotsHorizontal} size={1} ></Icon>
              </IconButton>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{
                vertical: -30,
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClose}>{t('LABEL_CHAT_TASK_CHIA_SE')}</MenuItem>
              <MenuItem onClick={handleClose}>{t('LABEL_CHAT_TASK_XEM_TIN_NHAN')}</MenuItem>
              <MenuItem onClick={handleClose}>{t('LABEL_CHAT_TASK_XOA')}</MenuItem>
            </Menu>
          </ListItem>
        )
      })}
    </List>
  );
}

export default FileBox