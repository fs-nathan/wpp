import { DialogContent } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { mdiChevronLeft, mdiChevronRight, mdiDeleteOutline, mdiKey, mdiAlert } from '@mdi/js';
import Icon from '@mdi/react';
import { removeGroupPermissionOfMember, updatePermission } from "actions/taskDetail/taskDetailActions";
import clsx from "clsx";
import DialogWrap from 'components/DialogWrap';
import get from "lodash/get";
import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from 'styled-components';
import './styles.scss';
import findIndex from "lodash/findIndex";
import { currentColorSelector } from "views/JobDetailPage/selectors";

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

const StyledDiv = styled.div`
  &:hover {
    background-color: ${props => props.colorHover};
    color: #ffffff;
    svg {
      color: #ffffff;
    }
  }
`

function PriorityTable(props) {
  const { t } = useTranslation();
  const groupActiveColor = useSelector(currentColorSelector)
  return (
    <StyledDiv
      className={clsx("permissionItem", { "permissionItem__checked": props.checked })}
      colorHover={groupActiveColor}
      align="center">{props.radio}
      <Radio
        className="permissionItem--radio"
        checked={props.checked}
        onChange={props.onChange}
        value={props.value}
      />
    </StyledDiv>
  )
}

function CustomArrow({ path, className, isDisabled, onClick }) {
  const { t } = useTranslation();
  return (
    <Icon
      path={path}
      className={clsx(className, { "customArrow__disabled": isDisabled })}
      onClick={!isDisabled ? onClick : undefined}
    />
  );
}

function PermissionMemberModal({ memberId, setOpen,
  is_admin,
  permission = {},
  isOpen
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listGroupPermission = useSelector(state => state.taskDetail.listGroupPermission.permissions);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const ownerPermissions = useSelector(state => state.taskDetail.detailTask.ownerPermissions);
  const [selectedValue, setSelectedValue] = React.useState(-1);
  const [permissionsList, setPermissionsList] = React.useState([]);

  // useEffect(() => {
  //   if (is_admin)
  //     dispatch(detailGroupPermissionDefault())
  // }, [dispatch, is_admin])
  useEffect(() => {
    if (permission) {
      const idx = findIndex(listGroupPermission || [], ({ id }) => id === permission.id)
      setSelectedValue(idx)
    } else {
      setSelectedValue(-1)
    }
  }, [listGroupPermission, permission])

  useEffect(() => {
    const selectedPermission = get(listGroupPermission[selectedValue], 'permissions', [])
    // console.log('PermissionMemberModal', is_admin, ownerPermissions, selectedPermission)
    if (is_admin && ownerPermissions)
      setPermissionsList(ownerPermissions.permissions)
    else {
      setPermissionsList(selectedPermission)
    }
    // eslint-disable-next-line
  }, [dispatch, is_admin, selectedValue])

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
      maxWidth="md"
      className="permissionMemberModal"
      successLabel={is_admin ? t('LABEL_CHAT_TASK_THOAT') : t('LABEL_CHAT_TASK_HOAN_THANH')}
      onClickSuccess={is_admin ? handleClose : handleUpdateMemberPermission}
      isOneButton={is_admin}
    >
      <DialogContent>
        <div className="permissionMemberModal--title">
          {is_admin ?
            t('LABEL_CHAT_TASK_NHOM_QUYEN_CHU_SO')
            : t('LABEL_CHAT_TASK_CHON_NHOM_QUYEN')}
        </div>
        <div className="permissionMemberModal--content">
          {is_admin ? t('LABEL_CHAT_TASK_CHU_SO_HUU_CONG') : t('LABEL_CHAT_TASK_MOI_NHOM_BAO_GOM')}
        </div>
        {permission && selectedValue === -1 &&
          <div className="permissionMemberModal--removed">
            <Icon path={mdiAlert} size={3}></Icon>
            <div className="permissionMemberModal--removedDes">
              <div dangerouslySetInnerHTML={{ __html: t('LABEL_CHAT_TASK_NHOM_QUYEN_B_QUAN', { name: permission.name }) }}></div>
              <div >{t('LABEL_CHAT_TASK_BAN_CO_THE_GIU')}</div>
            </div>
            <a
              href={permission.url_redirect || "http://workplus.vn/"}
              target="_blank"
              rel="noopener noreferrer"
              className="permissionMemberModal--seeMore">
              {t('LABEL_CHAT_TASK_XEM_THEM')}
            </a>
          </div>}
        {listGroupPermission.length > 0 || is_admin ?
          <>
            {!is_admin &&
              <>
                <div className="permissionMemberModal--delete" onClick={onClickDelete}>
                  <Icon path={mdiDeleteOutline} size={1}></Icon>
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
              </>
            }
            <Table>
              <TableHead>
                <RowTable>
                  <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>&nbsp;</CellTable>
                  <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>{t('LABEL_CHAT_TASK_TEN_QUYEN')}</CellTable>
                  <CellTable style={{ color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>{t('LABEL_CHAT_TASK_MO_TA')}</CellTable>
                </RowTable>
              </TableHead>
              <TableBody>
                {permissionsList.map(row => (
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
            <div className="permissionItem--noPermissionsFooter">{t('LABEL_CHAT_TASK_LIEN_HE_VOI_QUAN')}</div>
          </div>
        }
      </DialogContent>

    </DialogWrap >
  );
}
export default PermissionMemberModal