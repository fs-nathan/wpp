import { DialogContent, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { createRole, deleteRole, updateRole, updateRolesForMember } from 'actions/taskDetail/taskDetailActions';
import DialogWrap from 'components/DialogWrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalDeleteConfirm from '../../TabPart/ModalDeleteConfirm';
import AddRoleModal from './AddRoleModal';
import './styles.scss';

function RoleMemberModal({
  roles,
  isOpen,
  setOpen,
  memberId,
}) {
  const dispatch = useDispatch();
  const userRoles = useSelector(state => state.taskDetail.taskMember.user_roles) || [];
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
    <DialogWrap
      title="Vai trò thành viên"
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel="Cập nhật"
      onClickSuccess={handleUpdateRolesForMember}
      className="RoleMemberModal"
    >
      <DialogContent>
        <Table>
          <TableHead style={{ backgroundColor: '#eee' }}>
            <TableRow>
              <TableCell className="RoleMemberModal--cell" style={{ width: '9%', textAlign: 'center' }}>Chọn</TableCell>
              <TableCell style={{ width: '30%' }}>Tên vai trò</TableCell>
              <TableCell style={{ width: '30%' }}>Mô tả</TableCell>
              {/* <TableCell align="right">
                  <AddRoleButton
                    onClick={onClickAddRole}
                  >+ Thêm mới
                  </AddRoleButton>
                </TableCell> */}
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
      </DialogContent>
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
    </DialogWrap>
  );
}

export default RoleMemberModal;