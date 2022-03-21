import DateFnsUtils from "@date-io/date-fns";
import { Menu, Typography } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { updateTimeDuration } from "actions/taskDetail/taskDetailActions";
import {
  ActionsAcceptButton,
  ActionsCancleButton,
  StyledDialogActions,
} from "components/CustomModal";
import TimePicker from "components/TimePicker";
import { listTimeSelect } from "components/TimeSelect";
import TitleSectionModal from "components/TitleSectionModal";
import {
  compareDateTime,
  convertDate,
  convertDateByFormat,
  DEFAULT_DATE_TEXT,
} from "helpers/jobDetail/stringHelper";
import { get } from "lodash";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CommonProgressForm from "views/JobDetailPage/ListPart/ListHeader/CreateJobModal/CommonProgressForm";

const ColumnDateSelect = ({ value, taskId, dataCell = {} }) => {
  const refDiv = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useLayoutEffect(() => {
    if (refDiv.current) {
      refDiv.current.closest(".td").style.cursor = "pointer";
      refDiv.current.closest(".td").addEventListener("click", handleClick);
    }
  }, []);

  React.useEffect(() => {
    if (!anchorEl) return;
    const cellHTML = anchorEl.closest(".td");
    if (Boolean(anchorEl)) {
      cellHTML && cellHTML.classList.add("focus");
    }
    return () => {
      cellHTML && cellHTML.classList.remove("focus");
    };
  }, [anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget.closest(".td"));
  };

  const _handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div ref={refDiv}>
      {value}
      <ProgressPanel
        anchorEl={anchorEl}
        taskData={{
          start_time: dataCell.start_time,
          start_date: dataCell.start_date,
          end_time: dataCell.end_time,
          end_date: dataCell.end_date,
          type_time: dataCell.type_time,
        }}
        taskId={taskId}
        onClose={_handleClose}
      />
    </div>
  );
};

const SELECT_STRING = "project.setting.detailStatus.data.status.date";

const ProgressPanel = ({
  anchorEl,
  taskData,
  taskId,
  fromView,
  onClose = () => {},
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const date_status = useSelector((state) => get(state, SELECT_STRING));
  const dateFormat = useSelector((state) => state.system.profile.format_date);
  const colors = useSelector((state) => state.setting.colors);
  const bgColor = colors.find((item) => item.selected === true);

  const optionsList = React.useMemo(
    () => [
      { value: 2, label: t("LABEL_CHAT_TASK_NGAY_VA_GIO") },
      { value: 1, label: t("LABEL_CHAT_TASK_CHI_NHAP_NGAY") },
      { value: 0, label: t("LABEL_CHAT_TASK_KHONG_YEU_CAU") },
    ],
    [t]
  );

  const [type, setType] = React.useState(
    taskData ? taskData.type_time : date_status
  );
  const [startTime, setStartTime] = React.useState(listTimeSelect[16]);
  const [endTime, setEndTime] = React.useState(listTimeSelect[34]);
  const [startDay, setStartDay] = React.useState(DEFAULT_DATE_TEXT);
  const [endDay, setEndDay] = React.useState(DEFAULT_DATE_TEXT);

  React.useEffect(() => {
    const { start_time, start_date, end_time, end_date, type_time } = taskData;
    const defaultStart = convertDate(new Date());

    setStartDay(
      start_date ? convertDateByFormat(start_date, dateFormat) : defaultStart
    );
    if (start_time) setStartTime(start_time);
    setEndDay(
      end_date ? convertDateByFormat(end_date, dateFormat) : defaultStart
    );

    if (end_time) setEndTime(end_time);
    if (type_time === 0) setType(2);
    else if (type_time === 1) setType(1);
    else if (type_time === 2) setType(0);
  }, [dateFormat, anchorEl, taskData]);

  const handleStartDay = (startDay) => {
    setStartDay(startDay);
  };

  const handleEndDay = (endDay) => {
    setEndDay(endDay);
  };

  const handlePressConfirm = () => {
    const data = {
      task_id: taskId,
      start_date: startDay,
      end_date: endDay,
      start_time: startTime,
      end_time: endTime,
      from_view: fromView,
    };
    if (type === 0) {
      data.start_date = undefined;
      data.start_time = undefined;
      data.end_date = undefined;
      data.end_time = undefined;
    } else if (type === 1) {
      data.start_time = undefined;
      data.end_time = undefined;
    }

    onClose();
    dispatch(updateTimeDuration(data));
  };

  function validate() {
    try {
      const result = compareDateTime(
        `${startDay} ${startTime || "00:00"}`,
        `${endDay} ${endTime || "00:00"}`
      );
      // console.log('validate', result)
      return result < 0; // && type > 0;
    } catch (error) {
      // console.log('error', error)
      return false;
    }
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "start" }}
      transformOrigin={{ vertical: "top", horizontal: "start" }}
    >
      <WrapperProgressForm>
        <TitleSectionModal
          label={t("LABEL_CHAT_TASK_TIEN_DO_CONG_VIEC")}
          style={{ marginTop: 10 }}
          isRequired
        />
        <CommonProgressForm
          items={optionsList}
          value={type}
          handleChange={setType}
          defaultState={date_status}
        />
        {type !== 0 && (
          <>
            <StartEndDay component={"span"}>
              <BeginEndTime component={"span"}>
                {t("LABEL_CHAT_TASK_BAT_DAU")}
              </BeginEndTime>
              {type !== 1 && (
                <TimePicker
                  className="progressModal--timeSelect"
                  value={startTime}
                  onChange={setStartTime}
                />
              )}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <InputDate
                  autoOk
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  value={startDay}
                  size="small"
                  onChange={(e) => handleStartDay(convertDate(e))}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  invalidDateMessage={t("LABEL_CHAT_TASK_INVALID_DATE_FORMAT")}
                />
              </MuiPickersUtilsProvider>
            </StartEndDay>
            <StartEndDay component={"span"}>
              <BeginEndTime component={"span"}>
                {t("LABEL_CHAT_TASK_KET_THUC")}
              </BeginEndTime>
              {type !== 1 && (
                <TimePicker
                  className="progressModal--timeSelect"
                  value={endTime}
                  onChange={setEndTime}
                />
              )}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <InputDate
                  autoOk
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  value={endDay}
                  size="small"
                  minDate={startDay}
                  onChange={(e) => handleEndDay(convertDate(e))}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  invalidDateMessage={t("LABEL_CHAT_TASK_INVALID_DATE_FORMAT")}
                />
              </MuiPickersUtilsProvider>
            </StartEndDay>
          </>
        )}
      </WrapperProgressForm>
      <StyledDialogActions
        style={{ paddingBottom: 5, borderTop: "1px solid rgba(0,0,0,.1)" }}
      >
        <ActionsCancleButton onClick={onClose}>
          {t("DMH.COMP.CUSTOM_MODAL.CANCLE")}
        </ActionsCancleButton>
        <ActionsAcceptButton
          style={{
            color: bgColor.color,
            opacity: !validate() ? 0.5 : 1,
          }}
          disabled={!validate()}
          onClick={handlePressConfirm}
          type={type}
        >
          {t("DMH.COMP.CUSTOM_MODAL.UPDATE")}
        </ActionsAcceptButton>
      </StyledDialogActions>
    </Menu>
  );
};

const WrapperProgressForm = styled.div`
  padding: 10px 15px;
`;

const StartEndDay = styled(Typography)`
  display: flex;
  flex-direction: row;
  align-items: end;
  margin: 30px 0;
`;

const BeginEndTime = styled(Typography)`
  width: 60px;
  margin-right: 20px;
  margin-top: 10px;
`;

const InputDate = styled(KeyboardDatePicker)`
  & > div:nth-child(2) {
    width: 186px;
    padding-right: 5px;
    & > input {
      padding: 14px;
    }
    & > div > button {
      padding: 5px;
    }
  }
`;

export default ColumnDateSelect;
