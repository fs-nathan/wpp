import React, { useState } from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import ShareDocumentModal from '../../views/DocumentPage/TablePart/DocumentComponent/ShareDocumentModal';
import MoveDocumentModal from '../../views/DocumentPage/TablePart/DocumentComponent/MoveDocumentModal';
import ChangeDocumentModal from '../../views/DocumentPage/TablePart/DocumentComponent/ChangeDocumentModal';
import { StyledTableBodyCell } from '../../views/DocumentPage/TablePart/DocumentComponent/TableCommon';
import {
  actionRenameFile,
  actionRenameFolder,
  actionDownloadFile
} from '../../actions/documents';
import { actionToast } from '../../actions/system/system';
import { isEmpty } from '../../helpers/utils/isEmpty';

const StyledMenuItem = styled(MenuItem)`
  border-bottom: ${props => (props.border ? '1px solid #ddd' : 'none')};
`;

const MoreAction = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(null);

  const handleToast = (type, message) => {
    props.actionToast(type, message);
    setTimeout(() => props.actionToast(null, ''), 2000);
  };
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
    e.stopPropagation();
  };
  const handleClose = () => setAnchorEl(null);
  const closeModal = () => setVisible(null);
  const handleChangeDoc = async newName => {
    try {
      if (props.item.type === 'folder') {
        const { data } = await actionRenameFolder({
          folder_id: props.item.id,
          name: newName
        });
        handleToast('success', 'Thay đổi tên folder thành công!');
        if (data.state) {
          props.handleUpdateDataLocal(props.item.id, data.new_name);
        }
      } else {
        const { data } = await actionRenameFile({
          file_id: props.item.id,
          name: newName
        });
        handleToast('success', 'Thay đổi tên file thành công!');
        if (data.state) {
          props.handleUpdateDataLocal(props.item.id, data.new_name);
        }
      }
      // props.handleFetData();
      closeModal();
    } catch (error) {
      handleToast('error', error.message);
      closeModal();
    }
  };
  const handleMoveDoc = () => {
    props.handleFetData();
  };

  const handleDownloadFile = () => {
    if (props.item.document_type === 2 || props.item.isGoogleDocument) {
      const urlDownload = props.item.url_download || props.item.webContentLink;
      if (urlDownload) window.open(urlDownload, '_blank');
    } else {
      actionDownloadFile(props.item);
    }
  };
  const handleCopy = () => {
    // webViewLink is for Google Drive
    navigator.clipboard.writeText(
      props.item.url || props.item.webViewLink || ''
    );
  };
  return (
    <React.Fragment>
      <StyledTableBodyCell className="more-action">
        <IconButton
          size="small"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.54)" />
        </IconButton>
      </StyledTableBodyCell>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right'
        }}
      >
        {!isEmpty(props.actionList) &&
          props.actionList.map((el, idx) => (
            <StyledMenuItem
              key={idx}
              onClick={e => {
                handleClose();
                if (el.type === 'download') handleDownloadFile();
                else if (el.type === 'copy') handleCopy();
                else if (el.type === 'link') {
                  props.history.push(props.item.redirect_url);
                } else setVisible(el.type);
                if (el.action) el.action(props.item);
                e.stopPropagation();
              }}
              border={
                idx % 2 === 1 && idx < props.actionList.length - 1
                  ? 'true'
                  : null
              }
            >
              <Icon path={el.icon} size={1} color="rgba(0, 0, 0, 0.54)" />
              &nbsp;&nbsp;&nbsp;{el.text}
            </StyledMenuItem>
          ))}
      </Menu>
      {visible === 'share' && (
        <ShareDocumentModal onClose={closeModal} item={props.item} />
      )}
      {visible === 'move' && (
        <MoveDocumentModal
          onClose={closeModal}
          onOk={handleMoveDoc}
          item={props.item}
        />
      )}
      {visible === 'change' && (
        <ChangeDocumentModal
          onClose={closeModal}
          onOk={handleChangeDoc}
          item={props.item}
        />
      )}
    </React.Fragment>
  );
};

export default connect(
  state => ({
    // toast: state.system.toast
  }),
  { actionToast }
)(withRouter(MoreAction));
