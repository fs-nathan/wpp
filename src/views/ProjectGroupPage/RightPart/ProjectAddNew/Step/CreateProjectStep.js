import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Add, Forum, List } from "@material-ui/icons";
import ViewKanbanRoundedIcon from "@mui/icons-material/ViewKanbanRounded";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ViewTimelineRoundedIcon from "@mui/icons-material/ViewTimelineRounded";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import * as images from "assets/index";
import CustomModal, { Title } from "components/CustomModal";
import CustomTextbox from "components/CustomTextbox";
import CustomTextboxSelect from "components/CustomTextboxSelect";
import {
  CREATE_PROJECT,
  CustomEventDispose,
  CustomEventListener,
  LIST_PROJECT,
} from "constants/events.js";
import { Routes } from "constants/routes";
import { useMaxlenString, useRequiredString } from "hooks";
import { find, first, isNil } from "lodash";
import { useEffect, useRef, useState } from "react";
// import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import SelectGroupProject from "./SelectGroupProject";
import { connect, useSelector } from "react-redux";
import { createProject } from "actions/project/createProject";

// import { ListTagsCreateProject } from "./components";

const CreateProjectStep = ({ onNext, doCreateProject, onBack }) => {
  const { t } = useTranslation();
  const [haveDescription, setHaveDescription] = useState(false);
  const [name, setName, errorName] = useRequiredString("", 200);
  const [description, setDescription] = useMaxlenString("", 500);
  const [curProjectGroupId, setCurProjectGroupId] = useState("");
  const [curProjectGroupName, setCurProjectGroupName] = useState("");
  const history = useHistory();
  const [openSelectGroupProjectModal, setOpenSelectGroupProjectModal] =
    useState(false);
  const [view_default, setViewDefault] = useState(1);

  function onNextHandler() {
    // doCreateProject({
    //   name,
    //   description,
    //   project_label_id: curProjectGroupId,
    //   view_default,
    // });
    onNext();
  }

  return (
    <>
      <Box className="create-project-step">
        <div className="back-button" onClick={onBack}>
          <ArrowBackIcon fontSize="large" htmlColor="#969ead" />
        </div>
        <div className="create-project-step-form">
          <Typography variant="h4" marginBottom={12}>
            {t("CREATE_NEW_PROJECT")}
          </Typography>
          <CustomTextbox
            value={name}
            onChange={(value) => setName(value)}
            label={`${t("LABEL_WORKING_BOARD_NAME")}`}
            fullWidth
            required
            className={
              "view_ProjectGroup_CreateNew_Project_Modal_formItem per-line-step-in-form"
            }
          />

          {haveDescription ? (
            <CustomTextbox
              value={description}
              onChange={(value) => setDescription(value)}
              label={`${t("LABEL_BOARD_DETAIL")}`}
              fullWidth
              multiline={true}
              className="per-line-step-in-form"
            />
          ) : (
            <Button
              className="per-line-step-in-form"
              variant="text"
              startIcon={<Add />}
              onClick={() => setHaveDescription(true)}
            >
              Thêm mô tả
            </Button>
          )}

          <div className="select-customer-from-input per-line-step-in-form">
            <CustomTextboxSelect
              value={curProjectGroupName}
              onClick={() => {
                setOpenSelectGroupProjectModal(true);
              }}
              label={`${t("DMH.VIEW.PGP.MODAL.CUP.GROUPS")}`}
              fullWidth
              required={true}
              className={"view_ProjectGroup_CreateNew_Project_Modal_formItem "}
              isReadOnly={true}
            />
            <ArrowDropDownIcon className="icon-arrow" />
          </div>

          <div className="choose-view per-line-step-in-form">
            <p>{t("CREATE_DEFAULT_VIEW")}</p>
            <ButtonGroup
              variant="outlined"
              size="large"
              aria-label="outlined primary button group "
              className="choose-view-options per-line-step-in-form"
            >
              <Button
                variant="outline"
                size="large"
                startIcon={<List htmlColor="#f8949e" />}
                className={`${
                  view_default === 1 && "choose-view-button--active"
                }`}
                onClick={() => setViewDefault(1)}
              >
                List
              </Button>
              <Button
                variant="outline"
                size="large"
                startIcon={<ViewKanbanRoundedIcon sx={{ color: "#3aaff5" }} />}
                className={`${
                  view_default === 2 && "choose-view-button--active"
                }`}
                onClick={() => setViewDefault(2)}
              >
                Board
              </Button>
              <Button
                variant="outline"
                size="large"
                startIcon={
                  <ViewTimelineRoundedIcon sx={{ color: "#2fbf9c" }} />
                }
                className={`${
                  view_default === 3 && "choose-view-button--active"
                }`}
                onClick={() => setViewDefault(3)}
              >
                Timeline
              </Button>
              <Button
                variant="outline"
                size="large"
                startIcon={<Forum htmlColor="#f7cd55" />}
                className={`${
                  view_default === 4 && "choose-view-button--active"
                }`}
                onClick={() => setViewDefault(4)}
              >
                Discuss
              </Button>
            </ButtonGroup>
            <div className="submit-button">
              <Button
                size="large"
                endIcon={<ArrowRightAltIcon />}
                variant="contained"
                color="primary"
                onClick={onNextHandler}
              >
                {t("CREATE_NEXT")}
              </Button>
            </div>
          </div>
        </div>
      </Box>

      {/* Select Group */}
      {openSelectGroupProjectModal && (
        <SelectGroupProject
          isOpen={true}
          setOpen={(value) => setOpenSelectGroupProjectModal(value)}
          selectedOption={(group) => {
            setCurProjectGroupId(group.id);
            setCurProjectGroupName(group.name);
          }}
          groupSelected={curProjectGroupId}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => {
  return {
    doCreateProject: ({ name, description, project_label_id, view_default }) =>
      dispatch(
        createProject({
          name,
          description,
          project_label_id,
          view_default,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectStep);
