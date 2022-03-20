import DateFnsUtils from "@date-io/date-fns";
import { Menu, Typography } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import TimePicker from "components/TimePicker";
import { listTimeSelect } from "components/TimeSelect";
import TitleSectionModal from "components/TitleSectionModal";
import { convertDate, DEFAULT_DATE_TEXT } from "helpers/jobDetail/stringHelper";
import { get } from "lodash";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommonProgressForm from "views/JobDetailPage/ListPart/ListHeader/CreateJobModal/CommonProgressForm";

const ColumnDateSelect = ({ value }) => {
  const refDiv = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useLayoutEffect(() => {
    if (refDiv.current) refDiv.current.closest(".td").style.cursor = "pointer";
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
    <div ref={refDiv} onClick={handleClick}>
      {value}
      <ProgressPanel anchorEl={anchorEl} onClose={_handleClose} />
    </div>
  );
};

const ProgressPanel = ({ anchorEl, taskData, onClose = () => {} }) => {
  const { t } = useTranslation();
  const date_status = useSelector((state) =>
    get(state, "project.setting.detailStatus.data.status.date")
  );
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

  const handleStartDay = (startDay) => {
    setStartDay(startDay);
  };

  const handleEndDay = (endDay) => {
    setEndDay(endDay);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      onClick={onClose}
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
                  // invalidLabel="invalidLabel"
                  // maxDateMessage="maxDateMessage"
                  // minDateMessage="minDateMessage"
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
