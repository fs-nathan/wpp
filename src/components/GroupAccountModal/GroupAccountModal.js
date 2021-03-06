import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import './GroupAccountModal.scss';
import {connect} from 'react-redux';
import {mdiAccountMultiple, mdiClose, mdiMagnify} from '@mdi/js';
import {get, concat, size} from 'lodash';
import {actionToast} from '../../actions/system/system';
import ItemGroupAcount from './ItemGroupAccount';
import {isEmpty} from '../../helpers/utils/isEmpty';
import {Primary} from '../CustomList';
import * as services from '../Drawer/DrawerService';
import Icon from '@mdi/react';
import {Button, IconButton, InputAdornment, InputBase, List, ListItem, ListItemText} from "@material-ui/core";
import CustomModal from 'components/CustomModal';
import LoadingBox from "../LoadingBox";
import {Scrollbars} from "react-custom-scrollbars";
import {upcoming} from "assets";

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_GroupAccount_Modal___container ${className}`}
    {...props}
  />

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


function RenderJoinGroup ({setMode, handleFetchData}) {
  const { t } = useTranslation();
  const [groupSearch, setGroupSearch] = useState({});
  const [emptyMess, setEmptyMess] = useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isFocus, setIsFocus] = React.useState(false);

  const handleSearchGroup = () => {
    setGroupSearch({});
    handleSearch().then(r => null);
  }
  const handleSearch = React.useCallback(async () => {
    try {
      const res = await services.findGroupService(searchValue);
      setEmptyMess(null);
      setGroupSearch(res.data.group);
    } catch (e) {
      setEmptyMess(t("Kh??ng c?? nh??m n??o ???????c t??m th???y"));
      setGroupSearch({});
    }
  }, [setEmptyMess, setGroupSearch, searchValue]);
  function handleCancel() {
    setEmptyMess(null);
    setGroupSearch({});
    setSearchValue("");
  }
  return (
    <>
      <div className="view_GroupAccount_Modal_joinGroup">
        <p className="view_GroupAccount_Modal_joinGroup_title">
          {t("LABEL_WANT_TO_JOIN_GROUP")}
        </p>
        <InputBase
          value={searchValue}
          className="view_GroupAccount_Modal_joinGroup_searchBox"
          style={isFocus ? {border: "2px solid var(--color-primary)"} : {}}
          placeholder={t('MESSAGE_SEARCH_GROUP_FOR_JOIN')} autoFocus
          startAdornment={
            <InputAdornment position="start">
              <Icon path={mdiMagnify} size={1.3} color="#8e8e8e"/>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position={"end"}>
              {searchValue !== "" && (
                <IconButton onClick={() => handleCancel()} style={{marginRight: "5px"}}>
                  <Icon path={mdiClose} size={0.7} color={"rgba(0,0,0,0.54)"}/>
                </IconButton>
              )}
              <Button variant={"contained"} color={"primary"} size={"small"} onClick={() => handleSearchGroup()} disableElevation>
                {t("LABEL_SEARCHING")}
              </Button>
            </InputAdornment>
          }
          onChange={e => setSearchValue(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </div>
      <div className="view_GroupAccount_Modal_joinGroup_searchResult">
        {!isEmpty(groupSearch) ? (
          <>
            <span>{t('MESSAGE_SEARCHING_RESULT')}</span>
            <ItemGroupAcount item={groupSearch} type="join" setMode={setMode} handleFetchData={handleFetchData}/>
          </>
        ) : (
          emptyMess && <p className="red-text">{emptyMess}</p>
        )}
      </div>
    </>
  )
}


const RenderRightPart = props => {
  const { t } = useTranslation();
  function renderEmptyView(type) {
    return <div className={"view_GroupAccount_Modal__emptyView"}>
      <img src={upcoming} alt={""} width={50}/>
      <span>{t(`LABEL_GROUP_ACCOUNT_EMPTY_${type}`)}</span>
    </div>
  }
  switch (props.mode) {
    case "ACTIVE":
      return (
        <>
          <SubHeader>
            <IconButton style={{ marginRight: '10px', background: 'var(--color-primary)', padding: "7px"}}>
              <Icon path={mdiAccountMultiple} size={1} color={"#fff"} />
            </IconButton>
            <Primary>{t("LABEL_GROUP_JOINING")}</Primary>
          </SubHeader>
          <div style={{padding: "0 20px"}}>
            <p className="view_GroupAccount_Modal___subheader-item">{t("LABEL_GROUP_OWNER")} (1)</p>
            {!isEmpty(props.groupList.group_me) && (
              <ItemGroupAcount
                item={props.groupList.group_me}
                type="group_me"
                handleFetchData={props.handleFetchData}
              />
            )}
            {
              !isEmpty(props.groupList.group_joins) && (
                <>
                  <p className="view_GroupAccount_Modal___subheader-item">{t("LABEL_GROUP_JOINED")} ({parseInt((get(props.groupList, "group_joins").length))})</p>
                  {props.groupList.group_joins.map((group, idx) => (
                    <ItemGroupAcount
                      item={group}
                      groupMe={props.groupList.group_me}
                      key={idx}
                      type="group_joins"
                      handleFetchData={props.handleFetchData}
                    />
                  ))}
                </>
              )
            }
          </div>
        </>
      );
    case "REQUIRE":
      return (
        <>
          <SubHeader>
            <IconButton style={{ marginRight: '10px', background: 'var(--color-primary)', padding: "7px" }}>
              <Icon path={mdiAccountMultiple} size={1} color={"#fff"} />
            </IconButton>
            <Primary>{t("LABEL_GROUP_REQUIRED")}</Primary>
          </SubHeader>
          <div>
            { isEmpty(props.groupList.requirements) && renderEmptyView("REQUIREMENTS")}
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
                      setMode={props.setMode}
                    />
                  </div>
                ))}
              </>
            )
          }
          </div>
        </>
      );
    case "INVITE":
      let groupDemo = props.groupList.group_demo;
      let groups = props.groupList.invitations;
      if(size(groupDemo) > 0) {
        groupDemo["is_demo"] = true;
        groups = concat(groups, groupDemo);
      }
      return (
        <>
          <SubHeader>
            <IconButton style={{ marginRight: '10px', background: 'var(--color-primary)', padding: "7px" }}>
              <Icon path={mdiAccountMultiple} size={1} color={"#fff"} />
            </IconButton>
            <Primary>{t("LABEL_GROUP_INVITED")}</Primary>
          </SubHeader>
          { isEmpty(groups) && renderEmptyView("INVITATIONS")}
          {
            !isEmpty(groups) && (
              <>
                {groups.map((group, idx) => (
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
        <RenderJoinGroup setMode={props.setMode} handleFetchData={props.handleFetchData}/>
      )
    default:
      return null;
  }
}

function GroupAccountModal({ open, setOpen, ...props }) {
  const { t } = useTranslation();
  const [groupList, setGroup] = useState({});
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState("ACTIVE");
  const modeMapping = ["ACTIVE", "REQUIRE", "INVITE"];

  const listMenu = [
    {
      title: <p>{t('LABEL_GROUP_JOINING')} ({!isEmpty(groupList) ? parseInt((get(groupList, "group_joins").length)) + (!isEmpty(get(groupList, "group_me")) ? 1 : 0) : 0})</p>,
      action: (() => { setMode("ACTIVE") }),
      color: '#fff',
    },
    {
      title: <p>{t('LABEL_GROUP_REQUIRED')} ({!isEmpty(groupList) ? get(groupList, "requirements").length : 0})</p>,
      action: (() => { setMode("REQUIRE") }),
      color: '#fff',
    },
    {
      title: <p>{t('LABEL_GROUP_INVITED')} ({!isEmpty(groupList) ? parseInt((get(groupList, "invitations").length)) + (!isEmpty(get(groupList, "group_demo")) ? 1 : 0) : 0})</p>,
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

  useEffect(() => {
    handleFetchData().then(r => setLoading(false));
  }, []);

  return (
    <CustomModal
      title={t('Qu???n l?? nh??m t??i kho???n')}
      className={"view_GroupAccount_Modal"}
      open={open}
      setOpen={setOpen}
      confirmRender={null}
      cancleRender={() => t('Tho??t')}
      manualClose={false}
      maxWidth={"lg"}
      height={"medium"}
    >
      {loading && <LoadingBox />}
      {!loading && (
        <Container>
          <SideBar style={{ backgroundColor: "#f1f2f4" }}>
            <List>
              <OptionItem onClick={(() => { setMode("CREATE") })}>
                <ListItemText primary={
                  <Button className="join-group-new">
                      <span className="text-join-group-new" style={{ textTransform: 'uppercase', color: "#ffffff", fontWeight: "400" }}>
                        {t('IDS_WP_JOIN_NEW_GROUP')}
                      </span>
                  </Button>}
                />
              </OptionItem>
              {listMenu.map((item, index) => (
                <OptionItem onClick={item.action} button index={index} className={`${mode === modeMapping[index] && "view_GroupAccount_Modal_activeMode"}`}>
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
          </SideBar>
          <MainBar>
            <Scrollbars autoHide>
              <RenderRightPart
                mode={mode} groupList={groupList}
                handleFetchData={() => handleFetchData().then(r => setLoading(false))}
                setMode={setMode}
              />
            </Scrollbars>
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
  {actionToast}
)(GroupAccountModal);
