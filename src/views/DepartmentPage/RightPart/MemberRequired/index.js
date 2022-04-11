import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import CustomAvatar from 'components/CustomAvatar';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';
import "./styles.scss";
import * as images from "../../../../assets";
import {get, isNil, map} from 'lodash';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import * as services from '../../../../components/Drawer/DrawerService';
import {Scrollbars} from 'react-custom-scrollbars';
import {acceptRequirementJoinGroup} from 'actions/groupUser/acceptRequirementJoinGroup';
import {rejectRequirementJoinGroup} from 'actions/groupUser/rejectRequirementJoinGroup';
import {getPermissionViewUser} from 'actions/viewPermissions';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import {requireLoadingSelector, requireUsersSelector, viewPermissionsSelector} from '../../LeftPart/AddUser/selectors';
import "../../../ProjectGroupPage/RightPart/AllProjectGrid/Intro/styles.scss";
import {SNACKBAR_VARIANT, SnackbarEmitter} from "../../../../constants/snackbarController";
import {getRequirementJoinGroup} from "../../../../actions/groupUser/getRequirementJoinGroup";
import LoadingBox from "../../../../components/LoadingBox";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import {
  ACCEPT_REQUIREMENT_USER_JOIN_GROUP,
  CustomEventDispose,
  CustomEventListener, REJECT_REQUIREMENT_USER_JOIN_GROUP
} from "../../../../constants/events";
import LoadingOverlay from "../../../../components/LoadingOverlay";

const Container = ({ className = '', ...rest }) => (<div className={`view_Department_MemberRequired___container ${className}`} {...rest} />);

const Header = ({ className = '', ...rest }) => (<div className={`view_Department_MemberRequired___header ${className}`} {...rest} />);

const Title = ({ className = '', ...rest }) => (<p className={`view_Department_MemberRequired___title ${className}`} {...rest} />);

const Body = ({ className = '', ...rest }) => (<Scrollbars className={`view_Department_MemberRequired___body ${className}`} {...rest} />);

const MemberRequiredIntro = props => {
  const { t } = useTranslation();
  const [groupList, setGroup] = useState(null);

  const handleFetchData = async () => {
    try {
      const { data } = await services.listGroupService();
      setGroup(data);
    } catch (err) { }
  };

  const handleCopyText = text => {
    window.navigator.clipboard.writeText(text).then(r => null);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, `${t('IDS_WP_ALREADY_COPY')} ${text}`);
  };

  useEffect(() => {
    handleFetchData().then(r => null);
  }, []);
  return (
    <>
      <Box className={"introEmptyData-container"}>
        <Box className={"introEmptyData-left"}>
          <Typography variant={"h5"}>{t("LABEL_HOW_TO_REQ_JOIN")}</Typography>
          <p>{t("LABEL_HOW_TO_REQ_JOIN_DES1")}</p>
          <p>{t("LABEL_HOW_TO_REQ_JOIN_DES2")}</p>
          <p>{t("LABEL_HOW_TO_REQ_JOIN_DES3")}</p>
          <p>{t("LABEL_HOW_TO_REQ_JOIN_DES4")}</p>
          {!isNil(groupList) && (
            <Button
              variant={"contained"} color={"primary"}
              disableElevation onClick={() => handleCopyText(groupList.group_me.code)}
              endIcon={<FilterNoneIcon />}
            >
              <span style={{fontSize: "25px"}}>{get(groupList, "group_me.code")}</span>
            </Button>
          )}
        </Box>
        <img src={images.bg_request_join} alt={""} className={"bgRequestJoinIntro"}/>
      </Box>
    </>
  );
}

const MemberRequiredStart = ({ requireLoading, requireUsers, viewPermissions,
  doAcceptRequirementJoinGroup, doRejectRequirementJoinGroup, doGetPermissionViewUser, doGetRequirementJoinGroup,
  loading
}) => {
  const { t } = useTranslation();
  const [usersLength, setUsersLength] = useState(false);

  useEffect(() => {
    if (get(requireUsers, "users.length", 0)) setUsersLength(true);
  }, [setUsersLength, requireUsers]);

  useEffect(() => {
    if (get(viewPermissions, "permissions", null) === null) doGetPermissionViewUser(true);
  }, [doGetPermissionViewUser, viewPermissions]);

  useEffect(() => {
    doGetRequirementJoinGroup();
    const doReload = () => {
      doGetRequirementJoinGroup();
    }
    CustomEventListener(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, doReload);
    CustomEventListener(REJECT_REQUIREMENT_USER_JOIN_GROUP, doReload);
    return () => {
      CustomEventDispose(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, doReload);
      CustomEventDispose(REJECT_REQUIREMENT_USER_JOIN_GROUP, doReload);
    }
  }, [doGetRequirementJoinGroup]);

  function onAcceptRequirementJoinGroup(requirementId) {
    doAcceptRequirementJoinGroup({ requirementId });
  }

  function onRejectRequirementJoinGroup(requirementId) {
    doRejectRequirementJoinGroup({ requirementId });
  }
  return (
    <>
      {!usersLength && !loading && (<MemberRequiredIntro />)}
      {loading && <LoadingBox/>}
      {usersLength && !loading && (
          <Container>
            <Header>
              <Title style={{ fontSize: '16px', fontWeight: 500, textTransform: 'none' }}>
                <IconButton style={{ background: '#4caf50', marginRight: '10px' }}>
                  <ContactMailRoundedIcon style={{ color: '#fff' }} />
                </IconButton>
                {t('DMH.VIEW.DP.LEFT.ADD.LABEL.REQ')}{` (${requireUsers.users.length})`}
              </Title>
            </Header>
            <Body autoHide autoHideTimeout={500}>
              <LoadingOverlay active={requireLoading}>
                <List component={"nav"} className={"view_Department_MemberRequired__List"}>
                  {map(requireUsers.users, function (user) {
                    return (
                      <ListItem>
                        <ListItemAvatar>
                          <CustomAvatar style={{ width: 50, height: 50, }} src={get(user, 'avatar')} alt='avatar' />
                        </ListItemAvatar>
                        <ListItemText primary={user.name} secondary={user.email}/>
                        <ListItemSecondaryAction>
                          <Link onClick={() => onRejectRequirementJoinGroup(get(user, 'requirement_id'))}>
                            {t("DMH.VIEW.DP.LEFT.ADD.BTN.DENY")}
                          </Link>
                          <Button
                            disableElevation color={"primary"} variant={"contained"}
                            onClick={() => onAcceptRequirementJoinGroup(get(user, 'requirement_id'))}
                          >
                            {t("DMH.VIEW.DP.LEFT.ADD.BTN.ACPT")}
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
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
    requireUsers: requireUsersSelector(state),
    requireLoading: requireLoadingSelector(state),
    viewPermissions: viewPermissionsSelector(state),
    loading: state.groupUser.getRequirementJoinGroup.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doAcceptRequirementJoinGroup: ({ requirementId }) => dispatch(acceptRequirementJoinGroup({ requirementId })),
    doRejectRequirementJoinGroup: ({ requirementId }) => dispatch(rejectRequirementJoinGroup({ requirementId })),
    doGetPermissionViewUser: (quite) => dispatch(getPermissionViewUser(quite)),
    doGetRequirementJoinGroup: (quite) => dispatch(getRequirementJoinGroup(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberRequiredStart)
