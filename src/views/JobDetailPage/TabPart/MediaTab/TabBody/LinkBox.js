import { List, ListItem, ListItemText, ListSubheader, Typography } from '@material-ui/core';
import { mdiLink } from '@mdi/js';
import Icon from '@mdi/react';
import { normalizeUrl } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MenuListItem from './MenuListItem';

const HeaderSubText = styled(ListSubheader)`
  font-size: 13px;
  color: #6e6d6d;
`

const ListItemLink = styled(ListItem)`
  padding-left: 0;
  & > *:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 23px;
  }
  & > div:nth-child(2) {
    word-break: break-word;
    width: 300px;
  }
`

const LinkBox = (props) => {
  const { t } = useTranslation();
  // console.log("link::",);
  const link = useSelector(state => state.taskDetail.media.links);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <List subheader={<li />}>
      {link.links && link.links.map((item, idx) => {
        return item.links.length > 0 && (
          <div className="styled-list-item-link linkBox" key={idx}>
            <HeaderSubText component='p' style={{ padding: 0, margin: 0 }}>{item.date_create}</HeaderSubText>
            {item.links.map((item, idx) => {
              return (
                <ListItemLink key={idx} className="linkBoxItem">
                  <Typography component='div'>
                    <Icon path={mdiLink} size={1.4} color={'green'} />
                  </Typography>
                  <ListItemText>
                    <a
                      href={normalizeUrl(item.url)}
                      target="_blank"
                      rel="noopener noreferrer">
                      {item.url}
                    </a>
                  </ListItemText>
                  {/* <div className="styled-menu-link">
                    <ListItemIcon>
                      <IconButton className="linkBox--button"
                        onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                        <Icon path={mdiDotsHorizontal} size={1} />
                      </IconButton>
                    </ListItemIcon>
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
                  </Menu> */}
                  <MenuListItem item={item} colorIcon={'#000'} />
                </ListItemLink>
              )
            })}
          </div>
        )
      })}
    </List>
  );

}

export default LinkBox