import React from "react";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Radio from "@material-ui/core/Radio";
import { useSelector, useDispatch } from 'react-redux';
import { mdiCheckboxMarked, mdiKey } from '@mdi/js';
import Icon from '@mdi/react';
import styled from 'styled-components';
import DialogWrap from 'components/DialogWrap';
import { updatePermission } from "actions/taskDetail/taskDetailActions";

import './styles.scss';

const RowTable = styled(TableRow)`
& > *:not(first-child) {
    & > *:nth-child(1) {
        display: flex;
        flex-direction : column;
        margin: auto;   
        width: 16px;
        height: 16px;
    }
}
`
const CellTable = styled(TableCell)`
    padding: 8px;
`

function PriorityTable(props) {
  return (
    <TableCell className={clsx("permissionItem", { "permissionItem__checked": props.checked })} align="center">{props.radio}
      <Radio
        className="permissionItem--radio"
        checked={props.checked}
        onChange={props.onChange}
        value={props.value}
      />
    </TableCell>
  )
}

function PriorityMemberModal({ memberId, setOpen,
  isOpen
}) {
  const dispatch = useDispatch();
  const listGroupPermission = useSelector(state => state.taskDetail.listGroupPermission.permissions);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [selectedValue, setSelectedValue] = React.useState(0);

  const handleChange = (event) => {
    setSelectedValue(parseInt(event.target.value));
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleUpdateMemberPermission() {
    dispatch(updatePermission({ task_id: taskId, member_id: memberId, group_permission_id: listGroupPermission[selectedValue].id }))
    handleClose()
  }

  return (
    <DialogWrap
      title="Phân quyền thành viên trong công việc"
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel="Cập nhật"
      onClickSuccess={handleUpdateMemberPermission}
      maxWidth="md"
    >
      <React.Fragment>
        <div>Chọn nhóm quyền</div>
        <div>Mỗi nhóm bao gồm 1 số quyền. Nhóm quyền do chủ sở hữu hoặc người được phần quyền tạo lập. Nếu không có nhóm quyền phù hợp hãy liên hệ chủ sở hữu.</div>
        {listGroupPermission.map((group, i) =>
          <PriorityTable key={group.name} radio={group.name} value={i} checked={selectedValue === i} onChange={handleChange} />
        )}
        <Table>
          <TableHead>
            <RowTable>
              <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>&nbsp;</CellTable>
              <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>Tên quyền</CellTable>
              <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>Mô tả</CellTable>
            </RowTable>
          </TableHead>
          <TableBody>
            {listGroupPermission[selectedValue].permissions.map(row => (
              <TableRow key={row.name}>
                <CellTable align="center"><Icon path={mdiKey} size={1} /></CellTable>
                <CellTable component="th" scope="row" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                  {row.name}
                </CellTable>
                <CellTable >{row.description}</CellTable>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </DialogWrap>
  );
}
export default PriorityMemberModal