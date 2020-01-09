import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { useTranslation } from 'react-i18next';
import { mdiClose, mdiMagnify } from '@mdi/js';
import { InputAdornment, InputBase } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import * as services from '../DrawerService';
import {
  actionVisibleDrawerMessage,
  actionToast
} from '../../../actions/system/system';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import ItemGroupAcount from './ItemGroupAcount';
import '../Drawer.scss';
import select_group_bg from '../../../assets/select_group_bg.png';

const DrawerNewGroup = props => {
  const { t } = useTranslation();
  const [group, setGroup] = useState({});
  const [groupRequire, setGroupRequire] = useState({});
  const [emptyMess, setEmptyMess] = useState(null);
  const { anchorDrawer } = props;

  const handleFetchData = async () => {
    try {
      const { data } = await services.listGroupService();
      setGroupRequire(data);
    } catch (err) {}
  };
  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    props.actionVisibleDrawerMessage({ type: '', anchor: anchorDrawer });
  };
  const handleSearch = async e => {
    const searchValue = document.getElementById('searchTextId').value;
    try {
      const res = await services.findGroupService(searchValue);
      if (!res.data.group) {
        setEmptyMess('Không tìm thấy tài khoản!');
        setGroup({});
      } else {
        setEmptyMess(null);
        setGroup(res.data.group);
      }
    } catch (err) {
      setEmptyMess(null);
    }
  };
  const bgColor = props.colors.find(item => item.selected === true);
  return (
    <div className="drawer-content-container">
      <div className="drawer-content-left">
        <div className="drawer-content new-group-drawer">
          <div className="header-drawer-content-group-account">
            <span className="text-header">{t('IDS_WP_JOIN_NEW_GROUP')}</span>
            <span className="btn-close" onClick={handleClose}>
              <Icon path={mdiClose} size={1} color="rgba(0, 0, 0, 0.54)" />
            </span>
          </div>
          <div className="join-group-new join-group-search">
            <p className="search-group-title">
              {t('IDS_WP_INPUT_GROUP_WANT_JOIN')}
            </p>
            <div className="search-group-container">
              <InputBase
                id="searchTextId"
                className="search-group-box"
                placeholder={t('IDS_WP_INPUT_ID_GROUP')}
                autoFocus
                startAdornment={
                  <InputAdornment position="start">
                    <Icon path={mdiMagnify} size={1.3} color="#8e8e8e" />
                  </InputAdornment>
                }
              />
              <span className="filter-action" onClick={handleSearch}>
                Lọc
              </span>
            </div>
          </div>
          <div className="content-group-account join-group-container">
            <Scrollbars autoHide autoHideTimeout={500}>
              <div className="item-group">
                {(!isEmpty(group) || emptyMess) && (
                  <div className="title-item-group">
                    <span className="text-item-group">KẾT QUẢ LỌC ĐƯỢC</span>
                  </div>
                )}

                {!isEmpty(group) ? (
                  <ItemGroupAcount
                    item={group}
                    type="join"
                    handleFetchData={handleFetchData}
                  />
                ) : (
                  emptyMess && <p className="red-text">{emptyMess}</p>
                )}
              </div>
              {/* nhóm requirements */}
              {!isEmpty(groupRequire.requirements) && (
                <div className="item-group">
                  <div className="title-item-group">
                    <span className="text-item-group">
                      {t('IDS_WP_REQUEST_GROUP')}
                    </span>
                  </div>
                  {groupRequire.requirements.map((group, idx) => (
                    <ItemGroupAcount
                      item={group}
                      key={idx}
                      type="requirements"
                      handleFetchData={handleFetchData}
                    />
                  ))}
                </div>
              )}
            </Scrollbars>
          </div>
        </div>
      </div>
      <div className="drawer-content-right">
        <div className="right-content-container">
          <p className="right-header-text" style={{ color: bgColor.color }}>
            {t('IDS_WP_CONNECT_DES')}
          </p>
          <p>{t('IDS_WP_CONNECT_SUB_DES')}</p>
          <img src={select_group_bg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer,
    toast: state.system.toast,
    colors: state.setting.colors
  }),
  {
    actionVisibleDrawerMessage,
    actionToast
  }
)(DrawerNewGroup);
