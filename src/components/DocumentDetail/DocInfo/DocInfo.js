import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDotsVertical, mdiChevronRight } from '@mdi/js';
import { connect } from 'react-redux';
import ColorTypo from '../../ColorTypo';
import '../DocumentDetail.scss';
import AlertModal from '../../AlertModal';
import EditDocumentInfoModal from '../../../views/DocumentPage/TablePart/DocumentComponent/EditDocumentInfoModal';
import { deleteDocumentInfo } from '../../../actions/documents';

const DocInfo = ({ closeComment, fileInfo, handleFetchData }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState(false);
  const [visible, setVisible] = useState(false);
  const openMoreMenu = Boolean(anchorEl);

  const handleClickMoreAction = e => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const listInfo = [
    { name: t('IDS_WP_DATE_RELEASE'), value: fileInfo.date_released || null },
    { name: t('IDS_WP_VERSION'), value: fileInfo.version || null },
    { name: t('IDS_WP_AUTHOR'), value: fileInfo.author || null },
    { name: t('IDS_WP_USER_APPROVED'), value: fileInfo.user_approved || '' },
    { name: t('IDS_WP_STORAGE_ADDRESS'), value: fileInfo.storage_address || '' }
  ];
  const handleDeleteInfo = async () => {
    try {
      await deleteDocumentInfo({ file_id: fileInfo.id });
      handleFetchData();
    } catch (err) {}
  };
  return (
    <div className="comment-container">
      <div className="header-box-comment">
        <div className="box-title">{t('IDS_WP_DOCUMENT_INFO')}</div>
        <div className="btn-actions-right">
          <div className="btn-action more-action">
            <IconButton
              size="small"
              aria-label="more"
              aria-controls="more-menu"
              aria-haspopup="true"
              onClick={handleClickMoreAction}
            >
              <Icon
                path={mdiDotsVertical}
                size={1}
                color="rgba(0, 0, 0, 0.54)"
              />
            </IconButton>
            <Menu
              id="more-menu"
              anchorEl={anchorEl}
              keepMounted
              open={openMoreMenu}
              onClose={handleCloseMenu}
              transformOrigin={{
                vertical: -30,
                horizontal: 'right'
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  setVisible(true);
                }}
                disabled={!fileInfo.can_modify}
              >
                {t('IDS_WP_EDIT_TEXT')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  setAlert(true);
                }}
                disabled={!fileInfo.can_modify}
              >
                {t('IDS_WP_DELETE_ALL_INFO')}
              </MenuItem>
            </Menu>
          </div>
          <div className="btn-action btn-collapse">
            <IconButton size="small" onClick={closeComment}>
              <Icon
                path={mdiChevronRight}
                size={1}
                color="rgba(0, 0, 0, 0.54)"
              />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="body-box-comment">
        <Scrollbars autoHide autoHideTimeout={500}>
          <div className="comment-item info-item">
            <div className="content-item">
              <div className="header-item">
                <div className="sub-title">{t('IDS_WP_DOCUMENT_NAME')}</div>
                <ColorTypo bold>{fileInfo.name || ''}</ColorTypo>
              </div>
            </div>
            <div className="content-item ">
              <div className="header-item">
                <div className="sub-title">{t('IDS_WP_DOCUMENT_DES')}</div>
                <ColorTypo bold>{fileInfo.description || ''}</ColorTypo>
              </div>
            </div>
          </div>
          {listInfo.map((el, idx) => (
            <div className="comment-item" key={idx}>
              <div className="content-item info-content">
                <div className="header-item">
                  <div className="sub-title full-width">{el.name || ''}</div>
                  <div className="info-item-right full-width">
                    <ColorTypo bold>{el.value}</ColorTypo>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Scrollbars>
      </div>
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={handleDeleteInfo}
      />
      {visible && (
        <EditDocumentInfoModal
          onClose={() => setVisible(null)}
          getData={handleFetchData}
          item={fileInfo}
        />
      )}
    </div>
  );
};

export default connect(
  state => ({
    isLoading: state.documents.isLoading
  }),
  {}
)(DocInfo);
