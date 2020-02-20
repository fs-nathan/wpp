import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  FormControlLabel,
  Checkbox,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';

import { List, arrayMove } from 'react-movable';
import Icon from '@mdi/react';
import { mdiDragVertical, mdiDotsVertical } from '@mdi/js';
import PickColorModal from './PickColorModal';
import './SettingGroupRight.scss';

function MoreAction({ idx, onUpdate }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnChangeStatus = status => {
    onUpdate(idx, status);
    setAnchorEl(null);
  };

  return (
    <div onClick={evt => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        size="small"
        onClick={handleClick}
      >
        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ vertical: -30, horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleOnChangeStatus(1)}>
          {t('IDS_WP_ON')}
        </MenuItem>
        <MenuItem onClick={() => handleOnChangeStatus(0)}>
          {t('IDS_WP_OFF')}
        </MenuItem>
      </Menu>
    </div>
  );
}

const SetUp = props => {
  const { t } = useTranslation();
  const [items, setItems] = useState([
    { name: t('IDS_WP_CALENDAR_WEEK'), status: 1 },
    { name: t('IDS_WP_DEADLINE_JOB'), status: 1 },
    { name: t('IDS_WP_TOP_MEMBER'), status: 1 },
    { name: t('IDS_WP_LAW_DES'), status: 0 }
  ]);
  const [visibleModal, setVisibleModal] = useState(false);
  const { colors } = props;
  const bgColor = colors.find(item => item.selected === true);

  const handleChangeStatus = (idx, status) => {
    const newArr = [...items];
    newArr[idx].status = status;
    setItems(newArr);
  };

  return (
    <div className="setup-info">
      <div className="setup-info-left">
        <div className="title">{t('IDS_WP_SETTING_MENU_LEFT')}</div>
        <div className="sub-title">{t('IDS_WP_SETTING_SHOW_MENU_LEFT')}</div>
        <div className="setup-content">
          <div className="setup-menu-list">
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox ccolor="primary" />}
              label={t('IDS_WP_HOME')}
            />
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_PROJECT')}
            />
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_JOB')}
            />
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_REPORT')}
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_BUDGET')}
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_SUGGEST')}
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_PROCESS')}
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_ARCHIVAL')}
            />
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_DOCUMENT')}
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_CALENDAR_REMINDER')}
            />
            <FormControlLabel
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_POSITION')}
            />
            <FormControlLabel
              disabled
              checked
              className="cb-item"
              control={<Checkbox color="primary" />}
              label={t('IDS_WP_MEMBER')}
            />
          </div>

          <div className="setting-bg-left-menu">
            <span className="lb-text">{t('IDS_WP_SELECT_MENU_LEFT')}</span>
            <span
              className="pick-color"
              style={{ background: bgColor.color }}
              onClick={() => setVisibleModal(true)}
            ></span>
            <PickColorModal
              open={visibleModal}
              setOpen={val => setVisibleModal(val || false)}
            />
          </div>
        </div>
      </div>
      {/* <Divider orientation="vertical" className="divider-vertical" /> */}
      <div className="setup-info-right">
        <div className="title">{t('IDS_WP_SETTING_PLUGIN_HOME')}</div>
        <div className="sub-title">{t('IDS_WP_ENABLE_DISABLE_PLUGIN')}</div>
        <div className="plugin-content">
          <List
            values={items}
            onChange={({ oldIndex, newIndex }) =>
              setItems(arrayMove(items, oldIndex, newIndex))
            }
            renderList={({ children, props, isDragged }) => (
              <ul
                {...props}
                style={{
                  cursor: isDragged ? 'grabbing' : 'inherit'
                }}
                className="drag-drop-wrapper"
              >
                {children}
              </ul>
            )}
            renderItem={({ value, index, props, isDragged, isSelected }) => (
              <li
                {...props}
                style={{
                  ...props.style,
                  cursor: isDragged ? 'grabbing' : 'inherit',
                  backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'
                }}
                className="drag-item "
              >
                <div className="item-wrapper">
                  <div className="drag-content">
                    <span
                      data-movable-handle
                      style={{ cursor: isDragged ? 'grabbing' : 'grab' }}
                      tabIndex={-1}
                    >
                      <Icon path={mdiDragVertical} size={1} />
                    </span>
                    <div className="ml-3">{value.name}</div>
                  </div>
                  <div className="action-item">
                    <span
                      className={
                        'status-plugin ' + (value.status ? 'is-active' : '')
                      }
                    >
                      {value.status ? t('IDS_WP_ON') : t('IDS_WP_OFF')}
                    </span>
                    <MoreAction idx={index} onUpdate={handleChangeStatus} />
                  </div>
                </div>
              </li>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  {}
)(SetUp);
