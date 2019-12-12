import React, { useState } from 'react';
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
  actionMoveFile,
  actionDownloadDocument
} from '../../actions/documents';
const StyledMenuItem = styled(MenuItem)`
  border-bottom: ${props => (props.border ? '1px solid #ddd' : 'none')};
`;

const MoreAction = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
    e.stopPropagation();
  };
  const handleClose = () => setAnchorEl(null);
  const closeModal = () => setVisible(null);
  const handleShareDoc = () => {
    console.log('item selected', props.item);
  };
  const handleChangeDoc = async newName => {
    try {
      await actionRenameFile({
        file_id: props.item.id,
        name: newName
      });
      props.handleFetData();
      closeModal();
    } catch (error) {
      closeModal();
    }
  };
  const handleMoveDoc = async folderSelected => {
    try {
      await actionMoveFile({
        file_id: props.item.id,
        folder_id: folderSelected.id
      });
      props.handleFetData();
      closeModal();
    } catch (error) {
      closeModal();
    }
  };
  const handleDownloadFile = async () => {
    console.log(props.item);
    window.open(props.item.url, '_blank');
    try {
      await actionDownloadDocument(props.item.id);
    } catch (error) {
      console.log(error);
    }
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
        {props.actionList.map((el, idx) => (
          <StyledMenuItem
            key={idx}
            onClick={e => {
              handleClose();
              if (el.type === 'download') handleDownloadFile();
              else setVisible(el.type);
              if (el.action) el.action();
              e.stopPropagation();
            }}
            border={
              idx % 2 === 0 && idx < props.actionList.length - 1 ? 'true' : null
            }
          >
            <Icon path={el.icon} size={1} color="rgba(0, 0, 0, 0.54)" />
            &nbsp;&nbsp;&nbsp;{el.text}
          </StyledMenuItem>
        ))}
      </Menu>
      {visible === 'share' && (
        <ShareDocumentModal
          onClose={closeModal}
          onOk={handleShareDoc}
          item={props.item}
        />
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

export default withRouter(MoreAction);
