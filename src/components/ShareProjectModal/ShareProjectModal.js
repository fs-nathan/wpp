import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { Paper, Stack, Typography } from "@mui/material";
import {
  changeFlagFetchProjectSchedules,
  changeProjectSchedule,
} from "actions/gantt";
import "antd/lib/menu/style/index.css";
import CustomModal from "components/CustomModalGantt";
import { apiService } from "constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { get } from "lodash";
import { default as React, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./index.css";

const ShareProjectModal = ({
  projectSchedules,
  changeFlagFetchProjectSchedules,
  fetchProjectSchedule,
  setopenModal,
  changeProjectSchedule,
  openModal,
  mainCalendar,
}) => {
  const [listSchedule, setListSchedule] = useState([]);
  const [shareOption, setShareOption] = useState("internal");
  const [listProjectSchedule, setListProjectSchedule] = useState([]);
  const { t } = useTranslation();
  const params = useParams();

  const fetchListSchedule = async () => {
    try {
      const listSchedule = await apiService({
        url: "group-schedule/list-schedule",
      });
      setListSchedule(listSchedule.data.schedules);
    } catch (e) {
      console.log(e);
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(e, "message", DEFAULT_MESSAGE.QUERY.ERROR)
      );
    }
  };
  useEffect(() => {
    if (fetchProjectSchedule) fetchProjectSchedules();
  }, [params.projectId, fetchProjectSchedule]);
  useEffect(() => {
    fetchListSchedule();
  }, [params.projectId]);
  const fetchProjectSchedules = async () => {
    try {
      const { projectId } = params;
      const result = await apiService({
        url: `project/get-schedules?project_id=${projectId}`,
      });
      changeProjectSchedule(result.data.schedules);
      changeFlagFetchProjectSchedules(false);
    } catch (e) {
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(e, "message", DEFAULT_MESSAGE.QUERY.ERROR)
      );
    }
  };
  const assignProjectSchedule = async (projectId, scheduleId, check) => {
    try {
      if (!check && scheduleId === mainCalendar) {
        SnackbarEmitter(SNACKBAR_VARIANT.ERROR, t("GANTT_CANNOT"));
        return;
      }
      const url = check
        ? "project/assign-schedules"
        : "project/delete-schedules";
      const result = await apiService({
        url,
        method: "post",
        data: {
          schedule_id: scheduleId,
          project_id: projectId,
        },
      });
      changeFlagFetchProjectSchedules(true);
      SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setListProjectSchedule(projectSchedules.map((item) => item._id));
  }, [projectSchedules]);
  const renderListCalendarModal = useMemo(
    () =>
      listSchedule.map((item, index) => (
        <tr key={index}>
          <td>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={
                      listProjectSchedule.includes(item.id) ? true : false
                    }
                    disabled={!item.can_delete}
                  />
                }
                onClick={(e) => {
                  const { projectId } = params;
                  if (!e.target.checked && item.id === mainCalendar) {
                    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, t("GANTT_CANNOT"));
                    e.preventDefault();
                    return;
                  }
                  assignProjectSchedule(projectId, item.id, e.target.checked);
                }}
                label={item.name}
              />
            </div>
          </td>
          <td>
            <div>{item.description}</div>
          </td>
        </tr>
      )),
    [listSchedule, listProjectSchedule]
  );
  return (
    <React.Fragment>
      <CustomModal
        maxWidth="sm"
        height="short"
        setOpen={setopenModal}
        open={openModal}
        confirmRender={null}
        canConfirm={false}
        title={t("SHARE_PROJECT_TITLE")}
      >
        <div className="share-project--modal__container">
          <div className="share-project--modal__body">
            <Stack spacing={4}>
              <Paper
                variant="outlined"
                className={`share-project-card ${
                  shareOption === "internal" && "share-project-card--active"
                }`}
                onClick={() => setShareOption("internal")}
              >
                <div
                  className={`share-project-card-icon ${
                    shareOption === "internal" &&
                    "share-project-card-icon--active"
                  }`}
                >
                  <Check />
                </div>
                <div className="share-project-card-content">
                  <h2>{t("SHARE_PROJECT_TITLE_INTERNAL")}</h2>
                  <p>{t("SHARE_PROJECT_TITLE_INTERNAL_CONTENT")}</p>
                </div>
              </Paper>
              <Paper
                variant="outlined"
                className={`share-project-card ${
                  shareOption === "public" && "share-project-card--active"
                }`}
                onClick={() => setShareOption("public")}
              >
                <div
                  className={`share-project-card-icon  ${
                    shareOption === "public" &&
                    "share-project-card-icon--active"
                  }`}
                >
                  <Check />
                </div>

                <div className="share-project-card-content">
                  <h2>{t("SHARE_PROJECT_TITLE_PUBLIC")}</h2>
                  <p>{t("SHARE_PROJECT_TITLE_PUBLIC_CONTENT")}</p>
                </div>
              </Paper>
            </Stack>
          </div>
        </div>
      </CustomModal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  scheduleDetailGantt: state.gantt.scheduleDetailGantt,
  projectSchedules: state.gantt.projectSchedules,
  fetchProjectSchedule: state.gantt.fetchProjectSchedule,
  mainCalendar: state.gantt.mainCalendar,
});
const mapDispatchToProps = {
  changeFlagFetchProjectSchedules,
  changeProjectSchedule,
};
export default connect(mapStateToProps, mapDispatchToProps)(ShareProjectModal);
