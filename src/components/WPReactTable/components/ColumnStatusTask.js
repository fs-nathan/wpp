import {
  Box,
  Divider,
  FormControlLabel,
  Popover,
  Radio,
  Typography,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  stopTask,
  updateTaskStatus,
} from "actions/taskDetail/taskDetailActions";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { statusLabel } from "views/JobDetailPage/TabPart/DefaultTab/TabBody/StatusLabel";
import { BoxColLabel, LabelColumnOption } from "./ColumnOptions";

const taskStatus = [
  { value: 0, label: statusLabel[0], des: "LABEL_PROCESS_PERCENT_WAITING" },
  { value: 1, label: statusLabel[1], des: "LABEL_PROCESS_PERCENT_DOING" },
  { value: 2, label: statusLabel[2], des: "LABEL_PROCESS_PERCENT_COMPLETED" },
  { value: 4, label: statusLabel[4], des: "LABEL_PROCESS_PERCENT_PAUSED" },
];

const colorStatus = [
  "#FF9800FF",
  "#03A9F4FF",
  "#03C30BFF",
  "",
  "#607d8b",
  "red",
];

const ColumnStatusTask = ({ taskId, statusCode, complete, fieldLabel }) => {
  const { t } = useTranslation();
  const [codeStatus, setCodeStatus] = React.useState(statusCode);
  const [selected, setSelected] = React.useState({
    color: colorStatus[statusCode],
    name: t(statusLabel[statusCode]),
  });
  const dispatch = useDispatch();

  const [tooltipChangeTaskStatus, setTooltipChangeTaskStatus] =
    React.useState(null);

  function handleUpdateTaskStatus(status) {
    setTooltipChangeTaskStatus(null);
    if (status === 4) {
      dispatch(stopTask(taskId));
    } else {
      setSelected({
        color: colorStatus[status],
        name: t(statusLabel[status]),
      });
      setCodeStatus(status);
      dispatch(updateTaskStatus({ task_id: taskId, status }));
    }
  }

  return (
    <>
      <BoxColLabel
        onClick={(evt) => setTooltipChangeTaskStatus(evt.currentTarget)}
        style={{ overflow: "hidden" }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          {fieldLabel && (
            <LabelColumnOption
              style={{
                background: fieldLabel.color,
                maxWidth: "100%",
              }}
              onClick={(evt) => setTooltipChangeTaskStatus(evt.currentTarget)}
            >
              {fieldLabel.name}
            </LabelColumnOption>
          )}
          <LabelColumnOption
            style={{
              background: selected.color,
              maxWidth: "100%",
              marginLeft: fieldLabel ? "5px" : 0,
            }}
            onClick={(evt) => setTooltipChangeTaskStatus(evt.currentTarget)}
          >
            {selected.name}
          </LabelColumnOption>
        </div>
        <KeyboardArrowDownIcon className="icon" xs={{ color: "#6d6e6f" }} />
      </BoxColLabel>
      <Popover
        anchorEl={tooltipChangeTaskStatus}
        open={Boolean(tooltipChangeTaskStatus)}
        onClose={() => setTooltipChangeTaskStatus(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: -10, horizontal: "left" }}
        className={"toolTipUpdateStatus"}
      >
        <Box className={"toolTipUpdateStatus-header"}>
          <Typography variant={"h6"}>
            {t("LABEL_UPDATE_TASK_STATUS")}
          </Typography>
        </Box>
        <Divider />
        <Box className={"toolTipUpdateStatus-body"}>
          {taskStatus.map(function (item, index) {
            return (
              <>
                {index === 3 && <Divider style={{ marginTop: 10 }} />}
                <Box
                  className={"toolTipUpdateStatus-item"}
                  onClick={(e) => {
                    if (complete !== 100 && codeStatus !== item.value)
                      handleUpdateTaskStatus(item.value);
                  }}
                >
                  <div className={"toolTipUpdateStatus-itemHeader"}>
                    <FormControlLabel
                      value={item.value}
                      disabled={complete === 100 || codeStatus === item.value}
                      control={<Radio />}
                      label={t(item.label)}
                      checked={codeStatus === item.value}
                      onChange={() => null}
                      onClick={() => null}
                    />
                  </div>
                  <div
                    className={`toolTipUpdateStatus-itemBody ${
                      complete === 100 || codeStatus === item.value
                        ? "radioDisabled"
                        : ""
                    }`}
                  >
                    <Typography variant={"body1"} color={"textSecondary"}>
                      {t(item.des)}
                    </Typography>
                  </div>
                </Box>
              </>
            );
          })}
        </Box>
      </Popover>
    </>
  );
};

export default ColumnStatusTask;
