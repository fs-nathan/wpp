import {
  Box,
  Button,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@material-ui/core";
import { defaultGroupTask } from "actions/groupTask/defaultGroupTask";
import React, {
  forwardRef,
  useImperativeHandle,
  useReducer,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectGroup from "views/ProjectGroupPage/Modals/CreateProjectGroup/index.js";
import ProjectGroupDelete from "views/ProjectGroupPage/Modals/DeleteProjectGroup/index.js";

const reducer = (state, action) => {
  return { ...state, ...action };
};

const initialState = {
  anchorElGroup: null,
  selectedGroup: null,
};

const PopoverSetGroupDefault = forwardRef(
  ({ onSetDefault = () => {} }, ref) => {
    const { t } = useTranslation();
    const [state, dispatchState] = useReducer(reducer, initialState);
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [isShowCreateGroup, setIsShowCreateGroup] = useState(false);
    const dispatch = useDispatch();

    const canModify = useSelector(
      ({ viewPermissions }) =>
        viewPermissions?.data?.projects?.manage_group_project || {}
    );

    useImperativeHandle(ref, () => ({ _open }));

    const _open = (anchorElGroup, selectedGroup) => {
      dispatchState({ anchorElGroup, selectedGroup });
    };

    const _close = (e) => {
      e && e.stopPropagation();
      dispatchState({ anchorElGroup: null, selectedGroup: null });
    };

    const _handleSetDefault = (value) => {
      // setDefaultAccessItem(value);
      // SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, t("SNACK_MUTATE_SUCCESS"));
      // onSetDefault(value);
      dispatch(defaultGroupTask(value));
    };

    const _deleteGroup = (e) => {
      e.stopPropagation();
      setIsShowAlert(true);
    };

    const _updateGroup = (e) => {
      e.stopPropagation();
      setIsShowCreateGroup(true);
    };

    return (
      <>
        <Popover
          open={Boolean(state.anchorElGroup)}
          anchorEl={state.anchorElGroup}
          disableRestoreFocus
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={_close}
          elevation={0}
        >
          <Box className={"personalBoard-container"}>
            <Box className={"personalBoard-actionItemWrapper"}>
              <span className={"title"}>{t("LABEL_SET_DEFAULT")}</span>
              <Box className={"actionItem"}>
                <Typography variant={"body2"} color={"textSecondary"}>
                  {t("LABEL_SET_DEFAULT_DES")}
                </Typography>
                <Button
                  color={"primary"}
                  onClick={(evt) => {
                    evt.stopPropagation();
                    _handleSetDefault(`?groupID=${state.selectedGroup.id}`);
                    _close();
                  }}
                >
                  {t("LABEL_SET")}
                </Button>
              </Box>
            </Box>
          </Box>

          {canModify && (
            <>
              <Divider />
              <MenuList>
                <MenuItem onClick={_updateGroup}>
                  {t("IDS_WP_EDIT_TEXT")}
                </MenuItem>
                <MenuItem onClick={(evt) => _deleteGroup(evt)}>
                  {t("IDS_WP_DELETE")}
                </MenuItem>
              </MenuList>
            </>
          )}
        </Popover>

        {/* Delete Confirm */}
        <ProjectGroupDelete
          open={isShowAlert}
          setOpen={setIsShowAlert}
          selectedProjectGroup={state.selectedGroup}
          redirectURL="/projects/recently"
        />

        {/* Delete Confirm */}
        <CreateProjectGroup
          open={isShowCreateGroup}
          setOpen={setIsShowCreateGroup}
          updatedProjectGroup={state.selectedGroup}
        />
      </>
    );
  }
);

export default PopoverSetGroupDefault;
