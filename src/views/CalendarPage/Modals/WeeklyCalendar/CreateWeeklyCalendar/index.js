import DateFnsUtils from '@date-io/date-fns';
import { Typography } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../../components/CustomModal';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_Calendar_CreateWeekly_Modal_container ${className}`}
    {...props}
  />;
const RightHeader = ({ className = '', ...props }) =>
  <p
    className={`view_Calendar_CreateWeekly_Modal_right-header ${className}`}
    {...props}
  />

const LeftHeader = ({ className = '', ...props }) =>
  <p
    className={`view_Calendar_CreateWeekly_Modal_left-header ${className}`}
    {...props}
  />

const TimeBox = ({ className = '', ...props }) =>
  <div
    className={`view_Calendar_CreateWeekly_Modal__time-box ${className}`}
    {...props}
  />;
const DateWrapper = ({ className = '', ...props }) =>
  <div
    className={`view_Calendar_CreateWeekly_Modal__date-wrapper ${className}`}
    {...props}
  />
function CreateWeeklyCalendar({ open, setOpen, }) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = React.useState(moment().set({ hours: 8, minutes: 0, seconds: 0 }).toDate());
  return (
    <>
      <CustomModal
        title={t("views.calendar_page.modal.create_weekly_calendar.title")}
        open={open}
        setOpen={setOpen}
        height='medium'
        columns={2}
        left={{
          title: () => <LeftHeader>{t("views.calendar_page.modal.create_weekly_calendar.title_left")}</LeftHeader>,
          content: () => {
            return <Container>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateWrapper>
                  <Typography variant="h6">CHỌN GIỜ</Typography>
                  <KeyboardTimePicker
                    disableToolbar
                    inputVariant="outlined"
                    variant="inline"
                    ampm={false}
                    value={startDate}
                    onChange={setStartDate}
                    format="HH:mm"
                    className="time_picker"
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    inputVariant="outlined"
                    variant="inline"
                    ampm={false}
                    value={startDate}
                    onChange={setStartDate}
                    format="dd/MM/yyyy"
                    className="date_picker"
                  />
                </DateWrapper>
              </MuiPickersUtilsProvider>
            </Container>
          }
        }}
        right={{
          title: () => <RightHeader>{t("views.calendar_page.modal.create_weekly_calendar.title_right")}</RightHeader>,
          content: () => {

          }
        }}
      />
    </>
  )
}

export default CreateWeeklyCalendar;