import React, { useRef, useState, useEffect } from "react";
import { Box, Card, CardContent, IconButton, Typography, ListItemAvatar, ListItemText, CircularProgress, ButtonBase } from "@material-ui/core";
import CustomAvatar from 'components/CustomAvatar';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';
import "./styles.scss";
import * as images from "../../../../assets";
import { get, isNil } from 'lodash';
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Primary, Secondary, StyledList, StyledListItem } from 'components/CustomList';
import LoadingOverlay from 'components/LoadingOverlay';
import * as services from '../../../../components/Drawer/DrawerService';
import { actionToast } from '../../../../actions/system/system';
import { Scrollbars } from 'react-custom-scrollbars';
import { acceptRequirementJoinGroup } from 'actions/groupUser/acceptRequirementJoinGroup';
import { rejectRequirementJoinGroup } from 'actions/groupUser/rejectRequirementJoinGroup';
import { getPermissionViewUser } from 'actions/viewPermissions';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { bgColorSelector, requireLoadingSelector, requireUsersSelector, viewPermissionsSelector } from '../../LeftPart/AddUser/selectors';

const StyledBox = ({ className = '', ...props }) =>
  <div
    className={`view_Department_MemberRequired___box ${className}`}
    {...props}
  />;

const StyledSecondary = ({ className = '', ...props }) =>
  <span
    className={`view_Department_MemberRequired___style-secondary ${className}`}
    {...props}
  />;

const OkButton = ({ className = '', ...props }) =>
  <ButtonBase
    className={`view_Department_MemberRequired___ok-btn ${className}`}
    {...props}
  />;

const CancleButton = ({ className = '', ...props }) =>
  <ButtonBase
    className={`view_Department_MemberRequired___cancle-btn ${className}`}
    {...props}
  />;

const Container = ({ className = '', ...rest }) => (<div className={`view_Department_MemberRequired___container ${className}`} {...rest} />);

const Header = ({ className = '', ...rest }) => (<div className={`view_Department_MemberRequired___header ${className}`} {...rest} />);

const Title = ({ className = '', ...rest }) => (<p className={`view_Department_MemberRequired___title ${className}`} {...rest} />);

const Body = ({ className = '', ...rest }) => (<Scrollbars className={`view_Department_MemberRequired___body ${className}`} {...rest} />);

const StyledIconButton = ({ className = '', ...rest }) => (<IconButton className={`view_Department_MemberRequired___icon-button ${className}`} {...rest} />);

const IconWrapper = ({ className = '', ...rest }) => (<div className={`view_Department_MemberRequired___icon-wrapper ${className}`} {...rest} />);

const RequestingUserList = ({
  users, loading, bgColor, canModify,
  handleAcceptRequirementJoinGroup, handleRejectRequirementJoinGroup,
}) => {

  const { t } = useTranslation();

  function onAcceptRequirementJoinGroup(requirementId) {
    handleAcceptRequirementJoinGroup({ requirementId });
  }

  function onRejectRequirementJoinGroup(requirementId) {
    handleRejectRequirementJoinGroup({ requirementId });
  }

  return (
    <StyledList>
      {users.map(user => (
        <StyledListItem
          key={get(user, 'id')}
          style={{ cursor: 'default' }}
        >
          <ListItemAvatar>
            <CustomAvatar style={{ width: 50, height: 50, }} src={get(user, 'avatar')} alt='avatar' />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Primary>{get(user, 'name')}</Primary>
            }
            secondary={
              <StyledSecondary>
                <Secondary>{get(user, 'email')}</Secondary>
                {canModify && <span style={{ float: 'right', transform: 'translate(0, -70%)' }}>
                  <CancleButton
                    disabled={loading}
                    onClick={() => onRejectRequirementJoinGroup(get(user, 'requirement_id'))}
                  >
                    {loading && (
                      <CircularProgress
                        size={16}
                        className="margin-circular"
                        color='#c1c1c1'
                      />
                    )}
                    {t('DMH.VIEW.DP.LEFT.ADD.BTN.DENY')}
                  </CancleButton>
                  <OkButton
                    style={{
                      backgroundColor: bgColor.color,
                      borderColor: bgColor.color
                    }}
                    disabled={loading}
                    onClick={() => onAcceptRequirementJoinGroup(get(user, 'requirement_id'))}
                  >
                    {loading && (
                      <CircularProgress
                        size={16}
                        className="margin-circular"
                        color='white'
                      />
                    )}
                    {t('DMH.VIEW.DP.LEFT.ADD.BTN.ACPT')}
                  </OkButton>
                </span>}
              </StyledSecondary>
            }
          />
        </StyledListItem>
      ))}
    </StyledList>
  );
}




const MemberRequiredIntro = props => {
  const { t } = useTranslation();
  const [groupList, setGroup] = useState(null);

  const handleFetchData = async () => {
    try {
      const { data } = await services.listGroupService();
      setGroup(data);
    } catch (err) { }
  };

  const handleToast = (type, message) => {
    console.log("props: ", props);
    // props.
    actionToast(type, message);
  };

  const handleCopyText = text => {
    window.navigator.clipboard.writeText(text);
    handleToast('success', `${t('IDS_WP_ALREADY_COPY')} ${text}`);
  };

  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, []);


  return (
    <Box style={{ position: "relative" }}>
      <Box className={"memberRequired-header"}>
        <img src={images.bg_request_join} alt={""} />
      </Box>
      <Box className={"memberRequired-container"}>
        <Card variant="outlined" className={"memberRequired-card"}>
          <CardContent>
            <Box textAlign={"center"} className={"memberRequired-card--topText"}>
              <Typography variant={"h3"} style={{ fontWeight: 500, paddingBottom: '30px' }}>{t("LABEL_HOW_TO_REQ_JOIN")}</Typography>
              <Typography variant={"h5"} color={"textPrimary"}>{t("LABEL_HOW_TO_REQ_JOIN_DES1")}</Typography>
              <Typography variant={"h5"} color={"textPrimary"}>{t("LABEL_HOW_TO_REQ_JOIN_DES2")}</Typography>
              <Typography variant={"h5"} color={"textPrimary"}>{t("LABEL_HOW_TO_REQ_JOIN_DES3")}</Typography>
              <Typography variant={"h5"} color={"textPrimary"}>{t("LABEL_HOW_TO_REQ_JOIN_DES4")}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop={"15px"}>
              <Card>
                <CardContent style={{ backgroundColor: '#009cf3', paddingBottom: '16px' }}>
                  {!isNil(groupList) && (
                    <Typography variant={"h4"} style={{ fontWeight: 700, color: '#fff' }}>{get(groupList, "group_me.code")}
                      <IconButton style={{ color: '#fff', marginTop: '-5px' }}
                        aria-label="copy Group Id"
                        title={t('IDS_WP_COPY_TEXT_CLIPBOARD')}
                        onClick={e => {
                          handleCopyText(groupList.group_me.code);
                          e.stopPropagation();
                        }}
                        component="span" size="medium" ><FileCopyOutlinedIcon /></IconButton>
                    </Typography>
                  )}

                </CardContent>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

const MemberRequiredStart = ({ requireLoading, bgColor, requireUsers, viewPermissions,
  doAcceptRequirementJoinGroup, doRejectRequirementJoinGroup, doGetPermissionViewUser }) => {
  const { t } = useTranslation();
  const [usersLength, setUsersLength] = useState(false);


  useEffect(() => {
    if (get(requireUsers, "users.length", 0)) setUsersLength(true);
  }, [setUsersLength])
  useEffect(() => {
    if (get(viewPermissions, "permissions", null) === null) doGetPermissionViewUser(true);
  }, [doGetPermissionViewUser]);
  console.log("requireUsers.users.length: ", requireUsers)
  return (
    <>
      { !usersLength && (
        <MemberRequiredIntro />
      )}
      {
        usersLength && (
          <Container>
            <Header>
              <Title style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'none' }}>
                <IconButton style={{ background: '#4caf50', marginRight: '10px' }}>
                  <ContactMailRoundedIcon style={{ color: '#fff' }} />
                </IconButton>
                {t('DMH.VIEW.DP.LEFT.ADD.LABEL.REQ')}{` (${requireUsers.users.length})`}
              </Title>
            </Header>
            <Body
              autoHide
              autoHideTimeout={500}
            >
              <LoadingOverlay>
                <StyledBox>
                  <RequestingUserList
                    canModify={get(viewPermissions.permissions, 'can_modify', false)}
                    bgColor={bgColor}
                    loading={requireLoading}
                    users={requireUsers.users}
                    handleAcceptRequirementJoinGroup={doAcceptRequirementJoinGroup}
                    handleRejectRequirementJoinGroup={doRejectRequirementJoinGroup}
                  />
                </StyledBox>
              </LoadingOverlay>
            </Body>
          </Container>
        )
      }
    </>

  );
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    requireUsers: requireUsersSelector(state),
    requireLoading: requireLoadingSelector(state),
    viewPermissions: viewPermissionsSelector(state),
    anchorDrawer: state.system.anchorDrawer,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // doGetRequirementJoinGroup: (quite) => dispatch(getRequirementJoinGroup(quite)),
    // doGetListInvitationSent: (quite) => dispatch(getListInvitationSent(quite)),
    doAcceptRequirementJoinGroup: ({ requirementId }) => dispatch(acceptRequirementJoinGroup({ requirementId })),
    doRejectRequirementJoinGroup: ({ requirementId }) => dispatch(rejectRequirementJoinGroup({ requirementId })),
    // doGetListGroup: (quite) => dispatch(getListGroup(quite)),
    // doCancleInvitationJoinGroup: ({ invitationId }) => dispatch(cancleInvitationJoinGroup({ invitationId })),
    // doActionVisibleDrawerMessage: (option) => dispatch(actionVisibleDrawerMessage(option)),
    doGetPermissionViewUser: (quite) => dispatch(getPermissionViewUser(quite)),
    actionToast,
    //   : () => dispatch(searchUserReset())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // actionToast,
  // state => ({}), { actionToast }
)(MemberRequiredStart)
