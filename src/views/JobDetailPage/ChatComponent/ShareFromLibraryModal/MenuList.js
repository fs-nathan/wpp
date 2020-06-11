// import { Scrollbars } from 'react-custom-scrollbars';
import { mdiFileDocumentBoxOutline, mdiFileMoveOutline, mdiFileUndoOutline, mdiFolderOpenOutline, mdiGoogleDrive } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import './styles.scss';
import { useTranslation } from 'react-i18next';

export const menuList = [
  {
    key: 'projectDocument',
    title: 'IDS_WP_PROJECT_DOCUMENT',
    icon: mdiFileDocumentBoxOutline,
    color: '#4caf50',
  },
  {
    key: 'sharedFromMe',
    title: 'IDS_WP_SHARED',
    icon: mdiFileMoveOutline,
    color: '#f44336',
  },
  {
    key: 'sharedWithMe',
    title: 'IDS_WP_SHARE_WITH_ME',
    icon: mdiFileUndoOutline,
    color: '#607d8b',
  },
  {
    key: 'myDocument',
    title: 'IDS_WP_MY_DOCUMENT',
    icon: mdiFolderOpenOutline,
    color: '#ff9800',
  },
  {
    key: 'googleDrive',
    title: 'IDS_WP_GOOGLE_DRIVE',
    icon: mdiGoogleDrive,
    color: '#2196f3',
  }
];

export const DEFAULT_ITEM = menuList[3];

const MenuList = ({ onChangeMenu }) => {
  const { t } = useTranslation()

  const [selectedItem, setSelected] = useState(DEFAULT_ITEM.key);

  function onClickItem(menu) {
    return () => {
      setSelected(menu.key);
      onChangeMenu(menu);
    }
  }

  return (
    <div className="menu-list">
      {menuList.map(menu => (
        <div
          key={menu.key}
          className={`menu-item ${selectedItem === menu.key ? 'selected' : ''}`}
          onClick={onClickItem(menu)}
        >
          <Icon
            className="menu-icon"
            path={menu.icon}
            size={1.4}
            color={menu.color}
          />
          <span className="menu-text">{t(menu.title)}</span>
        </div>
      ))}
    </div>
  );
};

export default MenuList