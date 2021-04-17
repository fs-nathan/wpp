import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grow,
  Menu,
  MenuItem,
  Popper
} from "@material-ui/core";
import {
  mdiClose,
  mdiDotsVertical,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiMagnify,
  mdiAccountPlus

} from "@mdi/js";
// import {
//   desireLoadingSelector,
//   desireUserSelector,
//   requireLoadingSelector,
//   requireUsersSelector
// } from "../";
import Icon from "@mdi/react";
import { get, isNil } from "lodash";
import * as images from "assets/index";

import {connect} from "react-redux";
import React from "react";
import { useTranslation } from "react-i18next";
import AddUserModalPresenter from "views/DepartmentPage/Modals/AddUserModal/presenters";
import SearchInput from "../../SearchInput";
import { CustomTableContext } from "../index";
import "./style.scss";
import { desireLoadingSelector, desireUserSelector, requireLoadingSelector, requireUsersSelector } from "views/DepartmentPage/LeftPart/AddUser/selectors";
import { searchUser, searchUserReset } from "actions/groupUser/searchUser";
import { inviteUserJoinGroup } from "actions/groupUser/inviteUserJoinGroup";
import CustomModal from "components/CustomModal";
import { ImagesContent } from "views/KanbanPage/KanbanBoard/KanbanItem";

export const StyledButton = ({ className = "", ...rest }) => (
  <Button
    className={`comp_CustomTable_HeaderButtonGroup___button ${className}`}
    {...rest}
  />
);

export const StyledPopper = ({ className = "", ...rest }) => (
  <Popper
    className={`comp_CustomTable_HeaderButtonGroup___popper ${className}`}
    {...rest}
  />
);

export const SearchBox = ({ className = "", ...rest }) => (
  <div
    className={`comp_CustomTable_HeaderButtonGroup___search-box ${className}`}
    {...rest}
  />
);

function HeaderButtonGroup({doSearchUser, desireUser, doSearchUserReset, doInviteUserJoinGroup,resetDesireUser}) {
  const { options } = React.useContext(CustomTableContext);
  const [searchAnchor, setSearchAnchor] = React.useState(null);
  const [moreAnchor, setMoreAnchor] = React.useState(null);
  const [open,setOpen] = React.useState(false);
  const [openAddMember, setOpenAddMember] = React.useState(false);
  function handleSearchClick(evt) {
    if (searchAnchor) {
      setSearchAnchor(null);
      get(options, "search.onChange", () => null)("");
    } else {
      setSearchAnchor(evt.currentTarget);
    }
  }

  function handleMoreOpen(evt) {
    setMoreAnchor(evt.currentTarget);
  }

  function handleMoreClick(handler) {
    return (evt) => {
      setMoreAnchor(null);
      handler();
    };
  }
 function handleAddMemberClick () {
   setOpenAddMember(true);
 }
  function handleMoreClose() {
    setMoreAnchor(null);
  }
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <ButtonGroup size="small" variant="text">
        {get(options, "search") && (
          <StyledButton onClick={handleSearchClick}>
            <div>
              <Icon
                path={Boolean(searchAnchor) ? mdiClose : mdiMagnify}
                size={1}
                color={"rgba(0, 0, 0, 0.54)"}
              />
            </div>
            <span>{Boolean(searchAnchor) ? t("Hủy") : t("Tìm kiếm")}</span>
          </StyledButton>
        )}

         
        {get(options, "subActions", []).map((subAction, index) =>
          isNil(subAction) ? null : (
            <StyledButton
              key={index}
              onClick={(evt) => {
                get(subAction, "onClick", () => null)(evt);
                get(subAction, "noExpand", false) &&
                  get(options, "expand.bool", false) &&
                  get(options, "expand.toggleExpand", () => null)();
              }}
            >
              <div>
                {get(subAction, "iconPath") ? (
                  <Icon
                    path={get(subAction, "iconPath")}
                    size={1}
                    color={"rgba(0, 0, 0, 0.54)"}
                  />
                ) : (
                    get(subAction, "icon", () => null)()
                  )}
              </div>
              <span>{t(get(subAction, "label", ""))}</span>
            </StyledButton>
          )
        )}

       {get(options, "addmember") && (
         <>
          <StyledButton onClick={handleAddMemberClick}>
          <div>
            <Icon
              path={mdiAccountPlus}
              size={1}
              color={"rgba(0, 0, 0, 0.54)"}
            />
          </div>
          <span>{t("LABEL_ADD_MEMBER")}</span>
        </StyledButton>
         <CustomModal
           title={t('DMH.VIEW.DP.RIGHT.UT.ADD_USER')}
           confirmRender={null}
           height={"miniWide"}
           manualClose={true}
           maxWidth="sm"
           open={openAddMember}
           className="modal-add-member"
           onCancle={()=> setOpenAddMember(false)}
           height={`mini`}
         >
            <div className="modal-add-member_content">
              <div className="modal-add-member_card" onClick={()=>{
                setOpen(true);
                setOpenAddMember(false)
              }}
                >
                <div className="modal-add-member_card-icon">
                  <img src={images.icon_add_member} alt=""/>
                </div>
                <div className="modal-add-member_card-text">
                  <h4>{t('DMH.VIEW.DP.RIGHT.UT.ADD_USER')}</h4>
                  <p>{t('LABEL_ADD_MEMBER_DESCRIPTION')}</p>
                </div>

              </div>
              <div className="modal-add-member_card" onClick={()=>{setOpenAddMember(false)}}>
                <div className="modal-add-member_card-icon">
                <img src={images.icon_create_user} alt=""/>
                </div>
                <div className="modal-add-member_card-text"> 
                  <h4>{t('LABEL_CREATE_ACCOUNT_TITLE')}</h4>
                  <p>{t('LABEL_CREATE_ACCOUNT_DESCRIPTION')}</p>
                </div>

              </div>
            </div>
         </CustomModal>
         <AddUserModalPresenter
         open={open} setOpen={setOpen}
         handleSearchUser={doSearchUser}
         desireUser={desireUser}
         handleClearDesireUsers={() => resetDesireUser()}
         handleInviteUserJoinGroup={doInviteUserJoinGroup}
       />
       </>
        )}

        {get(options, "expand") && (
          <StyledButton
            onClick={get(options, "expand.toggleExpand", () => null)}
          >
            <div>
              <Icon
                path={
                  get(options, "expand.bool", false)
                    ? mdiFullscreenExit
                    : mdiFullscreen
                }
                size={1}
                color={"rgba(0, 0, 0, 0.54)"}
              />
            </div>
            <span>
              {get(options, "expand.bool", false) ? t("Thu gọn") : t("Mở rộng")}
            </span>
          </StyledButton>
        )}
        {get(options, "moreMenu") && (
          <StyledButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMoreOpen}
          >
            <div>
              <Icon
                path={mdiDotsVertical}
                size={1}
                color={"rgba(0, 0, 0, 0.54)"}
              />
            </div>
            <span>{t("Thêm")}</span>
          </StyledButton>
        )}
      </ButtonGroup>
      {get(options, "search") && (
        <StyledPopper
          open={Boolean(searchAnchor)}
          anchorEl={searchAnchor}
          transition
          placement="left"
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={100}>
              <SearchBox>
                <SearchInput
                  placeholder={t("Nhập nội dung cần tìm")}
                  value={get(options, "search.patern", "")}
                  onChange={(evt) =>
                    get(
                      options,
                      "search.onChange",
                      () => null
                    )(evt.target.value)
                  }
                />
              </SearchBox>
            </Grow>
          )}
        </StyledPopper>
      )}
      {get(options, "moreMenu") && (
        <Menu
          id="simple-menu"
          anchorEl={moreAnchor}
          open={Boolean(moreAnchor)}
          onClose={handleMoreClose}
          transformOrigin={{
            vertical: -30,
            horizontal: "right",
          }}
        >
          {get(options, "moreMenu", []).map((item, index) =>
            isNil(item) ? null : (
              <MenuItem
                key={index}
                onClick={handleMoreClick(get(item, "onClick", () => null))}
                disabled={get(item, "disabled", false)}
              >
                {get(item, "disabled", false) && (
                  <CircularProgress
                    size={16}
                    className="margin-circular"
                    color="white"
                  />
                )}
                {get(item, "label", "")}
              </MenuItem>
            )
          )}
        </Menu>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    desireUser: desireUserSelector(state),
    desireLoading: desireLoadingSelector(state),
    requireUsers: requireUsersSelector(state),
    requireLoading: requireLoadingSelector(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doSearchUser: ({ info }, quite) => dispatch(searchUser({ info }, quite)),
    doSearchUserReset: () => dispatch(searchUserReset()),
    doInviteUserJoinGroup: ({ userId }) => dispatch(inviteUserJoinGroup({ userId })),
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(HeaderButtonGroup);
