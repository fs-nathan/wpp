import {
  Badge,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  mdiAccountArrowRight,
  mdiAccountCog,
  mdiAccountPlus,
  mdiAtomVariant,
  mdiDotsVertical,
  mdiLock,
  mdiShareVariant,
} from "@mdi/js";
import Icon from "@mdi/react";
import { getUserOfRoom } from "actions/room/getUserOfRoom";
import { actionToast } from "actions/system/system";
import {
  actionGetInfor,
  actionLockUser,
  actionUnLockUser,
} from "actions/user/detailUser";
import CustomAvatar from "components/CustomAvatar";
import CustomBadge from "components/CustomBadge";
import CustomTable from "components/CustomTable";
import { LightTooltip, TooltipWrapper } from "components/LightTooltip";
import LoadingBox from "components/LoadingBox";
import {
  Container,
  LinkSpan,
  SettingContainer,
} from "components/TableComponents";
import { DRAWER_TYPE } from "constants/constants";
import { find, get, isNil } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "../AllUsersTable/style.scss";

const TooltipBody = ({ className = "", state, ...props }) => (
  <div
    className={`view_Department_AllUserTalbe___tooltip-${
      state === 0 ? "private" : "public"
    } ${className}`}
    {...props}
  />
);

const NewUserBadge = ({ className = "", ...props }) => (
  <Badge
    className={`view_Department_AllUserTalbe___user-badge ${className}`}
    {...props}
  />
);

const PermissionButton = ({ handleOpenMenu }) => {
  return (
    <SettingContainer onClick={(evt) => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(evt) => handleOpenMenu(evt.currentTarget)}
        size="small"
      >
        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
      </IconButton>
    </SettingContainer>
  );
};
function TooltipRole({ user }) {
  const { t } = useTranslation();
  const getRole = get(user, "user_type");
  function handleRender() {
    switch (getRole) {
      case 3:
        return (
          <LightTooltip
            placement="top"
            title={
              <TooltipBody state={0}>
                <small style={{ color: "#f1af36", fontSize: "13px" }}>
                  {t("IDS_WP_USERS_TABLE_COLUMS_ROLE_MEMBER_TOOLTIP")}
                </small>
              </TooltipBody>
            }
          >
            <TooltipWrapper>
              <div
                style={{
                  color: "#fff",
                  backgroundColor: "#f1af36",
                  textAlign: "center",
                  padding: "5px",
                  fontSize: "11px",
                  borderRadius: '2px'
                }}
              >
                {t("DMH.VIEW.PGP.LEFT.INFO.MEMBER.TITLE")}
              </div>
            </TooltipWrapper>
          </LightTooltip>
        );
      case 1:
        return (
          <LightTooltip
            placement="top"
            title={
              <TooltipBody state={0}>
                <small style={{ color: "#2196f3", fontSize: "13px" }}>
                  {t("IDS_WP_USERS_TABLE_COLUMS_ROLE_MASTER_TOOLTIP")}
                </small>
              </TooltipBody>
            }
          >
            <TooltipWrapper>
              <div
                style={{
                  background: "#2196f3",
                  color: "rgb(255, 255, 255)",
                  textAlign: "center",
                  padding: "5px",
                  fontSize: "11px",
                  borderRadius: '2px'
                }}
              >
                {t("IDS_WP_USERS_TABLE_COLUMS_ROLE_MASTER")}
              </div>
            </TooltipWrapper>
          </LightTooltip>
        );
      default:
        return (
          <LightTooltip
            placement="top"
            title={
              <TooltipBody state={0}>
                <small style={{ color: "#950eda", fontSize: "13px" }}>
                  {t("IDS_WP_USERS_TABLE_COLUMS_ROLE_INTERNAL_TOOLTIP")}
                </small>
              </TooltipBody>
            }
          >
            <TooltipWrapper>
              <div
                style={{
                  color: "#fff",
                  backgroundColor: "#950eda",
                  textAlign: "center",
                  padding: "5px",
                  fontSize: "11px",
                  borderRadius: '2px'
                }}
              >
                {t("IDS_WP_USERS_TABLE_COLUMS_ROLE_INTERNAL")}
              </div>
            </TooltipWrapper>
          </LightTooltip>
        );
    }
  }
  return <>{handleRender()}</>;
}
function StateBadge({ user }) {
  const { t } = useTranslation();

  return get(user, "is_lock", true) === true ? (
    <Icon
      title={t("IDS_WP_LOCKED")}
      path={mdiLock}
      size={1}
      color={"rgb(103 98 98 / 70%)"}
    />
  ) : get(user, "state", 0) === 0 ? (
    <LightTooltip
      placement="top"
      title={
        <TooltipBody state={0}>
          <div>
            <span>{t("DMH.VIEW.DP.RIGHT.UT.STATE.TITLE")}:</span>
            <span>{t("DMH.VIEW.DP.RIGHT.UT.STATE.PRI.NAME")}</span>
          </div>
          <small>{t("DMH.VIEW.DP.RIGHT.UT.STATE.PRI.DESC")}</small>
        </TooltipBody>
      }
    >
      <TooltipWrapper>
        <CustomBadge
          weightBold="false"
          color="rgb(255 255 255)"
          backgroundColor="rgb(236 16 0)"
        >
          {t("DMH.VIEW.DP.RIGHT.UT.STATE.PRI.NAME")}
        </CustomBadge>
      </TooltipWrapper>
    </LightTooltip>
  ) : (
    <LightTooltip
      placement="top"
      title={
        <TooltipBody state={1}>
          <div>
            <span>{t("DMH.VIEW.DP.RIGHT.UT.STATE.TITLE")}:</span>
            <span>{t("DMH.VIEW.DP.RIGHT.UT.STATE.PUB.NAME")}</span>
          </div>
          <small>{t("DMH.VIEW.DP.RIGHT.UT.STATE.PUB.DESC")}</small>
        </TooltipBody>
      }
    >
      <TooltipWrapper>
        <CustomBadge
          weightBold="false"
          color="rgb(255 255 255)"
          backgroundColor="rgb(0 191 79)"
        >
          {t("DMH.VIEW.DP.RIGHT.UT.STATE.PUB.NAME")}
        </CustomBadge>
      </TooltipWrapper>
    </LightTooltip>
  );
}

function DepartmentUsersTable({
  room,
  hasRequirement,
  publicPrivatePendings,
  route,
  canModify,
  expand,
  handleExpand,
  handleSortUser,
  handleChangeState,
  handleBanUserFromGroup,
  handleOpenModal,
  handleVisibleDrawerMessage,
  inforUser,
}) {
  const { departmentId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.departmentId;
  const { t } = useTranslation();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [publicPrivateDisabled, setPublicPrivateDisabled] = React.useState(
    false
  );

  function doOpenMenu(anchorEl, user) {
    setMenuAnchorEl(anchorEl);
    setUser(user);
    dispatch(actionGetInfor(user?.id));
  }

  React.useEffect(() => {
    setPublicPrivateDisabled(
      !isNil(
        find(
          publicPrivatePendings.pendings,
          (pending) => pending === get(user, "id")
        )
      )
    );
  }, [publicPrivatePendings, user]);

  const handleLockAccount = async () => {
    try {
      const { data } = await actionLockUser({ account_id: user.id });
      if (data.state) {
        handleToast("success", t("SNACK_MUTATE_SUCCESS"));
        setMenuAnchorEl(null);
        dispatch(getUserOfRoom({ roomId: groupId }));
      }
    } catch (error) {
      handleToast("error", t("SNACK_MUTATE_FAIL"));
    }
  };
  const handleToast = (type, message) => {
    dispatch(actionToast(type, message));
    setTimeout(() => {
      dispatch(actionToast("", null));
    }, 2000);
  };
  const handleUnLockAccount = async () => {
    try {
      const { data } = await actionUnLockUser({ account_id: user.id });
      if (data.state) {
        handleToast("success", t("SNACK_MUTATE_SUCCESS"));
        setMenuAnchorEl(null);
        dispatch(getUserOfRoom({ roomId: groupId }));
      }
    } catch (error) {
      handleToast("error", t("SNACK_MUTATE_FAIL"));
    }
  };
  React.useEffect(() => {
    setPublicPrivateDisabled(
      !isNil(
        find(
          publicPrivatePendings.pendings,
          (pending) => pending === get(user, "id")
        )
      )
    );
  }, [publicPrivatePendings, user]);

  return (
    <Container>
      <CustomTable
        options={{
          title: t("DMH.VIEW.DP.RIGHT.UT.TITLE"),
          subTitle: t("DMH.VIEW.DP.RIGHT.UT.NUM_MEMBER_DUT", {
            total: get(room.room, "number_member", 0),
          }),
          
          mainAction: canModify
            ? {
              icon: mdiShareVariant,
                onClick: () => handleOpenModal("CREATE_ACCOUNT"),
              }
            : null,
            filter: {
              label: t('IDS_WP_ALL'),
              option: 'group'
            },
          expand: {
            bool: expand,
            toggleExpand: () => handleExpand(!expand),
          },
          moreMenu: canModify
            ? [
                {
                  label: t("DMH.VIEW.DP.MODAL.TITLE.TITLE"),
                  onClick: () => handleOpenModal("TITLE"),
                },
                {
                  label: t("DMH.VIEW.DP.MODAL.LEVEL.TITLE"),
                  onClick: () => handleOpenModal("LEVEL"),
                },
                {
                  label: t("DMH.VIEW.DP.MODAL.MAJOR.TITLE"),
                  onClick: () => handleOpenModal("MAJOR"),
                },
              ]
            : null,
          grouped: {
            bool: false,
          },
          row: {
            id: "id",
            onClick: (user) => null,
          },
          draggable: canModify
            ? {
                bool: true,
                onDragEnd: (result) => {
                  const { source, destination, draggableId } = result;
                  if (!destination) return;
                  if (
                    destination.droppableId === source.droppableId &&
                    destination.index === source.index
                  )
                    return;
                  handleSortUser(departmentId, draggableId, destination.index);
                },
              }
            : {
                bool: false,
              },
          loading: {
            bool: room.loading,
            component: () => <LoadingBox />,
          },
          noData: {
            bool: room.firstTime === false && room.room.users.length === 0,
          },
        }}
        columns={[
          {
            label: "",
            field: (user) => (
              <CustomAvatar
                style={{ width: 35, height: 35 }}
                src={get(user, "avatar")}
                alt="avatar"
              />
            ),
            align: "left",
            width: "5%",
          },
          {
            label: t("DMH.VIEW.DP.RIGHT.UT.LABEL.NAME"),
            field: (user) => (
              <LinkSpan
                onClick={(evt) => history.push(`${route}/${get(user, "id")}`)}
              >
                {get(user, "name", "")}
              </LinkSpan>
            ),
            align: "left",
            width: "14%",
          },
          {
            label: t("DMH.VIEW.DP.RIGHT.UT.LABEL.POS"),
            field: "position",
            align: "left",
            width: "10%",
          },
          {
            label: t("DMH.VIEW.DP.RIGHT.UT.LABEL.B_DAY"),
            field: (user) => get(user, "birthday"),
            align: "left",
            width: "10%",
          },
          {
            label: t("DMH.VIEW.DP.RIGHT.UT.LABEL.GENDER"),
            field: "gender",
            align: "left",
            width: "10%",
          },
          {
            label: t("DMH.VIEW.DP.RIGHT.UT.LABEL.EMAIL"),
            field: "email",
            align: "left",
            width: "15%",
          },
          {
            label: t("DMH.VIEW.DP.RIGHT.UT.LABEL.PHONE"),
            field: "phone",
            align: "left",
            width: "10%",
          },
          {
            label: t("DMH.VIEW.DP.RIGHT.UT.LABEL.ROLE"),
            field: (user) => <TooltipRole user={user} />,
            align: "center",
            width: "10%",
          },
          {
            label: t("DMH.VIEW.DP.RIGHT.UT.STATE.TITLE"),
            field: (user) => <StateBadge user={user} />,
            align: "center",
            width: "10%",
          },
          canModify
            ? {
                label: "",
                field: (user) => (
                  <PermissionButton
                    handleOpenMenu={(currentTarget) =>
                      doOpenMenu(currentTarget, user)
                    }
                  />
                ),
                align: "center",
                width: "5%",
              }
            : undefined,
        ]}
        data={room.room.users}
      />
      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        className="more_menu"
        onClose={() => setMenuAnchorEl(null)}
        transformOrigin={{
          vertical: -30,
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleChangeState(user);
            setMenuAnchorEl(null);
          }}
          disabled={publicPrivateDisabled}
        >
          {publicPrivateDisabled && (
            <CircularProgress
              size={16}
              className="margin-circular"
              color="white"
            />
          )}
          <div className="menu_icon">
            <Icon path={mdiAtomVariant} size={1} color={"rgba(0, 0, 0, 0.7)"} />
          </div>{" "}
          <div className="menu_label">
            {t("DMH.VIEW.DP.RIGHT.UT.STATE.CHANGE")}
          </div>
        </MenuItem>
        {/* <MenuItem onClick={() => {
          handleOpenModal('PERMISSION_SETTING', {
            curUserId: get(user, 'id'),
            roomId: null,
          });
          setMenuAnchorEl(null);
        }}>
          <div className="menu_icon"></div> <div className="menu_label">{t('DMH.VIEW.DP.RIGHT.UT.PERMISSION')}</div>
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleOpenModal("SETTING_MEMBER", {
              user,
              roomId: groupId,
            });
          }}
        >
          <div className="menu_icon">
            <Icon path={mdiAccountCog} size={1} color={"rgba(0, 0, 0, 0.7)"} />
          </div>{" "}
          <div className="menu_label">{t("IDS_WP_SETTING_MEMBER")}</div>
        </MenuItem>
        {get(user, "is_me", false) === false && (
          <MenuItem>
            <div className="menu_icon">
              <Icon path={mdiLock} size={1} color={"rgba(0, 0, 0, 0.7)"} />
            </div>{" "}
            <div>
              <p className="menu_label">{t("IDS_WP_LOCK_MEMBER")}</p>
              <p className="menu_note">{t("IDS_WP_LOCK_MEMBER_NOTE")}</p>
              <Button
                variant="contained"
                color="primary"
                className="menu_btn-lock"
                onClick={
                  !inforUser?.userInfor?.is_lock
                    ? handleLockAccount
                    : handleUnLockAccount
                }
              >
                {!inforUser?.userInfor?.is_lock
                  ? t("IDS_WP_LOCk")
                  : t("IDS_WP_UNLOCK")}
              </Button>
            </div>
          </MenuItem>
        )}
        {!(get(user, "is_owner_group", false) || get(user, "is_me", false)) && (
          <MenuItem>
            <div className="menu_icon">
              <Icon
                path={mdiAccountArrowRight}
                size={1}
                color={"rgba(0, 0, 0, 0.7)"}
              />
            </div>
            <div>
              <p className="menu_label">{t("DMH.VIEW.DP.RIGHT.UT.LEAVE")}</p>
              <p className="menu_note">{t("IDS_WP_DELETE_MEMBER")}</p>
              <Button
                variant="contained"
                color="primary"
                className="menu_btn_out-group"
                onClick={() => {
                  handleOpenModal("ALERT", {
                    roomId: null,
                    selectedUser: user,
                  });
                  setMenuAnchorEl(null);
                }}
              >
                {t("DMH.VIEW.DP.RIGHT.UT.LEAVE")}
              </Button>
            </div>
          </MenuItem>
        )}
      </Menu>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    inforUser: state.user.detailUser,
  };
};
export default connect(mapStateToProps)(DepartmentUsersTable);
