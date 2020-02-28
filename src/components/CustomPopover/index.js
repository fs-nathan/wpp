import React from 'react';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  TextField,
  ListItem,
  Button,
  Popover,
  List,
  ListItemText,
  IconButton,
  ListSubheader,
} from '@material-ui/core';
import {
  mdiClose,
} from '@mdi/js';
import Icon from '@mdi/react';
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

export const times = [
  {
    title: 'Năm nay',
    description: `Năm ${moment().year()}`,
    option: () => [
      moment().startOf('year').toDate(), 
      moment().endOf('year').toDate(),
    ],
  }, {
    title: 'Tháng này',
    description: `Tháng ${moment().month() + 1}`,
    option: () => [
      moment().startOf('month').toDate(), 
      moment().endOf('month').toDate(),
    ]
  }, {
    title: 'Tháng trước',
    description: `Tháng ${moment().subtract(1, 'M').month() + 1}`,
    option: () => [
      moment().subtract(1, 'M').startOf('month').toDate(),
      moment().subtract(1, 'M').endOf('month').toDate(),
    ]
  }, {
    title: 'Tuần này',
    description: `Tuần ${moment().isoWeek()}`,
    option: () => [
      moment().startOf('isoWeek').toDate(),
      moment().endOf('isoWeek').toDate(),
    ]
  }, {
    title: 'Tuần trước',
    description: `Tuần ${moment().subtract(1, 'w').isoWeek()}`,
    option: () => [
      moment().subtract(1, 'w').startOf('isoWeek').toDate(),
      moment().subtract(1, 'w').endOf('isoWeek').toDate(),
    ]
  }, {
    title: 'Mọi lúc',
    description: `Toàn bộ thời gian`, 
    option: () => [
      undefined, 
      undefined,
    ]
  }, {
    title: 'Tùy chọn',
    description: 'Tùy chọn',
    option: () => [
      moment().toDate(),
      moment().toDate(),
    ]
  }
];

export const TimeRangePopover = ({
  bgColor,
  anchorEl = null, setAnchorEl = () => null,
  timeOptionDefault = 0, 
  handleTimeRange = () => null,
}) => {

  const [timeOption, setTimeOption] = React.useState(0);
  const [startDate, setStartDate] = React.useState(moment().toDate());
  const [endDate, setEndDate] = React.useState(moment().toDate());

  React.useEffect(() => {
    setTimeOption(timeOptionDefault);
    const [start, end] = times[timeOptionDefault].option();
    setStartDate(start);
    setEndDate(end);
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
                Tùy chọn
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
            <span>Thời gian được chọn</span>
            <IconButton>
              <Icon 
                path={mdiClose} 
                size={1} 
                onClick={evt => setAnchorEl(null)}
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
                      value={'Toàn bộ'}
                    />
                    <TextField
                      disabled
                      value={'Toàn bộ'}
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
                      label="Ngày bắt đầu"
                      value={startDate}
                      onChange={setStartDate}
                      format="dd/MM/yyyy"
                      maxDate={endDate}
                      maxDateMessage='Phải trước ngày kết thúc'
                    />
                    <KeyboardDatePicker 
                      disableToolbar
                      disabled={timeOption !== 6}
                      inputVariant="outlined"
                      variant="inline"
                      ampm={false}
                      label="Ngày kết thúc"
                      value={endDate}
                      onChange={setEndDate}
                      format="dd/MM/yyyy"
                      minDate={startDate}
                      minDateMessage='Phải sau ngày bắt đầu'
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
            >Áp dụng</StyledButton>
          </Content>
        </MainBar>
      </TimeBox>
    </Popover>
  );
}