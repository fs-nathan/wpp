import { DialogContent } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { mdiChevronLeft, mdiChevronRight, mdiKey, mdiTrashCan } from '@mdi/js';
import Icon from '@mdi/react';
import { removeGroupPermissionOfMember, updatePermission } from "actions/taskDetail/taskDetailActions";
import clsx from "clsx";
import DialogWrap from 'components/DialogWrap';
import get from "lodash/get";
import React from "react";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
  const { t } = useTranslation();
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
  const { t } = useTranslation();
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

  function onClickDelete() {
    dispatch(removeGroupPermissionOfMember(taskId, memberId))
    handleClose()
  }

  return (
    <DialogWrap
      title={t('LABEL_CHAT_TASK_PHAN_QUYEN_THANH_VIEN')}
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel={t('LABEL_CHAT_TASK_HOAN_THANH')}
      onClickSuccess={handleUpdateMemberPermission}
      maxWidth="md"
      className="permissionMemberModal"
    >
      <DialogContent>
        <div className="permissionMemberModal--title">{t('LABEL_CHAT_TASK_CHON_NHOM_QUYEN')}</div>
        <div className="permissionMemberModal--content">{t('LABEL_CHAT_TASK_MOI_NHOM_BAO_GOM')}</div>
        {listGroupPermission.length > 0 ?
          <>
            <div className="permissionMemberModal--delete" onClick={onClickDelete}>
              <Icon path={mdiTrashCan} size={1}></Icon>
              {t('LABEL_CHAT_TASK_XOA_NHOM_QUYEN_DA_CHON')}
            </div>
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
                  <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>{t('LABEL_CHAT_TASK_TEN_QUYEN')}</CellTable>
                  <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>{t('LABEL_CHAT_TASK_MO_TA')}</CellTable>
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
          </>
          :
          <div className="permissionItem--noPermissions">
            <img className="permissionItem--noPermissionsImg" src="/images/no-data.png" alt='no permission'></img>
            <div className="permissionItem--noPermissionsFooter">{t('LABEL_CHAT_TASK_HIEN_TAI_CHUA_CO_PEMISSION')}</div>
          </div>
        }
      </DialogContent>

    </DialogWrap>
  );
}
export default PermissionMemberModal