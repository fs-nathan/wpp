import { ButtonBase } from "@material-ui/core";
import CustomAvatar from "components/CustomAvatar";
import CustomModal, { Title } from "components/CustomModal";
import CustomTextbox from "components/CustomTextbox";
import UploadButton from "components/UploadButton";
import {
  CREATE_ROOM,
  CustomEventDispose,
  CustomEventListener,
  DETAIL_ROOM,
  GET_USER_OF_ROOM,
  LIST_ROOM,
  LIST_USER_OF_GROUP,
  UPDATE_ROOM,
} from "constants/events";
import { useMaxlenString, useRequiredString } from "hooks";
import { get } from "lodash";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LogoManagerContext } from "../LogoManager/presenters";
import "./style.scss";

// const LogoBox = ({ className = "", ...props }) => (
//   <div
//     className={`view_Department_Create_Modal___logo-box ${className}`}
//     {...props}
//   />
// );

const LogoBox = ({ className = "", isSelect, ...props }) => (
  <div
    className={`${
      isSelect
        ? "view_Department_Logo_Modal___logo-box-selected"
        : "view_Department_Logo_Modal___logo-box"
    } ${className}`}
    {...props}
  />
);

function CreateAndUpdateDepartment({
  updateDepartment = null,
  open,
  setOpen,
  handleCreateOrUpdateRoom,
  handleOpenModal,
  doReloadRoom,
}) {
  const [name, setName, errorName] = useRequiredString("", 100);
  const [description, setDescription] = useMaxlenString("", 500);
  const [icon, setIcon] = React.useState({
    url_full: "",
    url_sort: "",
  });
  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(3);
  const { icons, isSelect, selectedIcon, setSelectedIcon } =
    useContext(LogoManagerContext);
  React.useEffect(() => {
    setActiveLoading(activeMask === 3 || activeMask === -1 ? false : true);
    if (activeMask === 3) {
      setOpen(false);
      setName("");
      setDescription("");
      setIcon({
        url_full: "",
        url_sort: "",
      });
    }
    // eslint-disable-next-line
  }, [activeMask]);

  React.useEffect(() => {
    if (updateDepartment) {
      setName(get(updateDepartment, "name", ""));
      setDescription(get(updateDepartment, "description", ""));
      setIcon({
        url_full: get(updateDepartment, "icon", ""),
        url_sort: get(updateDepartment, "icon_sort", ""),
      });
    }
    // eslint-disable-next-line
  }, [updateDepartment]);

  React.useEffect(() => {
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(CREATE_ROOM.SUCCESS, doReloadRoom);
    CustomEventListener(UPDATE_ROOM.SUCCESS, doReloadRoom);
    CustomEventListener(CREATE_ROOM.FAIL, fail);
    CustomEventListener(UPDATE_ROOM.FAIL, fail);
    return () => {
      CustomEventDispose(CREATE_ROOM.SUCCESS, doReloadRoom);
      CustomEventDispose(UPDATE_ROOM.SUCCESS, doReloadRoom);
      CustomEventDispose(CREATE_ROOM.FAIL, fail);
      CustomEventDispose(UPDATE_ROOM.FAIL, fail);
    };
    // eslint-disable-next-line
  }, [updateDepartment]);

  React.useEffect(() => {
    const success = (bit) => () => {
      setActiveMask((oldMask) => oldMask | (1 << bit));
    };
    const fail = () => {
      setActiveMask(-1);
    };
    if (updateDepartment) {
      CustomEventListener(DETAIL_ROOM.SUCCESS, success(0));
      CustomEventListener(GET_USER_OF_ROOM.SUCCESS, success(1));
      CustomEventListener(DETAIL_ROOM.FAIL, fail);
      CustomEventListener(GET_USER_OF_ROOM.FAIL, fail);
    } else {
      CustomEventListener(LIST_ROOM.SUCCESS, success(0));
      CustomEventListener(LIST_USER_OF_GROUP.SUCCESS, success(1));
      CustomEventListener(LIST_ROOM.FAIL, fail);
      CustomEventListener(LIST_USER_OF_GROUP.FAIL, fail);
    }
    return () => {
      if (updateDepartment) {
        CustomEventDispose(DETAIL_ROOM.SUCCESS, success(0));
        CustomEventDispose(GET_USER_OF_ROOM.SUCCESS, success(1));
        CustomEventDispose(DETAIL_ROOM.FAIL, fail);
        CustomEventDispose(GET_USER_OF_ROOM.FAIL, fail);
      } else {
        CustomEventDispose(LIST_ROOM.SUCCESS, success(0));
        CustomEventDispose(LIST_USER_OF_GROUP.SUCCESS, success(1));
        CustomEventDispose(LIST_ROOM.FAIL, fail);
        CustomEventDispose(LIST_USER_OF_GROUP.FAIL, fail);
      }
    };
    // eslint-disable-next-line
  }, [updateDepartment]);

  return (
    <React.Fragment>
      <CustomModal
        title={
          updateDepartment
            ? t("DMH.VIEW.DP.MODAL.CUDP.U_TITLE")
            : t("DMH.VIEW.DP.MODAL.CUDP.C_TITLE")
        }
        open={open}
        setOpen={setOpen}
        onConfirm={() => {
          handleCreateOrUpdateRoom(name, description, icon);
          setActiveMask(0);
        }}
        canConfirm={!errorName}
        onCancle={() => setOpen(false)}
        manualClose={true}
        activeLoading={activeLoading}
        height={"mini"}
      >
        <CustomTextbox
          value={name}
          onChange={(newName) => setName(newName)}
          label={t("DMH.VIEW.DP.MODAL.CUDP.NAME")}
          fullWidth
          required={true}
        />
        <CustomTextbox
          value={description}
          multiline={true}
          label={t("DMH.VIEW.DP.MODAL.CUDP.DESC")}
          onChange={(newDescription) => setDescription(newDescription)}
        />
        <div>
          <div>
            <Title>{t("DMH.VIEW.DP.MODAL.CUDP.LOGO")}</Title>
            <UploadButton
              label={t("DMH.VIEW.DP.MODAL.CUDP.LOGO_SELECT")}
              onClick={() =>
                handleOpenModal("LOGO", {
                  doSelectIcon: (icon) => setIcon(icon),
                  selectedIcon: icon,
                })
              }
            />
          </div>

          <div>
            {icons.defaults.map((icon) => {
              return (
                <LogoBox
                  key={get(icon, "url_icon")}
                  isSelect={
                    isSelect &&
                    get(selectedIcon, "url_sort", "x") ===
                      get(icon, "icon", "y")
                  }
                >
                  <ButtonBase
                    disabled={!isSelect}
                    onClick={() =>
                      isSelect &&
                      setSelectedIcon({
                        id: get(icon, "id"),
                        url_sort: get(icon, "icon"),
                        url_full: get(icon, "url_icon"),
                      })
                    }
                  >
                    {/* <Avatar src={get(icon, "url_icon")} alt="avatar" /> */}
                    <CustomAvatar src={get(icon, "url_icon")} alt="avatar" />
                  </ButtonBase>
                </LogoBox>
              );
            })}
          </div>
        </div>
      </CustomModal>
    </React.Fragment>
  );
}

export default CreateAndUpdateDepartment;
