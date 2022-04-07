import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Box, Typography } from "@mui/material";
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
// import { ListTagsCreateProject } from "./components";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StyledFormControl = ({ className = "", ...props }) => (
  <FormControl
    className={`view_ProjectGroup_CreateNew_Project_Modal___form-control ${className} per-line-step-in-form`}
    {...props}
  />
);
const CreateProjectStep = ({
  onNext,
  groups = [],
  work_types,
  handleCreateProject,
  doReload,
  projectGroupId,
  timeRange,
}) => {
  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString("", 200);
  const [description, setDescription] = useMaxlenString("", 500);
  const [priority, setPriority] = useState(0);
  const [currency] = useState(0);
  const [curProjectGroupId, setCurProjectGroupId] = useState(projectGroupId);
  const [curProjectGroupName, setCurProjectGroupName] = useState("");
  const [activeLoading, setActiveLoading] = useState(false);
  const [workingType, setWorkingType] = useState(0);
  const [selectableGroup, setSelectableGroup] = useState([]);
  const history = useHistory();
  const [openSelectGroupProjectModal, setOpenSelectGroupProjectModal] =
    useState(false);
  const params = useQuery();
  const refListTag = useRef(null);

  // useEffect(() => {
  //   const fail = () => {
  //     setActiveLoading(false);
  //   };
  //   CustomEventListener(CREATE_PROJECT.FAIL, fail);
  //   CustomEventListener(CREATE_PROJECT.SUCCESS, (e) => {
  //     history.push(`${Routes.PROJECT}/${e.detail.project_id}?guideline=true`);
  //   });
  //   return () => {
  //     CustomEventDispose(CREATE_PROJECT.SUCCESS, (e) => {
  //       history.push(`${Routes.PROJECT}/${e.detail.project_id}?guideline=true`);
  //     });
  //     CustomEventDispose(CREATE_PROJECT.FAIL, fail);
  //   };
  // }, [projectGroupId, timeRange, doReload]);

  // useEffect(() => {
  //   const groupID = params.get("groupID")
  //     ? params.get("groupID")
  //     : curProjectGroupId
  //     ? curProjectGroupId
  //     : null;
  //   if (groupID) {
  //     const group = find(groups.groups, { id: groupID });
  //     setCurProjectGroupId(group ? group.id : null);
  //     setCurProjectGroupName(group ? group.name : "");
  //   }
  // }, [params, groups]);

  // useEffect(() => {
  //   const success = () => {
  //     setActiveLoading(false);
  //     setOpen(false);
  //     setName("");
  //     setDescription("");
  //     setPriority(0);
  //     setCurProjectGroupId(projectGroupId);
  //   };
  //   const fail = () => {
  //     setActiveLoading(false);
  //   };
  //   CustomEventListener(LIST_PROJECT.SUCCESS, success);
  //   CustomEventListener(LIST_PROJECT.FAIL, fail);
  //   return () => {
  //     CustomEventDispose(LIST_PROJECT.SUCCESS, success);
  //     CustomEventDispose(LIST_PROJECT.FAIL, fail);
  //   };
  // }, [projectGroupId, timeRange]);

  // useEffect(() => {
  //   if (!isNil(work_types) && work_types.length > 0) {
  //     const _first = parseInt(first(work_types));
  //     setWorkingType(_first);
  //   }
  // }, [work_types]);

  // useEffect(() => {
  //   if (!isNil(projectGroupId)) {
  //     setCurProjectGroupId(projectGroupId);
  //     setSelectableGroup([find(groups.groups, { id: projectGroupId })]);
  //   } else {
  //     setSelectableGroup(
  //       groups.groups.filter((e) =>
  //         e.work_types.find((c) => c === String(workingType))
  //       )
  //     );
  //   }
  // }, [projectGroupId, groups]);

  return (
    <>
      <Box className="create-project-step">
        <div className="create-project-step-form">
          <Typography variant="h4" marginBottom={12}>
            Tạo một bảng việc mới
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
          <CustomTextbox
            value={description}
            onChange={(value) => setDescription(value)}
            label={`${t("LABEL_BOARD_DETAIL")}`}
            fullWidth
            multiline={true}
            className={"per-line-step-in-form"}
          />
          <div className="select-customer-from-input">
            <CustomTextboxSelect
              value={curProjectGroupName}
              onClick={() => {
                setOpenSelectGroupProjectModal(true);
              }}
              label={`${t("DMH.VIEW.PGP.MODAL.CUP.GROUPS")}`}
              fullWidth
              required={true}
              className={
                "view_ProjectGroup_CreateNew_Project_Modal_formItem per-line-step-in-form"
              }
              isReadOnly={true}
            />
            <ArrowDropDownIcon className="icon-arrow" />
          </div>
        </div>
      </Box>
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
export default CreateProjectStep;
