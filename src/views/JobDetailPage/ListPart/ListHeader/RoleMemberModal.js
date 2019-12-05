import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import AddRoleModal from './AddRoleModal';
import ModalDeleteConfirm from '../../TabPart/ModalDeleteConfirm';



const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: '#f5f8fc'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 400,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const RoleTable = styled(TableCell)`
padding: 15px 15px;
`
const AddRoleButton = styled(Button)`
    border: 1px solid;
    background: #0362fc;
    color: #fff ;
    text-transform: inherit;
    padding: 3px 12px;
   &:hover {
     background: #125fdb;
   }
  `
const HandleButton = styled.div`
    display: flex;  
    justify-content: flex-end;
  & > *:last-child {
    background: #e63737;
    margin-left: 12px;
    color: #fff;
}
`

const UpdateDeleteButton = styled(Button)`
   justify-content: center;
   border: 1px solid #222222;
   background: #fff;
   color: #000000;
   text-transform: inherit;
   padding: 0;
   font-weight: 400; 
   min-width: 42px;
`

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.title} variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: '15px 24px',
  },
}))(MuiDialogActions);

function RoleMemberModal(props) {

  const rows = [
    createData('Nhà đầu tư 2', 'asdassdd'),
    createData('Giám đốc dự án Cần Thơ ', 'Điều hành toàn bộ dự án cần thơ'),
    createData('Theo dõi khách hàng', 'Kiểm tra khách hàng và theo dõi khách hàng mọi lúc mọi nơi bất cứ đâu'),
    createData('Giám sát dự án', 'Giám sát toàn bộ dự án, kể cả lãnh đạo'),
  ];

  function createData(role, description) {
    return { role, description };
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  const [openAddRoleModal, setOpenAddRoleModal] = React.useState(false)
  const [isEditRole, setIsEditRole] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState({ content: ""})
  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const handleOpenModalDelete = () => {
    setOpenDelete(true);
    // setSelectedItem({...item, command_id: item.id})
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const confirmDelete = () => {
    props.deleteCommandByCommandId(selectedItem.id)
  }

  return (
    <div>
      <Dialog maxWidth="sm" fullWidth onClose={handleClose} open={props.isOpen}>
        <DialogTitle onClose={handleClose}>
          Vai trò thành viên
        </DialogTitle>
        <DialogContent dividers>
          <Table>
            <TableHead style={{ backgroundColor: '#eee' }}>
              <TableRow>
                <RoleTable style={{ width: '9%', textAlign: 'center' }}>Chọn</RoleTable>
                <RoleTable style={{ width: '30%' }}>Tên vai trò</RoleTable>
                <RoleTable style={{ width: '30%' }}>Mô tả</RoleTable>
                <RoleTable align="right">
                  <AddRoleButton
                    onClick={() => {
                      // handleClose()
                      setOpenAddRoleModal(true)
                      setIsEditRole(true)
                    }}
                  >+ Thêm mới
                  </AddRoleButton>
                </RoleTable>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (

                <TableRow
                  key={row.role}
                >
                  <TableCell component="th" scope="row">
                    <Checkbox />
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} >{row.role}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <HandleButton>
                      <UpdateDeleteButton
                        onClick={() => {
                          setOpenAddRoleModal(true)
                          setIsEditRole(false)
                        }}>Sửa</UpdateDeleteButton>
                      <UpdateDeleteButton
                      onClick={handleOpenModalDelete}
                      >Xoá</UpdateDeleteButton>
                    </HandleButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() =>
            handleClose()
          } color='secondary'>
            HUỶ
          </Button>
          <Button autoFocus onClick={() =>
            handleClose()
          } color='primary'>
            HOÀN THÀNH
          </Button>
        </DialogActions>
      </Dialog>
      <AddRoleModal
        {...props}
        isOpen={openAddRoleModal}
        setOpen={setOpenAddRoleModal}
        isEditRole={isEditRole}
      />
      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        item={selectedItem}
      ></ModalDeleteConfirm>
    </div>
  );
}

export default RoleMemberModal;