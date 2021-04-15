import {
  Avatar, FormControl, IconButton, Menu, MenuItem, Paper, Select, Table, TableBody,
  TableCell, TableHead, TableRow
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {mdiDotsVertical} from '@mdi/js';
import Icon from '@mdi/react';
import {deleteMember} from 'actions/taskDetail/taskDetailActions';
import AlertModal from 'components/AlertModal';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import MemberDetail from './MemberDetail';
import MemberPermission from './MemberPermission';
import MemberRole from './MemberRole';
import './styles.scss';

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
  const handleClickEliminate = (id) => (evt) => {
    setSelectedItem(id);
    setAnchorEl(evt.currentTarget);
  }
  const handleCloseEliminate = () => {
    setAnchorEl(null);
  }
  const handleOpenModalDelete = (id) => () => {
    setOpenDelete(true);
    setAnchorEl(null);
  };

  const confirmDelete = () => {
    dispatch(deleteMember({ task_id: taskId, member_id: selectedItem }))
  }

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow style={{ background: '#f7f7f7' }}>
              <TableCell style={{ width: '10%' }}/>
              <TableCell style={{ width: '25%' }}>{t('LABEL_CHAT_TASK_THANH_VIEN')}</TableCell>
              <TableCell style={{ width: '15%', textAlign: "center"}}>{t('LABEL_ASSIGNERS')}</TableCell>
              <TableCell style={{ width: '20%', textAlign: "center"}}>{t('LABEL_CHAT_TASK_NHOM_QUYEN')}</TableCell>
              <TableCell style={{ width: '20%', paddingLeft: 27 }}>{t('LABEL_CHAT_TASK_VAI_TRO')}</TableCell>
              <TableCell style={{ width: '10%' }}/>
            </TableRow>
          </TableHead>
        </Table>
      </Paper>
      <div className="table-scroll">
        <Scrollbars>
          <Table className={classes.table}>
            <TableBody>
              {members.map((item, idx) => (
                <StyledTableRow key={item.id}>
                  <TableCell className="TableMember--cellAvatar" style={{ width: '10%' }}>
                    <Avatar alt="Avatar Member" src={item.avatar} sizes='10px' style={{ width: 30, height: 30 }} />
                  </TableCell>
                  <TableCell style={{ width: '25%' }}>
                    <MemberDetail name={item.name} email={item.email} />
                  </TableCell>
                  <TableCell style={{ width: '15%' }}>
                    <FormControl variant="outlined">
                      <Select className={"TableMember--selectBox"} value={0}>
                        <MenuItem value={0}>Giao việc</MenuItem>
                        <MenuItem value={1}>Đề xuất</MenuItem>
                        <MenuItem value={2}>Thực hiện</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell style={{ width: '20%', textAlign: "center"}}>
                    <MemberPermission {...item} />
                  </TableCell>
                  <TableCell style={{ width: '20%' }}>
                    {
                      item.is_in_group &&
                      <MemberRole roles={item.roles || []} memberId={item.id} />
                    }
                  </TableCell>
                  <StyledMenu>
                    {item.can_ban &&
                      <IconButton size='small' onClick={handleClickEliminate(item.id)} >
                        <Icon path={mdiDotsVertical} size={1} />
                      </IconButton>
                    }
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
        </Scrollbars>
      </div>
      <AlertModal
        open={isOpenDelete}
        setOpen={setOpenDelete}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={confirmDelete}
      />
    </>
  )
}
export default TableMember