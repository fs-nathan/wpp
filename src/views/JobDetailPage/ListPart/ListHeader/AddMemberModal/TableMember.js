import { useTranslation } from 'react-i18next';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
  Table, TableBody, TableHead, TableRow,
  Paper, TableCell, Menu, MenuItem, IconButton
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import { Avatar, } from '@material-ui/core';
import MemberRole from './MemberRole';
import MemberPermission from './MemberPermission';
import MemberDetail from './MemberDetail';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMember } from 'actions/taskDetail/taskDetailActions';
import ModalDeleteConfirm from '../../../TabPart/ModalDeleteConfirm';

const CustomMenu = styled(Menu)`
& > .MuiPaper-root {
  box-shadow: none;
  border: 1px solid rgba(0,0,0,.1);
  & > ul {
    padding : 0;
    & > li {
      padding : 10px;
    }
  }
}
`

const StyledTableRow = styled(TableRow)`
  &:hover {
      & > *:last-child {
          opacity: 1;
      }
  }
`
const StyledMenu = styled(TableCell)`
    opacity: 0 ;
`

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    boxShadow: 'none'
  },
  table: {
    minWidth: 650,
  },
});

function TableMember(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [selectedItem, setSelectedItem] = React.useState()
  const [isOpenDelete, setOpenDelete] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickEliminate = (evt) => {
    setAnchorEl(evt.currentTarget);
  }
  const handleCloseEliminate = () => {
    setAnchorEl(null);
  }
  const handleOpenModalDelete = (id) => () => {
    setSelectedItem(id);
    setOpenDelete(true);
    setAnchorEl(null);
  };

  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };

  const confirmDelete = () => {
    dispatch(deleteMember({ task_id: taskId, member_id: selectedItem }))
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow style={{ background: '#f7f7f7' }}>
            <TableCell style={{ width: '9%' }}></TableCell>
            <TableCell style={{ width: '40%' }}>{t('LABEL_CHAT_TASK_THANH_VIEN')}</TableCell>
            <TableCell style={{ width: '20%' }}>{t('LABEL_CHAT_TASK_NHOM_QUYEN')}</TableCell>
            <TableCell style={{ width: '32%' }}>{t('LABEL_CHAT_TASK_VAI_TRO')}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

      </Table>
      <div className="table-scroll">
        <Table className={classes.table}>
          <TableBody>
            {members.map((item, idx) => (
              <StyledTableRow key={item.id}>
                <TableCell style={{ width: '9%' }}>
                  <Avatar alt="Avatar Member" src={item.avatar} sizes='10px' style={{ width: 30, height: 30 }} />
                </TableCell>
                <TableCell style={{ width: '40%' }}>
                  <MemberDetail name={item.name} email={item.email} />
                </TableCell>
                <TableCell style={{ width: '20%' }}><MemberPermission permission={item.group_permission} memberId={item.id} /></TableCell>
                <TableCell style={{ width: '32%' }}>
                  <MemberRole roles={item.roles || []} memberId={item.id} />
                </TableCell>
                <StyledMenu >
                  <IconButton size='small' onClick={handleClickEliminate} >
                    <Icon path={mdiDotsVertical} size={1} />
                  </IconButton>
                  <CustomMenu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseEliminate}
                    transformOrigin={{
                      vertical: -10,
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleOpenModalDelete(item.id)}>{t('LABEL_CHAT_TASK_LOAI_TRU')}</MenuItem>
                  </CustomMenu>
                </StyledMenu>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDelete}
        handleCloseModalDelete={handleCloseModalDelete}
      ></ModalDeleteConfirm>
    </Paper>
  )
}
export default TableMember