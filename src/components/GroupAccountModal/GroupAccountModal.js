import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './GroupAccountModal.scss';
import { connect } from 'react-redux';
import { mdiMagnify, mdiAccountMultiple } from '@mdi/js';
import { Scrollbars } from 'react-custom-scrollbars';
import { get } from 'lodash';
import {
  actionToast
} from '../../actions/system/system';
import ItemGroupAcount from './ItemGroupAccount';
import { isEmpty } from '../../helpers/utils/isEmpty';
import { Primary } from '../../components/CustomList';
import * as services from '../Drawer/DrawerService';
import Icon from '@mdi/react';
import { IconButton, List, ListItem, ListItemText, Button, InputBase, InputAdornment } from "@material-ui/core";
import CustomModal from 'components/CustomModal';
import LoadingOverlay from 'components/LoadingOverlay';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_GroupAccount_Modal___container ${className}`}
    {...props}
  />

const StyledScrollbars = ({ className = '', ...props }) =>
  <Scrollbars className={`view_GroupAccount_Modal___scrollbar`} {...props} />;

const SideBar = ({ className = '', ...props }) =>
  <div
    className={`view_GroupAccount_Modal___side-bar ${className}`}
    {...props}
  />;

const MainBar = ({ className = '', ...props }) =>
  <div
    className={`view_GroupAccount_Modal___main-bar ${className}`}
    {...props}
  />;

const OptionItem = ({ className = '', selected, ...props }) =>
  <ListItem
    className={`${className}`}
    {...props}
  />;
const StyledPrimary = ({ className = '', ...props }) =>
  <Primary
    className={`view_GroupAccount_Modal___primary ${className}`}
    {...props}
  />;
const SubHeader = ({ className = '', ...props }) =>
  <div
    className={`view_GroupAccount_Modal___subheader ${className}`}
    {...props}
  />;


function RenderJoinGroup () {
  const { t } = useTranslation();
  const [groupSearch, setGroupSearch] = useState({});
  const [groupRequire, setGroupRequire] = useState({});
  const [emptyMess, setEmptyMess] = useState(null);


  const handleFetchDataSearch = async () => {
    try {
      const { data } = await services.listGroupService();
      setGroupRequire(data);
      console.log("done fetch");
    } catch (err) { }
  };

  useEffect(() => {
    handleFetchDataSearch(); // eslint-disable-next-line
  }, []);

  const handleSearch = async e => {
    const searchValue = document.getElementById('searchTextId').value;
    try {
      const res = await services.findGroupService(searchValue);
      if (!res.data.group) {
        // setEmptyMess(res.data.msg);
        setEmptyMess(t('IDS_WP_ID_NOT_FOUND'));
        setGroupSearch({});
      } else {
        setEmptyMess(null);
        setGroupSearch(res.data.group);
      }
    } catch (err) {
      setEmptyMess(null);
    }
  };

  return (
    <>
      <div className="join-group-new join-group-search">
        <p className="search-group-title" style={{fontSize: "18px", fontWeight: "500", marginLeft: "20px"}}>
          Bạn muốn tham gia nhóm
        </p>
        <div className="search-group-container" style={{padding: "12px 5px 5px 5px", border: "1px solid rgba(0, 0, 0, 0.1)", margin: "20px"}}>
          <InputBase
            id="searchTextId"
            className="search-group-box"
            placeholder={t('Nhập ID nhóm hoặc số điện thoại chủ sở hữu nhóm')}
            autoFocus
            style={{width: "80%"}}
            startAdornment={
              <InputAdornment position="start">
                <Icon path={mdiMagnify} size={1.3} color="#8e8e8e" />
              </InputAdornment>
            }
          />
          <Button className="filter-action" style={{backgroundColor: "orangered", color: "#ffffff", transform: "translate(25px, -8px)", boderRadius: "2px"}} onClick={handleSearch}>
            Tìm
          </Button>
        </div>
      </div>

      <div className="content-group-account join-group-container">
        <Scrollbars autoHide autoHideTimeout={500}>
          <div className="item-group">
            {(!isEmpty(groupSearch) || emptyMess) && (
              <div className="title-item-group">
                <span className="text-item-group">
                  {t('IDS_WP_FILTER_RESULT')}
                </span>
              </div>
            )}

            {!isEmpty(groupSearch) ? (
              <ItemGroupAcount
                item={groupSearch}
                type="join"
                handleFetchData={() => {
                  handleFetchDataSearch();
                  setGroupSearch({});
                }}
              />
            ) : (
              emptyMess && <p className="red-text no-result">{emptyMess}</p>
            )}
          </div>
          {/* nhóm requirements */}
          {!isEmpty(groupRequire.requirements) && (
            <div className="item-group">
              <div className="title-item-group">
                <span className="text-item-group">
                  {t('IDS_WP_REQUEST_GROUP')}
                </span>
              </div>
              {groupRequire.requirements.map((group, idx) => (
                <ItemGroupAcount
                  item={group}
                  key={idx}
                  type="requirements"
                  handleFetchData={handleFetchDataSearch}
                />
              ))}
            </div>
          )}
        </Scrollbars>
      </div>
    </>
  )
}


const RenderRightPart = props => {
  const { t } = useTranslation();
  switch (props.mode) {
    case "ACTIVE":
      return (
        <>
          <SubHeader>
            <IconButton style={{ marginRight: '10px', background: 'dodgerblue' }}>
              <Icon path={mdiAccountMultiple} size={1} color={"rgba(0, 0, 0, 0.54)"} />
            </IconButton>
            <Primary>Nhóm hoạt động</Primary>
          </SubHeader>
          <p className="view_GroupAccount_Modal___subheader-item">Nhóm bạn sở hữu (1)</p>
          <div className="item-group">
            {!isEmpty(props.groupList.group_me) && (
              <ItemGroupAcount
                item={props.groupList.group_me}
                type="group_me"
                handleFetchData={props.handleFetchData}
              />
            )}
          </div>
          {
            !isEmpty(props.groupList.group_joins) && (
              <>
                <p className="view_GroupAccount_Modal___subheader-item">Nhóm bạn tham gia ({parseInt((get(props.groupList, "group_joins").length))})</p>
                <div className="item-group">
                  {props.groupList.group_joins.map((group, idx) => (
                    <ItemGroupAcount
                      item={group}
                      groupMe={props.groupList.group_me}
                      key={idx}
                      type="group_joins"
                      handleFetchData={props.handleFetchData}
                    />
                  ))}
                </div>
              </>
            )
          }
        </>
      );
    case "REQUIRE":
      return (
        <>
          <SubHeader>
            <IconButton style={{ marginRight: '10px', background: 'dodgerblue' }}>
              <Icon path={mdiAccountMultiple} size={1} color={"rgba(0, 0, 0, 0.54)"} />
            </IconButton>
            <Primary>Đã gửi yêu cầu</Primary>
          </SubHeader>
          {
            !isEmpty(props.groupList.requirements) && (
              <>

                {props.groupList.requirements.map((group, idx) => (
                  <div className="item-group">
                    <ItemGroupAcount
                      item={group}
                      groupMe={props.groupList.group_me}
                      key={idx}
                      type="requirements"
                      handleFetchData={props.handleFetchData}
                    />
                  </div>
                ))}
              </>
            )
          }
        </>
      );
    case "INVITE":
      return (
        <>
          <SubHeader>
            <IconButton style={{ marginRight: '10px', background: 'dodgerblue' }}>
              <Icon path={mdiAccountMultiple} size={1} color={"rgba(0, 0, 0, 0.54)"} />
            </IconButton>
            <Primary>Được mời tham gia</Primary>
          </SubHeader>
          {
            !isEmpty(props.groupList.invitations) && (
              <>
                {props.groupList.invitations.map((group, idx) => (
                  <div className="item-group">
                    <ItemGroupAcount
                      item={group}
                      groupMe={props.groupList.group_me}
                      key={idx}
                      type="invitations"
                      handleFetchData={props.handleFetchData}
                    />
                  </div>
                ))}
              </>
            )
          }
        </>
      );
    case "CREATE":
      return (
        <RenderJoinGroup/>
      )
    default:
      return null;

  }

}

function GroupAcountModal({ open, setOpen, ...props }) {
  const { t } = useTranslation();
  const [groupList, setGroup] = useState({});
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState("ACTIVE");

  const handleJoinNewGroup = () => {
    // props.actionVisibleDrawerMessage({
    //   type: DRAWER_TYPE.JOIN_NEW_GROUP,
    //   anchor: anchorDrawer
    // });
  };
  const listMenu = [
    {
      title: <p>{t('Nhóm hoạt động ')} ({!isEmpty(groupList) ? parseInt((get(groupList, "group_joins").length)) + (!isEmpty(get(groupList, "group_me")) ? 1 : 0) : 0})</p>,
      action: (() => { setMode("ACTIVE") }),
      color: '#fff',
    },
    {
      title: <p>{t('Đã gửi yêu cầu')} ({!isEmpty(groupList) ? get(groupList, "requirements").length : 0})</p>,
      action: (() => { setMode("REQUIRE") }),
      color: '#fff',
    },
    {
      title: <p>{t('Được mời tham gia')} ({!isEmpty(groupList) ? get(groupList, "invitations").length : 0})</p>,
      action: (() => { setMode("INVITE") }),
      color: '#fff',
    }
  ]

  const handleFetchData = async () => {
    try {
      setLoading(true);
      const { data } = await services.listGroupService();
      setGroup(data);
    } catch (err) { }
  };



  console.log("groupList: ", groupList);

  const handleChangeMode = selectedMode => {
    mode = selectedMode;
  }


  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
    setLoading(false)
  }, []);


  const handleToast = (type, message) => {
    props.actionToast(type, message);
  };

  const handleRequestJoinDemo = async group_id => {
    try {
      setLoading(true);
      await services.requestJoinGroupDemoService(group_id);
      handleFetchData();
      handleToast('success', 'Đã gửi yêu cầu thành công!');
    } catch (error) {
      handleToast('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const { colors } = props;

  const handleCopyText = text => {
    window.navigator.clipboard.writeText(text);
    handleToast('success', `${t('IDS_WP_ALREADY_COPY')} ${text}`);
  };

  return (
    <CustomModal
      title={t('Quản lý nhóm tài khoản')}
      className={"view_GroupAccount_Modal"}
      open={open}
      setOpen={setOpen}
      confirmRender={null}
      cancleRender={() => t('Thoát')}
      manualClose={false}
      maxWidth={"lg"}
      height={"medium"}
    >
      {!isEmpty(groupList) && (
        <Container>
          <SideBar style={{ backgroundColor: "#eeeeee" }}>
            <LoadingOverlay
              active={loading}
              spinner
              fadeSpeed={100}
            >
              <List>
                <OptionItem onClick={(() => { setMode("CREATE") })}>
                  <ListItemText primary={
                    <Button className="join-group-new"
                      style={{
                        backgroundColor: "dodgerblue", width: "100%"
                      }}
                    >
                      <span className="text-join-group-new" style={{ textTransform: 'uppercase', color: "#ffffff", fontWeight: "400" }}>
                        {t('IDS_WP_JOIN_NEW_GROUP')}
                      </span>
                    </Button>}
                  />
                </OptionItem>

                {listMenu.map((item, index) => (
                  <OptionItem onClick={item.action} button index={index}>
                    <IconButton style={{ marginRight: '10px', background: '#e0e0e0' }}>
                      <Icon path={mdiAccountMultiple} size={1} color={'rgba(0, 0, 0, 0.54)'} />
                    </IconButton>

                    <ListItemText primary={
                      <StyledPrimary style={{ fontWeight: 'normal' }}>
                        {item.title}
                      </StyledPrimary>
                    }
                    />
                  </OptionItem>

                ))}

              </List>

            </LoadingOverlay>
          </SideBar>
          <MainBar>
            <LoadingOverlay
              active={loading}
              spinner
              fadeSpeed={100}
            >
              <RenderRightPart 
              mode={mode} groupList={groupList} 
              handleFetchData={handleFetchData} />

            </LoadingOverlay>
          </MainBar>
        </Container>
      )}
    </CustomModal >
  );
};

export default connect(
  state => ({
    toast: state.system.toast,
    colors: state.setting.colors
  }),
  {
    actionToast
  }
)(GroupAcountModal);
