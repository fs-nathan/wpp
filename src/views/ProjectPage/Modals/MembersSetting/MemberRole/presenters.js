import {Checkbox, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import CustomModal from 'components/CustomModal';
import { ADD_PROJECT_ROLE_TO_MEMBER, CustomEventDispose, CustomEventListener, MEMBER_PROJECT, REMOVE_PROJECT_ROLE_FROM_MEMBER } from 'constants/events';
import { find, get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const StyledTableHead = ({ className = '', ...props }) =>
  <TableHead
    className={`view_ProjectPage_MemberRoleModal___table-head ${className}`}
    {...props}
  />;

const StyledTableBody = ({ className = '', ...props }) =>
  <TableBody
    className={`view_ProjectPage_MemberRoleModal___table-body ${className}`}
    {...props}
  />;

const StyledTableCell = ({ className = '', ...props }) =>
  <TableCell
    className={`view_ProjectPage_MemberRoleModal___table-cell ${className}`}
    {...props}
  />;

const StyledTable = ({ className = '', ...props }) =>
  <Table
    className={`view_ProjectPage_MemberRoleModal___table ${className}`}
    {...props}
  />;

function MemberRole({
  open, setOpen,
  curMemberId,
  userRoles, updateMemberRole, members,
  handleUpdateRoleOfMember,
  projectId,
  doReloadMember,
}) {

  const { t } = useTranslation();

  const [roles, setRoles] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (curMemberId) setRoles(get(find(members.members, { id: curMemberId }), 'role', {}));
  }, [curMemberId, members]);

  React.useEffect(() => {
    const fail = () => {
      setLoading(false);
    };
    CustomEventListener(ADD_PROJECT_ROLE_TO_MEMBER.SUCCESS, doReloadMember);
    CustomEventListener(REMOVE_PROJECT_ROLE_FROM_MEMBER.SUCCESS, doReloadMember);
    CustomEventListener(ADD_PROJECT_ROLE_TO_MEMBER.FAIL, fail);
    CustomEventListener(REMOVE_PROJECT_ROLE_FROM_MEMBER.FAIL, fail);
    return () => {
      CustomEventDispose(ADD_PROJECT_ROLE_TO_MEMBER.SUCCESS, doReloadMember);
      CustomEventDispose(REMOVE_PROJECT_ROLE_FROM_MEMBER.SUCCESS, doReloadMember);
      CustomEventDispose(ADD_PROJECT_ROLE_TO_MEMBER.FAIL, fail);
      CustomEventDispose(REMOVE_PROJECT_ROLE_FROM_MEMBER.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectId]);

  React.useEffect(() => {
    const success = () => {
      setLoading(false);
    };
    const fail = () => {
      setLoading(false);
    };
    CustomEventListener(MEMBER_PROJECT.SUCCESS, success);
    CustomEventListener(MEMBER_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(MEMBER_PROJECT.SUCCESS, success);
      CustomEventDispose(MEMBER_PROJECT.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectId]);
  return (
    <CustomModal
      title={t("DMH.VIEW.PP.MODAL.MEMBER.ROLE.TITLE")}
      open={open}
      setOpen={setOpen}
      confirmRender={null}
      cancleRender={evt => t("DMH.VIEW.PP.MODAL.MEMBER.ROLE.EXIT")}
      loading={userRoles.loading || updateMemberRole.loading || members.loading || loading}
    >
      <StyledTable>
        <StyledTableHead>
          <TableRow>
            <TableCell/>
            <StyledTableCell width='30%'>{t("DMH.VIEW.PP.MODAL.MEMBER.ROLE.TABLE.NAME")}</StyledTableCell>
            <StyledTableCell width='50%'>{t("DMH.VIEW.PP.MODAL.MEMBER.ROLE.TABLE.DESC")}</StyledTableCell>
            <TableCell width='20%' />
          </TableRow>
        </StyledTableHead>
        <StyledTableBody>
          {userRoles.userRoles.map(userRole => (
            <TableRow key={get(userRole, 'id')}>
              <TableCell>
                <Radio
                    checked={get(userRole, 'id') === get(roles, "id")}
                    onChange={evt => {
                      handleUpdateRoleOfMember(get(userRole, 'id'));
                      setLoading(true);
                    }}
                    value={get(userRole, 'name', '')}
                    color='primary'
                />
              </TableCell>
              <StyledTableCell>
                {get(userRole, 'name')}
              </StyledTableCell>
              <TableCell>
                {get(userRole, 'description')}
              </TableCell>
              <TableCell />
            </TableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </CustomModal>
  )
}

export default MemberRole;