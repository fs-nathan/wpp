import DateFnsUtils from '@date-io/date-fns';
import { Button, IconButton, List, ListItem, ListItemText, ListSubheader, Popover, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import YearSelect from 'components/YearSelect';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import './style.scss';

const StyledListSubheader = ({ className = '', ...props }) =>
  <ListSubheader
    className={`comp_CustomPopper_Time___list-subheader ${className}`}
    {...props}
  />;

const TimeBox = ({ className = '', ...props }) =>
  <div
    className={`comp_CustomPopper_Time___time-box ${className}`}
    {...props}
  />;

const SideBar = ({ className = '', ...props }) =>
  <div
    className={`comp_CustomPopper_Time___side-bar ${className}`}
    {...props}
  />;

const MainBar = ({ className = '', ...props }) =>
  <div
    className={`comp_CustomPopper_Time___main-bar ${className}`}
    {...props}
  />;

const SubHeader = ({ className = '', ...props }) =>
  <div
    className={`comp_CustomPopper_Time___subheader ${className}`}
    {...props}
  />;

const Content = ({ className = '', ...props }) =>
  <div
    className={`comp_CustomPopper_Time___content ${className}`}
    {...props}
  />;

const YearBox = ({ className = '', ...props }) =>
  <div
    className={`comp_CustomPopper_Time___year-box ${className}`}
    {...props}
  />;

const DateWrapper = ({ className = '', ...props }) =>
  <div
    className={`comp_CustomPopper_Time___date-wrapper ${className}`}
    {...props}
  />;

const StyledButton = ({ className = '', ...props }) =>
  <Button
    className={`comp_CustomPopper_Time___button ${className}`}
    {...props}
  />;

const TimeListItem = ({ className = '', selected, ...props }) =>
  <ListItem
    className={`${className}`}
    {...props}
  />;

export const useTimes = () => {

  const { t } = useTranslation();

  const monthsArr = [
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.JAN'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.FEB'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.MAR'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.APR'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.MAY'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.JUN'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.JUL'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.AUG'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.SEP'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.OCT'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.NOV'),
    t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH.DEC'),
  ];

  const times = React.useMemo(() => [
    {
      title: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.THIS_YEAR'),
      description: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.YEAR_DESC', { year: moment().year() }),
      option: () => [
        moment().startOf('year').toDate(),
        moment().endOf('year').toDate(),
      ],
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.THIS_MONTH'),
      description: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH_DESC', { month: monthsArr[moment().month()] }),
      option: () => [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate(),
      ]
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.LAST_MONTH'),
      description: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.MONTH_DESC', { month: monthsArr[moment().subtract(1, 'M').month()] }),
      option: () => [
        moment().subtract(1, 'M').startOf('month').toDate(),
        moment().subtract(1, 'M').endOf('month').toDate(),
      ]
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.THIS_WEEK'),
      description: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.WEEK_DESC', { week: moment().isoWeek() }),
      option: () => [
        moment().startOf('isoWeek').toDate(),
        moment().endOf('isoWeek').toDate(),
      ]
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.LAST_WEEK'),
      description: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.WEEK_DESC', { week: moment().subtract(1, 'w').isoWeek() }),
      option: () => [
        moment().subtract(1, 'w').startOf('isoWeek').toDate(),
        moment().subtract(1, 'w').endOf('isoWeek').toDate(),
      ]
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.ALL_TIME'),
      description: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.ALL_DESC'),
      option: () => [
        undefined,
        undefined,
      ]
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.CUSTOM'),
      description: t('DMH.COMP.CUSTOM_POPOVER.TIME_FUNC.CUSTOM'),
      option: () => [
        moment().toDate(),
        moment().toDate(),
      ]
    }], [monthsArr, t]);
  return times;
};

export const useFilters = () => {

  const { t } = useTranslation();
  const filters = React.useMemo(() => [
    {
      title: t('DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.ALL'),
      field: 'all',
      option: {},
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.ACTIVE'),
      field: 'active',
      option: { visibility: true },
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.HIDDEN'),
      field: 'hidden',
      option: { visibility: false },
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.WAITING'),
      field: 'waiting',
      option: { visibility: true, state_code: 0 },
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.DOING'),
      field: 'doing',
      option: { visibility: true, state_code: 1 },
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.COMPLETE'),
      field: 'complete',
      option: { visibility: true, state_code: 2 },
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.EXPIRED'),
      field: 'expired',
      option: { visibility: true, state_code: 3 },
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.CREATED'),
      field: 'created',
      option: { me_created: true },
    }, {
      title: t('DMH.COMP.CUSTOM_POPOVER.FILTER_FUNC.ASSIGNED'),
      field: 'assigned',
      option: { me_created: false },
    }], [t]);
  return filters;
};

export const TimeRangePopover = ({
  bgColor,
  anchorEl = null, setAnchorEl = () => null,
  timeOptionDefault = 0,
  handleTimeRange = () => null,
  timeRangeDefault = {
    startDate: null,
    endDate: null
  }
}) => {
  const { t } = useTranslation();
  const [timeOption, setTimeOption] = React.useState(0);
  const [startDate, setStartDate] = React.useState(moment().toDate());
  const [endDate, setEndDate] = React.useState(moment().toDate());
  const times = useTimes();

  React.useEffect(() => {
    setTimeOption(timeOptionDefault);
    const [start, end] = timeRangeDefault.startDate && timeRangeDefault.endDate ? [timeRangeDefault.startDate, timeRangeDefault.endDate] : times[timeOptionDefault].option();
    setStartDate(start);
    setEndDate(end);
    //eslint-disable-next-line
  }, [timeOptionDefault]);

  return (
    <Popover
      id="time-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={evt => setAnchorEl(null)}
      transformOrigin={{
        vertical: -30,
        horizontal: 'right'
      }}
    >
      <TimeBox>
        <SideBar>
          <List
            subheader={
              <StyledListSubheader component="div">
                {t("TIME_RANGE_POPOVER_OPTIONS")}
              </StyledListSubheader>
            }
          >
            {times.map((time, index) => (
              <TimeListItem
                key={index}
                button
                onClick={evt => {
                  setTimeOption(index);
                  const [start, end] = times[index].option();
                  setStartDate(start);
                  setEndDate(end);
                }}
                style={timeOption === index ? {
                  borderLeft: `3px solid ${bgColor.color}`,
                } : {
                    borderLeft: '3px solid #fff',
                  }}
              >
                <ListItemText primary={time.title} />
              </TimeListItem>
            ))}
          </List>
        </SideBar>
        <MainBar>
          <SubHeader>
            <span>{t("TIME_RANGE_POPOVER_TIME_CHOOSEN")}</span>
            <IconButton onClick={evt => setAnchorEl(null)} style={{marginRight: "10px"}}>
              <Icon
                path={mdiClose}
                size={1}
              />
            </IconButton>
          </SubHeader>
          <Content>
            <YearBox>{times[timeOption].description}</YearBox>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateWrapper>
                {timeOption === 5 ? (
                  <>
                    <TextField
                      disabled
                      value={t("TIME_RANGE_POPOVER_TIME_ALL")}
                    />
                    <TextField
                      disabled
                      value={t("TIME_RANGE_POPOVER_TIME_ALL")}
                    />
                  </>
                ) : (
                    <>
                      <KeyboardDatePicker
                        disableToolbar
                        disabled={timeOption !== 6}
                        inputVariant="outlined"
                        variant="inline"
                        ampm={false}
                        label={t("TIME_RANGE_POPOVER_START_DATE")}
                        value={startDate}
                        onChange={setStartDate}
                        format="dd/MM/yyyy"
                        maxDate={endDate}
                        maxDateMessage={t("TIME_RANGE_POPOVER_MESSAGE_MAX_DATE")}
                      />
                      <KeyboardDatePicker
                        disableToolbar
                        disabled={timeOption !== 6}
                        inputVariant="outlined"
                        variant="inline"
                        ampm={false}
                        label={t("TIME_RANGE_POPOVER_END_DATE")}
                        value={endDate}
                        onChange={setEndDate}
                        format="dd/MM/yyyy"
                        minDate={startDate}
                        minDateMessage={t("TIME_RANGE_POPOVER_MESSAGE_MIN_DATE")}
                      />
                    </>
                  )}
              </DateWrapper>
            </MuiPickersUtilsProvider>
            <StyledButton
              style={{
                backgroundColor: bgColor.color,
              }}
              fullWidth
              onClick={evt => {
                handleTimeRange(
                  timeOption,
                  startDate ? moment(startDate).toDate() : undefined,
                  endDate ? moment(endDate).toDate() : undefined,
                );
                setAnchorEl(null);
              }}
            >
              {t("TIME_RANGE_POPOVER_APPLY")}
            </StyledButton>
          </Content>
        </MainBar>
      </TimeBox>
    </Popover>
  );
}

export const DownloadPopover = ({
  anchorEl = null, setAnchorEl = () => null,
  data = [], fileName = 'data',
}) => {

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  return (
    <Popover
      id="download-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={evt => setAnchorEl(null)}
      transformOrigin={{
        vertical: -30,
        horizontal: 'right'
      }}
    >
      <List
        subheader={
          <StyledListSubheader component="div">
            Tải xuống File
          </StyledListSubheader>
        }
      >
        <ListItem button onClick={evt => {
          exportToCSV(data, fileName);
          setAnchorEl(null);
        }}>
          <ListItemText primary={'Xuất ra file Excel'} />
        </ListItem>
      </List>
    </Popover>
  );
}

export const YearPopover = ({
  anchorEl = null, setAnchorEl = () => null,
  value, onChange
}) => {
  const { t } = useTranslation();
  return (
    <Popover
      id="year-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={evt => setAnchorEl(null)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Typography component="div" className="year_popover_container">
        <div className="year_popover_container_header">
          <div>{t('IDS_WP_SELECT_YEAR')}</div>
          <IconButton
            onClick={evt => setAnchorEl(null)}
          >
            <Icon
              path={mdiClose}
              size={1}
            />
          </IconButton>
        </div>
        <YearSelect
          numberOfYears={2}
          value={value}
          onChange={evt => {
            onChange(evt)
            setAnchorEl(null)
          }}
        />
      </Typography>
    </Popover>
  )
}