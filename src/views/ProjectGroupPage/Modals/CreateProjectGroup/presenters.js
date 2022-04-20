import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ButtonBase,
} from "@material-ui/core";
import CustomAvatar from "components/CustomAvatar";
import CustomModal, { Title } from "components/CustomModal";
import CustomTextbox from "components/CustomTextbox";
import UploadButton from "components/UploadButton";
import {
  CREATE_PROJECT_GROUP,
  CustomEventDispose,
  CustomEventListener,
  DETAIL_PROJECT_GROUP,
  EDIT_PROJECT_GROUP,
  LIST_PROJECT_GROUP,
} from "constants/events.js";
import { useMaxlenString, useRequiredString } from "hooks";
import { get } from "lodash";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Typography } from "antd";
import { colors } from "../ColorGroupPickerModal";
import { DEFAULT_GROUP_BACKGROUND_COLOR } from "../../RightPart/AllProjectTable/components/PropjectGroupGrid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { LogoManagerContext } from "views/DepartmentPage/Modals/LogoManager/presenters";

const ThemeLogoBox = ({ className = "", ...props }) => (
  <div
    className={`view_ProjectGroup_Create_ProjectGroup___logo-box ${className}`}
    {...props}
  />
);

const LogoBox = ({ className = "", isSelect, ...props }) => (
  <div
    className={`${
      isSelect
        ? "view_Department_Logo_Modal___logo-box-selected createProjectGroup__logo-box"
        : "view_Department_Logo_Modal___logo-box createProjectGroup__logo-box"
    } ${className}`}
    {...props}
  />
);

function CreateProjectGroup({
  updatedProjectGroup,
  open,
  setOpen,
  handleCreateOrEditProjectGroup,
  handleOpenModal,
  doReloadDetail,
  doReloadList,
  selectedColor,
  setSelectedColor,

  createSuccessCallBack = () => {},
}) {
  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString("", 150);
  const [description, setDescription] = useMaxlenString("", 500);

  const [activeLoading, setActiveLoading] = React.useState(false);
  const [isAddingDescription, setIsAddingDescription] = React.useState(false);
  // const [selectedColor, setSelectedColor] = React.useState(colors[0]);
  const { icons, isSelect, selectedIcon, setSelectedIcon } =
    useContext(LogoManagerContext);
  React.useEffect(() => {
    if (!updatedProjectGroup) {
      return;
    }
    setName(get(updatedProjectGroup, "name"));
    setDescription(get(updatedProjectGroup, "description"));
    setSelectedIcon({
      url_full: get(updatedProjectGroup, "icon"),
      url_sort: get(updatedProjectGroup, "sort_icon") || "",
    });
    setSelectedColor(get(updatedProjectGroup, "color"));
  }, [updatedProjectGroup]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    debugger;
    if (updatedProjectGroup) {
      CustomEventListener(EDIT_PROJECT_GROUP.SUCCESS, doReloadDetail);
      CustomEventListener(EDIT_PROJECT_GROUP.FAIL, fail);
    } else {
      CustomEventListener(CREATE_PROJECT_GROUP.SUCCESS, doReloadList);
      CustomEventListener(CREATE_PROJECT_GROUP.SUCCESS, createSuccessCallBack);
      CustomEventListener(CREATE_PROJECT_GROUP.FAIL, fail);
    }
    return () => {
      if (updatedProjectGroup) {
        CustomEventDispose(EDIT_PROJECT_GROUP.SUCCESS, doReloadDetail);
        CustomEventDispose(EDIT_PROJECT_GROUP.FAIL, fail);
      } else {
        CustomEventDispose(CREATE_PROJECT_GROUP.SUCCESS, doReloadList);
        CustomEventDispose(CREATE_PROJECT_GROUP.SUCCESS, createSuccessCallBack);
        CustomEventDispose(CREATE_PROJECT_GROUP.FAIL, fail);
      }
    };
    // eslint-disable-next-line
  }, [updatedProjectGroup]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    if (updatedProjectGroup) {
      CustomEventListener(DETAIL_PROJECT_GROUP.SUCCESS, doReloadList);
      CustomEventListener(DETAIL_PROJECT_GROUP.FAIL, fail);
    }
    return () => {
      if (updatedProjectGroup) {
        CustomEventDispose(DETAIL_PROJECT_GROUP.SUCCESS, doReloadList);
        CustomEventDispose(DETAIL_PROJECT_GROUP.FAIL, fail);
      }
    };
    // eslint-disable-next-line
  }, [updatedProjectGroup]);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      setName("");
      setDescription("");
      setSelectedIcon({
        url_full: "",
        url_sort: "",
      });
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_PROJECT_GROUP.SUCCESS, success);
    CustomEventListener(LIST_PROJECT_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT_GROUP.SUCCESS, success);
      CustomEventDispose(LIST_PROJECT_GROUP.FAIL, fail);
    };
  }, []);

  const reorderColor = (colorList, selectedColor) => {
    const colorArr = [...colorList];
    const indexSelectedColor = colorArr.findIndex(
      (color) => color === selectedColor
    );
    if (indexSelectedColor < 5) return colorArr;
    if (indexSelectedColor !== -1) {
      colorArr.splice(indexSelectedColor, 1);
      colorArr.splice(0, 0, selectedColor);
    }

    return colorArr;
  };
  const reorderIcons = (icons, selectedIcon) => {
    const iconsArr = [...icons];
    if (selectedIcon.url_full === "") return iconsArr;

    const indexSelectedIcon = iconsArr.findIndex(
      (icon) => icon.url_icon === selectedIcon.url_full
    );
    if (indexSelectedIcon < 5) return iconsArr;
    if (indexSelectedIcon !== -1) {
      const removedIcon = iconsArr.splice(indexSelectedIcon, 1);
      iconsArr.splice(0, 0, removedIcon[0]);
    }

    return iconsArr;
  };

  const orderedColorArr = reorderColor(colors, selectedColor).splice(0, 5);
  const orderedIconArr = reorderIcons(icons.defaults, selectedIcon).splice(
    0,
    5
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setIsAddingDescription(isExpanded ? panel : false);
  };

  return (
    <CustomModal
      title={
        updatedProjectGroup
          ? t("DMH.VIEW.PGP.MODAL.CUPG.U_TITLE")
          : t("DMH.VIEW.PGP.MODAL.CUPG.C_TITLE")
      }
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName}
      onConfirm={() => {
        handleCreateOrEditProjectGroup(
          name,
          description,
          selectedIcon,
          selectedColor
        );
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      activeLoading={activeLoading}
      manualClose={true}
      height={!isAddingDescription ? "mini" : "short"}
      maxWidth={"sm"}
      className=""
    >
      <CustomTextbox
        value={name}
        onChange={(value) => setName(value)}
        label={t("DMH.VIEW.PGP.MODAL.CUPG.NAME")}
        fullWidth
        required={true}
      />
      <Accordion
        expanded={isAddingDescription === "panel1"}
        onChange={handleChange("panel1")}
        className={"createProjectGroup__collapsed--container"}
      >
        <AccordionSummary
          aria-controls="panel1bh-content"
          className="createProjectGroup__collapsed--title"
        >
          {isAddingDescription ? <RemoveIcon /> : <AddIcon />}
          {t("DMH.VIEW.PGP.MODAL.CUPG.ADD_DESC")}
        </AccordionSummary>
        <AccordionDetails>
          <CustomTextbox
            value={description}
            label={t("DMH.VIEW.PGP.MODAL.CUPG.DESC")}
            onChange={(value) => setDescription(value)}
            fullWidth
            multiline={true}
            className={"createProjectGroup__collapsed--text-box"}
          />
        </AccordionDetails>
      </Accordion>
      <ThemeLogoBox>
        <Title className="createProjectGroup__theme--title">
          {t("DMH.VIEW.PGP.MODAL.CUPG.LOGO_THEME")}
        </Title>

        <div className="createProjectGroup__theme--list">
          {orderedColorArr.map((color) => {
            const isSelected = selectedColor === color;
            return (
              <div
                className={`createProjectGroup__theme--item ${
                  isSelected ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                key={color}
              >
                {isSelected && <DoneOutlinedIcon />}
              </div>
            );
          })}
          <div
            className="createProjectGroup__theme--item"
            style={{ backgroundColor: "#f5f6f8" }}
            onClick={() =>
              handleOpenModal("COLOR_PICKER", {
                projectGroupColor: selectedColor,
              })
            }
          >
            <MoreHorizIcon />
          </div>
        </div>

        <div className="createProjectGroup__logo-box--list">
          {orderedIconArr.map((icon) => {
            return (
              <LogoBox
                key={get(icon, "url_icon")}
                isSelect={
                  isSelect &&
                  get(selectedIcon, "url_full", "x") ===
                    get(icon, "url_icon", "y")
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
                  <CustomAvatar
                    src={get(icon, "url_icon")}
                    alt="avatar"
                    className={"createProjectGroup__logo-box--avatar"}
                  />
                </ButtonBase>
              </LogoBox>
            );
          })}
          <div
            className="createProjectGroup__theme--item"
            style={{ backgroundColor: "#f5f6f8" }}
            onClick={() =>
              handleOpenModal("LOGO", {
                doSelectIcon: (icon) => setSelectedIcon(icon),
                selectedIcon: selectedIcon,
                canUpload: true,
              })
            }
          >
            <MoreHorizIcon />
          </div>
        </div>
      </ThemeLogoBox>
    </CustomModal>
  );
}

export default CreateProjectGroup;
