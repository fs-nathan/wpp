import React from 'react';
import moment from 'moment';
import { get, remove, slice } from 'lodash';
import { useHistory } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  IconButton,
  Menu,
  MenuItem,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Button,
  TextField,
} from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDownload,
  mdiFilterOutline,
  mdiCalendar,
  mdiAccount,
  mdiDotsVertical,
  mdiCheckCircle,
  mdiClose,
} from '@mdi/js';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomBadge from '../../../../components/CustomBadge';
import CustomAvatar from '../../../../components/CustomAvatar';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import ImprovedSmallProgressBar from '../../../../components/ImprovedSmallProgressBar';
import { ChartInfoBox } from '../../../../components/CustomDonutChart';
import { LightTooltip, TooltipWrapper } from '../../../../components/LightTooltip';
import { Container, SettingContainer, LinkSpan, StateBox, DateBox } from '../../../../components/TableComponents';
import { filters, times } from './constants';
import './style.scss';

const CustomMenuItem = ({ className = '', selected, refs, ...props }) => 
  <MenuItem 
    className={`${selected 
      ? 'view_ProjectGroup_Table_All___menu-item-selected'
      : 'view_ProjectGroup_Table_All___menu-item'
    } ${className}`}
    {...props}
  />;

const StyledListSubheader = ({ className = '', ...props }) => 
  <ListSubheader 
    className={`view_ProjectGroup_Table_All___list-subheader ${className}`}
    {...props}
  />;

const TimeBox = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_Table_All___time-box ${className}`}
    {...props}
  />;

const SideBar = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_Table_All___side-bar ${className}`}
    {...props}
  />;

const MainBar = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_Table_All___main-bar ${className}`}
    {...props}
  />;

const SubHeader = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_Table_All___subheader ${className}`}
    {...props}
  />;

const Content = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_Table_All___content ${className}`}
    {...props}
  />;

const YearBox = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_Table_All___year-box ${className}`}
    {...props}
  />;

const DateWrapper = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_Table_All___date-wrapper ${className}`}
    {...props}
  />;

const StyledButton = ({ className = '', ...props }) => 
  <Button 
    className={`view_ProjectGroup_Table_All___button ${className}`}
    {...props}
  />;

const TimeListItem = ({ className = '', selected, ...props }) => 
  <ListItem 
    className={`${className}`}
    {...props}
  />;

const TooltipBody = ({ className = '', ...props }) => 
  <Button 
    className={`view_ProjectGroup_Table_All___tooltip ${className}`}
    {...props}
  />;

function decodePriorityCode(priorityCode) {
  switch (priorityCode) {
    case 0:
      return {
        color: '#4caf50',
        background: '#4caf5042',
        name: 'Thấp'
      };
    case 1:
      return {
        color: '#ff9800',
        background: '#ff980038',
        name: 'Trung bình'
      };
    case 2:
      return {
        color: '#fe0707',
        background: '#ff050524',
        name: 'Cao'
      };
    default:
      return {
        color: '#53d7fc',
        name: 'Thấp'
      };
  }
}

const SettingButton = ({
  project,
  setMenuAnchor, setCurProject,
}) => {

  return (
    <SettingContainer onClick={evt => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={evt => {
          setMenuAnchor(evt.currentTarget);
          setCurProject(project);
        }}
        size="small"
      >
        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
      </IconButton>
    </SettingContainer>
  );
};

function AllProjectTable({
  expand, handleExpand,
  projects, bgColor,
  filterType, handleFilterType, 
  timeType, handleTimeType,
  handleSortType,
  handleShowOrHideProject,
  handleDeleteProject,
  handleSortProject,
  handleOpenModal,
  handleTimeRange,
}) {

  const history = useHistory();

  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const [downloadAnchor, setDownloadAnchor] = React.useState(null);
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [timeOption, setTimeOption] = React.useState(0);
  const [startDate, setStartDate] = React.useState(moment().toDate());
  const [endDate, setEndDate] = React.useState(moment().toDate());

  const [menuAnchor, setMenuAnchor] = React.useState(null); 
  const [curProject, setCurProject] = React.useState(null);

  React.useEffect(() => {
    setTimeOption(timeType);
    const [start, end] = times[timeType].option();
    setStartDate(start);
    setEndDate(end);
  }, [timeType]);

  return (
    <Container>
      {projects.error !== null && <ErrorBox />}
      {projects.error === null && (
        <React.Fragment>
          <CustomTable
            options={{
              title: `Danh sách dự án`,
              subTitle: '',
              subActions: [
                {
                  label: filters[filterType].title,
                  iconPath: mdiFilterOutline,
                  onClick: evt => setFilterAnchor(evt.currentTarget)
                },
                {
                  label: 'Tải xuống',
                  iconPath: mdiDownload,
                  onClick: evt => setDownloadAnchor(evt.currentTarget)
                },
                {
                  label: times[timeType].title,
                  iconPath: mdiCalendar,
                  onClick: evt => setTimeAnchor(evt.currentTarget)
                }
              ],
              mainAction: {
                label: '+ Tạo dự án',
                onClick: evt => handleOpenModal('CREATE'),
              },
              expand: {
                bool: expand,
                toggleExpand: () => handleExpand(!expand)
              },
              moreMenu: [
                {
                  label: 'Cài đặt bảng',
                  onClick: () => null
                },
                {
                  label: 'Thùng rác',
                  onClick: () => history.push(`/projects/deleted`)
                }
              ],
              grouped: {
                bool: false
              },
              draggable: {
                bool: true,
                onDragEnd: result => {
                  const { source, destination, draggableId } = result;
                  if (!destination) return;
                  if (
                    destination.droppableId === source.droppableId &&
                    destination.index === source.index
                  )
                    return;
                  let sortData = [...projects.projects];
                  let removed = remove(sortData, { id: draggableId });
                  sortData = [...slice(sortData, 0, destination.index), ...removed, ...slice(sortData, destination.index)];
                  handleSortProject(sortData);
                }
              },
              loading: {
                bool: projects.loading,
                component: () => <LoadingBox />
              },
              row: {
                id: 'id',
              }
            }}
            columns={[
              {
                label: () => null,
                field: row => (
                  <CustomAvatar
                    style={{
                      width: 35,
                      height: 35,
                    }}
                    src={get(row, 'icon')}
                    alt="project group icon"
                  />
                ),
                align: 'left',
                width: '5%',
              },
              {
                label: 'Dự án',
                field: (row) => <LinkSpan onClick={evt => history.push(`/project/${get(row, 'id', '')}`)}>{get(row, 'name', '')}</LinkSpan>,
                sort: evt => handleSortType('name'),
                align: 'left',
                width: '24%',
              },
              {
                label: 'Trạng thái',
                field: row => (
                  <StateBox
                    stateName={
                      get(row, 'visibility', true) === false
                        ? 'Hidden'
                        : get(row, 'state_name', '')
                    }
                  >
                    <div>
                      <span>&#11044;</span>
                      <span>
                        {get(row, 'visibility', true) === false
                          ? 'Hidden'
                          : get(row, 'state_name', '')}
                      </span>
                    </div>
                    {get(row, 'visibility', true) && (
                      <small>
                        {get(row, 'state_name', '') === 'expired'
                          ? get(row, 'day_expired', 0)
                          : get(row, 'day_implement', 0)}{' '}
                        ngày
                      </small>
                    )}
                  </StateBox>
                ),
                sort: evt => handleSortType('state_name'),
                align: 'left',
                width: '10%',
              },
              {
                label: 'Hoàn thành',
                field: row => (
                  <LightTooltip
                    placement='top'
                    title={
                      <ChartInfoBox
                        className='view_ProjectGroup_Table_All___tooltip'
                        data={
                          [{
                            color: '#ff9800',
                            title: 'Công việc đang chờ',
                            value: get(row, 'statistic.waiting', 0),
                          }, {
                            color: '#03a9f4',
                            title: 'Công việc đang làm',
                            value: get(row, 'statistic.doing', 0),
                          }, {
                            color: '#f44336',
                            title: 'Công việc quá hạn',
                            value: get(row, 'statistic.expired', 0),
                          }, {
                            color: '#03c30b',
                            title: 'Công việc hoàn thành',
                            value: get(row, 'statistic.complete', 0),
                          }, {
                            color: '#000',
                            title: 'Công việc dừng',
                            value: get(row, 'statistic.stop', 0),
                          }]
                        }
                      />
                    }
                  >
                    <TooltipWrapper>
                      <ImprovedSmallProgressBar
                        data={[{
                          color: '#ff9800',
                          value: get(row, 'statistic.waiting', 0),
                        }, {
                          color: '#03a9f4',
                          value: get(row, 'statistic.doing', 0),
                        }, {
                          color: '#f44336',
                          value: get(row, 'statistic.expired', 0),
                        }, {
                          color: '#03c30b',
                          value: get(row, 'statistic.complete', 0),
                        }, {
                          color: '#000',
                          value: get(row, 'statistic.stop', 0),
                        }]}
                        color={'#05b50c'}
                        percentDone={get(row, 'complete', 0)}
                      />
                    </TooltipWrapper>
                  </LightTooltip>
                ),
                sort: evt => handleSortType('complete'),
                align: 'left',
                width: '17%',
              },
              {
                label: 'Tiến độ',
                field: row => (
                  <DateBox>
                    {get(row, 'duration') ? (
                      <>
                        <span>{get(row, 'duration') + ' ngày'}</span>
                        <small>
                          {get(row, 'date_start')} - {get(row, 'date_end')}
                        </small>
                      </>
                    ) : null}
                    
                  </DateBox>
                ),
                sort: evt => handleSortType('duration'),
                align: 'left',
                width: '18%',
              },
              {
                label: 'Ưu tiên',
                field: row => (
                  <CustomBadge
                    color={
                      decodePriorityCode(get(row, 'priority_code', 0)).color
                    }
                    background={
                      decodePriorityCode(get(row, 'priority_code', 0))
                        .background
                    }
                  >
                    {get(row, 'priority_name', '')}
                  </CustomBadge>
                ),
                sort: evt => handleSortType('priority_code'),
                align: 'left',
                width: '10%',
              },
              {
                label: () => (
                  <Icon
                    path={mdiAccount}
                    size={1}
                    color={'rgb(102, 102, 102)'}
                  />
                ),
                field: row => (
                  <AvatarCircleList
                    users={get(row, 'members', []).map(member => ({
                      name: get(member, 'name'),
                      avatar: get(member, 'avatar')
                    }))}
                    display={3}
                  />
                ),
                align: 'center',
                width: '10%',
              },
              {
                label: '',
                field: row => (
                  <SettingButton
                    project={row}
                    setCurProject={setCurProject}
                    setMenuAnchor={setMenuAnchor}
                  />
                ),
                align: 'center',
                width: '5%',
              }
            ]}
            data={projects.projects}
          />
          <Menu
            id="filter-menu"
            anchorEl={filterAnchor}
            open={Boolean(filterAnchor)}
            onClose={evt => setFilterAnchor(null)}
            transformOrigin={{
              vertical: -30,
              horizontal: 'right'
            }}
          >
            {filters.map((filter, index) => (
              <CustomMenuItem
                key={index}
                onClick={evt => {
                  handleFilterType(index)
                  setFilterAnchor(null)
                }}
                selected={filterType === index}
              >
                <Icon path={mdiCheckCircle} size={0.7} /> {filter.title}
              </CustomMenuItem>
            ))}
          </Menu>
          <Popover
            id="download-menu"
            anchorEl={downloadAnchor}
            open={Boolean(downloadAnchor)}
            onClose={evt => setDownloadAnchor(null)}
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
              <ListItem button onClick={evt => setDownloadAnchor(null)}>
                <ListItemText primary={'Xuất ra file Excel .xls'} />
              </ListItem>
            </List>
          </Popover>
          <Popover
            id="time-menu"
            anchorEl={timeAnchor}
            open={Boolean(timeAnchor)}
            onClose={evt => setTimeAnchor(null)}
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
                      onClick={evt => setTimeAnchor(null)}
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
                      handleTimeType(timeOption)
                      handleTimeRange(
                        startDate ? moment(startDate).toDate() : undefined, 
                        endDate ? moment(endDate).toDate() : undefined
                      )
                      setTimeAnchor(null)
                    }}
                  >Áp dụng</StyledButton>
                </Content>
              </MainBar>
            </TimeBox>
          </Popover>
          <Menu
            id="simple-menu"
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={evt => setMenuAnchor(null)}
            transformOrigin={{
              vertical: -30,
              horizontal: 'right'
            }}
          >
            <MenuItem 
              onClick={evt => {
                setMenuAnchor(null);
                handleOpenModal('SETTING', {
                  curProject,
                });
              }}
            >
              Cài đặt
            </MenuItem>
            <MenuItem
              onClick={evt => {
                setMenuAnchor(null);
                handleOpenModal('UPDATE', {
                  curProject,
                });
              }}
            >
              Chỉnh sửa
            </MenuItem>
            <MenuItem
              onClick={evt => {
                setMenuAnchor(null);
                handleShowOrHideProject(curProject);
              }}
            >
              {get(curProject, 'visibility', false) ? 'Ẩn' : 'Bỏ ẩn'}
            </MenuItem>
            <MenuItem 
              onClick={evt => {
                setMenuAnchor(null)
                handleOpenModal('ALERT', {
                  content: "Bạn chắc chắn muốn xóa dự án?",
                  onConfirm: () => handleDeleteProject(curProject),
                })
              }}
            >Xóa</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </Container>
  );
}

export default AllProjectTable;