import React from 'react';
import styled from 'styled-components';
import {Avatar,  Menu, MenuItem} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import { useSelector } from 'react-redux';

import ColorChip from '../../../../../components/ColorChip';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';
import { ButtonIcon,ItemList } from './AllSubtaskListItem';


const Badge = styled(ColorChip)`
  border-radius: 3px !important;
`

const CustomMenu = styled(Menu)`
  & > .MuiPaper-root {
    box-shadow: none;
    border: 1px solid rgba(0,0,0,.1);
    & > ul {
      padding : 0;
      & > li {
        padding : 10px 20px;
      }
    }
  }
`

const StyledListItemComplete = styled.li`
  padding-left: 30px;
  display: flex;
  align-items: center;
`

const StyledMenuComplete = styled.div`
  & > *:first-child {
    margin-right: 8px;
  }
  display: none;
  ${StyledListItemComplete}:hover & {
    display: inline;
  }
`

const FinishedSubtaskListItemTextSecondary = styled.span`
  display: flex;
  align-items: baseline;
  & > *:first-child {
    margin-right: 10px;
  }
`;

const FinishedSubtaskList = (props) => {
  const completeSubTasks = useSelector(state => state.taskDetail.subTask.completeSubTasks);
  // bien modal delete
  const [isOpenDel, setOpenDel] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("")

  // const [data] = React.useState([1, 2, 3, 4]);
  // const [isHover, setIsHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(evt, id) {
    setSelectedId(id)
    setAnchorEl(evt.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null);
  }


  const handleOpenModalDelete = () => {
    console.log(selectedId)
    setOpenDel(true)
    setAnchorEl(null)
  };
  const handleCloseModalDelete = () => {
    setOpenDel(false);
  };
  const confirmDelete = () => {
    // deleteSubTaskByTaskId(task)
    // console.log('taskId::::', props);
  }

  return (
    <ul style={{ padding: 0 }}>

      {completeSubTasks.map((item, index) => {
        return (
          <StyledListItemComplete key={index}>
            <Avatar style={{ marginRight: 13 }} src={item.user_complete_avatar} alt='avatar' />
            <ItemList
              primary={`${item.name}`}
              secondary={
                <FinishedSubtaskListItemTextSecondary>
                  <Badge component='small' color='bluelight' badge size='small' label={'Hoàn thành'} />
                  lúc {item.time_complete}
                </FinishedSubtaskListItemTextSecondary>
              }
            />
            <StyledMenuComplete>
              <ButtonIcon onClick={e => handleClick(e, item.id)} aria-haspopup="true">
                <Icon path={mdiDotsVertical} size={1} />
              </ButtonIcon>

            </StyledMenuComplete>

          </StyledListItemComplete>
        );
      })}

      <CustomMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -10,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleOpenModalDelete}>Xóa</MenuItem>
      </CustomMenu>

      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDel}
        handleCloseModalDelete={handleCloseModalDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        {...props}
      />
    </ul>
  );
}

export default FinishedSubtaskList