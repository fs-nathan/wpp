import React from 'react';
import Button from '@material-ui/core/Button';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import AddRoleModal from './AddRoleModal';
import ModalDeleteConfirm from '../../TabPart/ModalDeleteConfirm';
import { updateRole, deleteRole, createRole, updateRolesForMember } from 'actions/taskDetail/taskDetailActions';
import DialogWrap from 'components/DialogWrap';

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

function RoleMemberModal({
  roles,
  isOpen,
  setOpen,
  memberId,
}) {
  const dispatch = useDispatch();
  const userRoles = useSelector(state => state.taskDetail.taskMember.user_roles);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  const handleClose = () => {
    setOpen(false);
  };

  const [openAddRoleModal, setOpenAddRoleModal] = React.useState(false)
  const [isEditRole, setIsEditRole] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState()
  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const [valueNameEdit, setValueNameEdit] = React.useState('')
  const [valueDesEdit, setValueDesEdit] = React.useState('')
  const [valueIdEdit, setValueIdEdit] = React.useState('')
  const [selectedRoles, setSelectedRoles] = React.useState([])

  React.useEffect(() => {
    setSelectedRoles(roles.map(role => role.id))
  }, [roles])
  const handleOpenModalDelete = (id) => {
    setSelectedItem(id);
    setOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const addData = (name, description) => {
    dispatch(createRole({ name, description }))
  }
  const confirmDelete = () => {
    dispatch(deleteRole({ user_role_id: selectedItem }))
  }

  const editData = (id, name, description) => {
    dispatch(updateRole({ user_role_id: id, name, description }))
  }

  const handleUpdateRolesForMember = (id, name, description) => {
    dispatch(updateRolesForMember({ role_id: selectedRoles, task_id: taskId, member_id: memberId }))
    handleClose()
  }

  // const [check, setCheck] = React.useState(true)
  function setData(data, check) {
    if (check === false) {
      const index = selectedRoles.indexOf(item => item === data)
      selectedRoles.splice(index, 1)
    } else {
      selectedRoles.push(data)
    }
    setSelectedRoles([...selectedRoles])
  }

  function onClickAddRole() {
    setOpenAddRoleModal(true)
    setValueNameEdit("")
    setValueDesEdit("")
    setIsEditRole(false)
  }

  function onClickUpdate(item) {
    return () => {
      setValueNameEdit(item.name)
      setValueDesEdit(item.description)
      setValueIdEdit(item.id)
      setOpenAddRoleModal(true)
      setIsEditRole(true)
    }
  }

  return (
    <div>
      <DialogWrap
        title="Vai trò thành viên"
        isOpen={isOpen}
        handleClickClose={handleClose}
        successLabel="Cập nhật"
        onClickSuccess={handleUpdateRolesForMember}
      >
        <React.Fragment>
          <Table>
            <TableHead style={{ backgroundColor: '#eee' }}>
              <TableRow>
                <RoleTable style={{ width: '9%', textAlign: 'center' }}>Chọn</RoleTable>
                <RoleTable style={{ width: '30%' }}>Tên vai trò</RoleTable>
                <RoleTable style={{ width: '30%' }}>Mô tả</RoleTable>
                {/* <RoleTable align="right">
                  <AddRoleButton
                    onClick={onClickAddRole}
                  >+ Thêm mới
                  </AddRoleButton>
                </RoleTable> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                userRoles.map((item, key) => (
                  <TableRow
                    key={key}
                  >
                    <TableCell component="th" scope="row">
                      <Checkbox
                        checked={selectedRoles.find(role => role === item.id)}
                        onChange={(e) => {
                          setData(item.id, e.target.checked)
                        }}
                      />
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} >{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    {/* <TableCell>
                      <div className="handle-button">
                        <UpdateDeleteButton
                          onClick={onClickUpdate(item)}>Sửa</UpdateDeleteButton>
                        <UpdateDeleteButton
                          onClick={() => handleOpenModalDelete(item.id)}
                        >Xoá</UpdateDeleteButton>
                      </div>
                    </TableCell> */}
                  </TableRow>
                )
                )}
            </TableBody>
          </Table>
        </React.Fragment>
      </DialogWrap>
      <AddRoleModal
        addData={addData}
        editData={editData}
        valueName={valueNameEdit}
        valueDes={valueDesEdit}
        valueId={valueIdEdit}
        isOpen={openAddRoleModal}
        setOpen={setOpenAddRoleModal}
        isEditRole={isEditRole}
      />
      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDelete}
        handleCloseModalDelete={handleCloseModalDelete}
      ></ModalDeleteConfirm>
    </div>
  );
}

export default RoleMemberModal;