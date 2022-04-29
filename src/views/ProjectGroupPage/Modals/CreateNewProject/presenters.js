import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import * as images from "assets/index";
import CustomModal, { Title } from "components/CustomModal";
import CustomTextbox from "components/CustomTextbox";
import CustomTextboxSelect from "components/CustomTextboxSelect";
import { USE_TEMPLATE } from "constants/actions/project/useTemplate";
import {
  CREATE_PROJECT,
  CustomEventDispose,
  CustomEventListener,
  LIST_PROJECT,
} from "constants/events.js";
import { Routes } from "constants/routes";
import { useMaxlenString, useRequiredString } from "hooks";
import { find, first, isNil } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import SelectGroupProject from "../SelectGroupProject";
import { ListTagsCreateProject } from "./components";
import "./style.scss";

const StyledFormControl = ({ className = "", ...props }) => (
  <FormControl
    className={`view_ProjectGroup_CreateNew_Project_Modal___form-control ${className} per-line-step-in-form`}
    {...props}
  />
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function CreateNewProject({
  open,
  setOpen,
  groups,
  work_types,
  handleCreateProject,
  doReload,
  projectGroupId,
  timeRange,
}) {
  const { t } = useTranslation();
  const [name, setName, errorName] = useRequiredString("", 200);
  const [description, setDescription] = useMaxlenString("", 500);
  const [priority, setPriority] = React.useState(0);
  const [currency] = React.useState(0);
  const [curProjectGroupId, setCurProjectGroupId] =
    React.useState(projectGroupId);
  const [curProjectGroupName, setCurProjectGroupName] = React.useState("");
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [workingType, setWorkingType] = React.useState(0);
  const [selectableGroup, setSelectableGroup] = React.useState([]);
  const history = useHistory();
  const [openSelectGroupProjectModal, setOpenSelectGroupProjectModal] =
    React.useState(false);
  const params = useQuery();
  const refListTag = React.useRef(null);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(CREATE_PROJECT.FAIL, fail);
    // CustomEventListener(CREATE_PROJECT.SUCCESS, (e) => {
    //   history.push(`${Routes.PROJECT}/${e.detail.project_id}?guideline=true`);
    // });
    return () => {
      // CustomEventDispose(CREATE_PROJECT.SUCCESS, (e) => {
      //   history.push(`${Routes.PROJECT}/${e.detail.project_id}?guideline=true`);
      // });
      CustomEventDispose(CREATE_PROJECT.FAIL, fail);
    };
  }, [projectGroupId, timeRange, doReload]);

  React.useEffect(() => {
    const groupID = params.get("groupID")
      ? params.get("groupID")
      : curProjectGroupId
      ? curProjectGroupId
      : null;
    if (groupID) {
      const group = find(groups.groups, { id: groupID });
      setCurProjectGroupId(group ? group.id : null);
      setCurProjectGroupName(group ? group.name : "");
    }
  }, [params, groups]);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      setName("");
      setDescription("");
      setPriority(0);
      setCurProjectGroupId(projectGroupId);
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_PROJECT.SUCCESS, success);
    CustomEventListener(LIST_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT.SUCCESS, success);
      CustomEventDispose(LIST_PROJECT.FAIL, fail);
    };
  }, [projectGroupId, timeRange]);

  React.useEffect(() => {
    if (!isNil(work_types) && work_types.length > 0) {
      const _first = parseInt(first(work_types));
      setWorkingType(_first);
    }
  }, [work_types]);
  React.useEffect(() => {
    if (!isNil(projectGroupId)) {
      setCurProjectGroupId(projectGroupId);
      setSelectableGroup([find(groups.groups, { id: projectGroupId })]);
    } else {
      setSelectableGroup(
        groups.groups.filter((e) =>
          e.work_types.find((c) => c === String(workingType))
        )
      );
    }
  }, [projectGroupId, groups]);

  return (
    <>
      <CustomModal
        title={`${t("LABEL_WORKING_BOARD_CREATE_NEW")}`}
        open={open}
        setOpen={setOpen}
        canConfirm={!errorName || !isNil(curProjectGroupId)}
        onConfirm={() => {
          handleCreateProject({
            projectGroupId: curProjectGroupId,
            name,
            description,
            priority,
            currency,
            project_label_id: refListTag.current._getValue()[0]?.id,
          });
          setActiveLoading(true);
        }}
        onCancle={() => setOpen(false)}
        loading={groups.loading}
        activeLoading={activeLoading}
        manualClose={true}
      >
        <CustomTextbox
          value={name}
          onChange={(value) => setName(value)}
          label={`${t("LABEL_WORKING_BOARD_NAME")}`}
          fullWidth
          required={true}
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
        <StyledFormControl fullWidth>
          <Title>{t("LABEL_CATEGORY")}</Title>
          <ListTagsCreateProject ref={refListTag} />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <Title>{t("DMH.VIEW.PGP.MODAL.CUP.PRIO.TITLE")}</Title>

          <RadioGroup
            aria-label="priority"
            name="priority"
            value={priority}
            onChange={(evt) => setPriority(parseInt(evt.target.value))}
            row={true}
          >
            <FormControlLabel
              value={0}
              control={<Radio color="primary" />}
              label={t("DMH.VIEW.PGP.MODAL.CUP.PRIO.LOW")}
              labelPlacement="end"
            />
            <FormControlLabel
              value={1}
              control={<Radio color="primary" />}
              label={t("DMH.VIEW.PGP.MODAL.CUP.PRIO.MED")}
              labelPlacement="end"
            />
            <FormControlLabel
              value={2}
              control={<Radio color="primary" />}
              label={t("DMH.VIEW.PGP.MODAL.CUP.PRIO.HIGH")}
              labelPlacement="end"
            />
          </RadioGroup>
        </StyledFormControl>
      </CustomModal>
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
}

export default CreateNewProject;
