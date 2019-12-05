import React, { useState } from 'react';
import Icon from '@mdi/react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { TableCell, IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiDotsVertical } from '@mdi/js';
import ShareDocumentModal from '../../views/DocumentPage/TablePart/DocumentComponent/ShareDocumentModal';
import MoveDocumentModal from '../../views/DocumentPage/TablePart/DocumentComponent/MoveDocumentModal';
import ChangeDocumentModal from '../../views/DocumentPage/TablePart/DocumentComponent/ChangeDocumentModal';

const StyledTableBodyCell = styled(TableCell)`
  padding: 11px;
  &:nth-child(4) > * {
    justify-content: flex-start;
  }
`;
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
  const handleShareDoc = () => {
    console.log('item selected', props.item);
  };
  const handleChangeDoc = () => {
    console.log('item selected', props.item);
  };
  const handleMoveDoc = () => {
    console.log('item selected', props.item);
  };

  return (
    <React.Fragment>
      <StyledTableBodyCell>
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
              if (el.type === 'share') setVisible('share');
              if (el.type === 'move') setVisible('move');
              if (el.type === 'change') setVisible('change');
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
          onClose={() => setVisible(null)}
          onOk={handleShareDoc}
          item={props.item}
        />
      )}
      {visible === 'move' && (
        <MoveDocumentModal
          onClose={() => setVisible(null)}
          onOk={handleMoveDoc}
          item={props.item}
        />
      )}
      {visible === 'change' && (
        <ChangeDocumentModal
          onClose={() => setVisible(null)}
          onOk={handleChangeDoc}
          item={props.item}
        />
      )}
    </React.Fragment>
  );
};

export default withRouter(MoreAction);
