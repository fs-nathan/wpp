import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { mdiAlert, mdiChevronLeft, mdiChevronRight, mdiDeleteOutline, mdiKey } from '@mdi/js';
import Icon from '@mdi/react';
import CustomModal from 'components/CustomModal';
import NoData from 'components/NoData';
import { CustomEventDispose, CustomEventListener, MEMBER_PROJECT, REMOVE_GROUP_PERMISSION_MEMBER, UPDATE_GROUP_PERMISSION_MEMBER } from 'constants/events';
import { find, get, isNil } from 'lodash';
import React from "react";
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './style.scss';

const StyledTableRow = ({ className = '', ...props }) =>
  <TableRow
    className={`view_ProjectPage_MemberPermissionModal___table-row ${className}`}
    {...props}
  />;

const StyledTableCell = ({ className = '', ...props }) =>
  <TableCell
    className={`view_ProjectPage_MemberPermissionModal___table-cell ${className}`}
    {...props}
  />;

const PermissionItem = ({ className = '', check = false, ...props }) =>
  <div
    className={`view_ProjectPage_MemberPermissionModal___permission-item${check ? '-checked' : ''} ${className}`}
    {...props}
  />;

const Title = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectPage_MemberPermissionModal___title ${className}`}
    {...props}
  />

const Content = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectPage_MemberPermissionModal___content ${className}`}
    {...props}
  />

const SliderWrapper = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectPage_MemberPermissionModal___slider ${className}`}
    {...props}
  />

const CustomIcon = ({ className = '', disabled = false, ...props }) =>
  <Icon
    className={`view_ProjectPage_MemberPermissionModal___icon${disabled ? '-disabled' : ''} ${className}`}
    {...props}
  />

const NoDataHelper = ({ className = '', ...props }) =>
  <span
    className={`view_ProjectPage_MemberPermissionModal___no-data-helper ${className}`}
    {...props}
  />

const Deselect = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectPage_MemberPermissionModal___deselect ${className}`}
    {...props}
  />

const AlertBox = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectPage_MemberPermissionModal___alert-box ${className}`}
    {...props}
  />

function PriorityTable(props) {
  return (
    <PermissionItem onClick={() => props.setChecked()} check={props.checked} align="center">
      {props.radio}
      <Radio
        checked={props.checked}
        value={props.value}
      />
    </PermissionItem>
  )
}

function CustomArrow({ path, className, isDisabled, onClick }) {
  return (
    <CustomIcon
      path={path}
      disabled={isDisabled}
      className={className}
      onClick={!isDisabled && onClick}
    />
  );
}

function PermissionMemberModal({
  setOpen, open,
  permissions, members, curMemberId,
  updateGroupPermission, handleUpdateGroupPermission,
  projectId, doReloadMember, doReloadPermissions
}) {

  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = React.useState(undefined);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isFirstView, setIsFirstView] = React.useState(true);

  React.useEffect(() => {
    setIsFirstView(true);
  }, [open]);

  const initialValue = React.useMemo(() =>
    get(
      find(
        permissions.groupPermissions,
        {
          id: get(
            find(
              members.members,
              { id: curMemberId }
            ),
            'group_permission_id'
          )
        }
      ),
      "id"
    )
    , [members.members, curMemberId, permissions]);

  React.useEffect(() => {
    setSelectedValue(
      get(
        find(
          permissions.groupPermissions,
          {
            id: get(
              find(
                members.members,
                { id: curMemberId }
              ),
              'group_permission_id'
            )
          }
        ),
        "id"
      )
    );
    setIsAdmin(get(
      find(
        members.members,
        { id: curMemberId }
      ),
      'is_admin',
      false,
    ));
  }, [members.members, curMemberId, permissions]);

  React.useEffect(() => {
    const fail = () => {
      setLoading(false);
    };
    CustomEventListener(UPDATE_GROUP_PERMISSION_MEMBER.SUCCESS, doReloadMember);
    CustomEventListener(UPDATE_GROUP_PERMISSION_MEMBER.FAIL, fail);
    CustomEventListener(REMOVE_GROUP_PERMISSION_MEMBER.SUCCESS, doReloadMember);
    CustomEventListener(REMOVE_GROUP_PERMISSION_MEMBER.SUCCESS, doReloadPermissions);
    CustomEventListener(REMOVE_GROUP_PERMISSION_MEMBER.FAIL, fail);
    return () => {
      CustomEventDispose(UPDATE_GROUP_PERMISSION_MEMBER.SUCCESS, doReloadMember);
      CustomEventDispose(UPDATE_GROUP_PERMISSION_MEMBER.FAIL, fail);
      CustomEventDispose(REMOVE_GROUP_PERMISSION_MEMBER.SUCCESS, doReloadMember);
      CustomEventDispose(REMOVE_GROUP_PERMISSION_MEMBER.SUCCESS, doReloadPermissions);
      CustomEventDispose(REMOVE_GROUP_PERMISSION_MEMBER.FAIL, fail);
    }
  }, [projectId]);

  React.useEffect(() => {
    const success = () => {
      setLoading(false);
      setOpen(false);
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
  }, [projectId]);

  return (
    <CustomModal
      title={t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.TITLE")}
      className="view_ProjectPage_MemberPermissionModal___modal"
      open={open}
      setOpen={setOpen}
      loading={permissions.loading || members.loading}
      cancleRender={() => isAdmin ? t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.EXIT") : t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.CANCLE")}
      canConfirm={permissions.groupPermissions.length > 0}
      confirmRender={isAdmin ? null : () => t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.DONE")}
      onConfirm={() => {
        if (!isAdmin) {
          handleUpdateGroupPermission(selectedValue);
          setLoading(true);
        }
      }}
      onCancle={() => {
        setOpen(false);
        setSelectedValue(initialValue);
      }}
      activeLoading={updateGroupPermission.loading || loading || permissions.groupPermissions.loading}
      manualClose={true}
    >
      {isAdmin
        ? (
          <>
            <Title>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.ADMIN.TITLE")}</Title>
            <Content>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.ADMIN.DESC")}</Content>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell style={{ width: "10%", color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>&nbsp;</StyledTableCell>
                  <StyledTableCell style={{ width: "35%", color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.TABLE.NAME")}</StyledTableCell>
                  <StyledTableCell style={{ width: "55%", color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.TABLE.DESC")}</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {get(
                  permissions.adminPermission,
                  "permissions",
                  [],
                ).map(row => (
                  <TableRow key={get(row, 'value')}>
                    <StyledTableCell align="center"><Icon path={mdiKey} size={1} /></StyledTableCell>
                    <StyledTableCell component="th" scope="row" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                      {get(row, 'name')}
                    </StyledTableCell>
                    <StyledTableCell >{get(row, 'description')}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )
        : (
          <>
            <Title>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.USER.TITLE")}</Title>
            <Content>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.USER.DESC")}</Content>
            {isNil(selectedValue) && get(find(members.members, { id: curMemberId }), 'group_permission_name') && isFirstView && (
              <AlertBox>
                <Icon
                  path={mdiAlert}
                  size={2}
                />
                <div>
                  <p>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.MOVED.LABEL_1", { permission_name: get(find(members.members, { id: curMemberId }), 'group_permission_name') })}</p>
                  <p>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.MOVED.LABEL_2")}</p>
                </div>
                <span onClick={evt => null}>
                  {t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.MOVED.MORE")}
                </span>
              </AlertBox>
            )}
            {(permissions.groupPermissions.length === 0 && permissions.groupPermissions.loading === false)
              ? <NoData
                title={() => null}
                subtitle={() =>
                  <>
                    <NoDataHelper>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.USER.NO_DATA.LABEL_1")}</NoDataHelper>
                    <NoDataHelper>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.USER.NO_DATA.LABEL_2")}</NoDataHelper>
                  </>
                }
              />
              : (
                <>
                  {
                    selectedValue && (
                        <Deselect
                            onClick={evt => {
                              setSelectedValue(undefined);
                              setIsFirstView(false);
                            }}
                        >
                          <Icon path={mdiDeleteOutline} size={1} color='#898989' />
                          <span>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.USER.REMOVE")}</span>
                        </Deselect>
                    )
                  }
                  <SliderWrapper>
                    <Slider adaptiveHeight variableWidth infinite={false}
                      nextArrow={<CustomArrow path={mdiChevronRight} isDisabled={permissions.groupPermissions.length < 5} />}
                      prevArrow={<CustomArrow path={mdiChevronLeft} isDisabled={permissions.groupPermissions.length < 5} />}
                      settings={{ dots: false, slidesToShow: 5, adaptiveHeight: true }}
                    >
                      {permissions.groupPermissions.map(group =>
                        <PriorityTable
                          key={get(group, 'id')}
                          radio={get(group, 'name')}
                          value={get(group, 'id')}
                          checked={selectedValue === get(group, 'id')}
                          setChecked={() => setSelectedValue(get(group, 'id'))} />
                      )}
                    </Slider>
                  </SliderWrapper>
                  <Table>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell style={{ width: "10%", color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>&nbsp;</StyledTableCell>
                        <StyledTableCell style={{ width: "35%", color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.TABLE.NAME")}</StyledTableCell>
                        <StyledTableCell style={{ width: "55%", color: '#898989', fontSize: '15px', fontWeight: 'bold' }}>{t("DMH.VIEW.PP.MODAL.MEMBER.PERMISSION.TABLE.DESC")}</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {get(
                        find(
                          permissions.groupPermissions,
                          { id: selectedValue },
                        ),
                        "permissions",
                        [],
                      ).map(row => (
                        <TableRow key={get(row, 'value')}>
                          <StyledTableCell align="center"><Icon path={mdiKey} size={1} /></StyledTableCell>
                          <StyledTableCell component="th" scope="row" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                            {get(row, 'name')}
                          </StyledTableCell>
                          <StyledTableCell >{get(row, 'description')}</StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
          </>
        )}

    </CustomModal>
  );
}
export default PermissionMemberModal