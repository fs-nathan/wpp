// import { Scrollbars } from 'react-custom-scrollbars';
import { mdiFileDocumentBoxOutline, mdiFileMoveOutline, mdiFileUndoOutline, mdiFolderOpenOutline, mdiGoogleDrive } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import './styles.scss';

export const menuList = [
  {
    key: 'projectDocument',
    title: 'Tài liệu dự án',
    icon: mdiFileDocumentBoxOutline,
    color: '#4caf50',
  },
  {
    key: 'sharedFromMe',
    title: 'Đã chia sẻ',
    icon: mdiFileMoveOutline,
    color: '#f44336',
  },
  {
    key: 'sharedWithMe',
    title: 'Được chia sẻ với tôi',
    icon: mdiFileUndoOutline,
    color: '#607d8b',
  },
  {
    key: 'myDocument',
    title: 'Tài liệu của tôi',
    icon: mdiFolderOpenOutline,
    color: '#ff9800',
  },
  {
    key: 'googleDrive',
    title: 'Google Drive',
    icon: mdiGoogleDrive,
    color: '#2196f3',
  }
];

export const DEFAULT_ITEM = menuList[3];

const MenuList = ({ onChangeMenu }) => {

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
          <span className="menu-text">{menu.title}</span>
        </div>
      ))}
    </div>
  );
};

export default MenuList