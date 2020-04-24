import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { mdiChevronLeft, mdiChevronRight, mdiKey } from '@mdi/js';
import Icon from '@mdi/react';
import { updatePermission } from "actions/taskDetail/taskDetailActions";
import clsx from "clsx";
import DialogWrap from 'components/DialogWrap';
import get from "lodash/get";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from 'styled-components';
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
    <div className={clsx("permissionItem", { "permissionItem__checked": props.checked })} align="center">{props.radio}
      <Radio
        className="permissionItem--radio"
        checked={props.checked}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  )
}

function CustomArrow({ path, className, isDisabled, onClick }) {
  return (
    <Icon
      path={path}
      className={clsx(className, { "customArrow__disabled": isDisabled })}
      onClick={!isDisabled && onClick}
    />
  );
}

function PermissionMemberModal({ memberId, setOpen,
  isOpen
}) {
  const dispatch = useDispatch();
  const listGroupPermission = useSelector(state => state.taskDetail.listGroupPermission.permissions);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [selectedValue, setSelectedValue] = React.useState(0);
  const selectedPermission = get(listGroupPermission[selectedValue], 'permissions', [])
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
      title="Phân quyền thành viên"
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel="Hoàn thành"
      onClickSuccess={handleUpdateMemberPermission}
      maxWidth="md"
      className="permissionMemberModal"
    >
      <React.Fragment>
        <div className="permissionMemberModal--title">Chọn nhóm quyền</div>
        <div className="permissionMemberModal--content">Mỗi nhóm bao gồm 1 số quyền. Nhóm quyền do chủ sở hữu hoặc người được phần quyền tạo lập. Nếu không có nhóm quyền phù hợp hãy liên hệ chủ sở hữu.</div>
        <div className="permissionMemberModal--slider">
          <Slider adaptiveHeight variableWidth infinite={false}
            nextArrow={<CustomArrow path={mdiChevronRight} isDisabled={listGroupPermission.length < 5} />}
            prevArrow={<CustomArrow path={mdiChevronLeft} isDisabled={listGroupPermission.length < 5} />}
            settings={{ dots: false, slidesToShow: 5, adaptiveHeight: true }}
          >
            {listGroupPermission.map((group, i) =>
              <PriorityTable key={group.name} radio={group.name} value={i} checked={selectedValue === i} onChange={handleChange} />
            )}
          </Slider>
        </div>
        <Table>
          <TableHead>
            <RowTable>
              <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>&nbsp;</CellTable>
              <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>Tên quyền</CellTable>
              <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>Mô tả</CellTable>
            </RowTable>
          </TableHead>
          <TableBody>
            {selectedPermission.map(row => (
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
export default PermissionMemberModal