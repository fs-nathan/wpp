import React from 'react';
import moment from 'moment';
import { get, sortBy, reverse, filter as filterArr, find } from 'lodash';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
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
import { Context as ProjectPageContext } from '../../index';
import ProjectSettingModal from '../../Modals/ProjectSetting';
import CreateProjectModal from '../../Modals/CreateProject';
import EditProjectModal from '../../Modals/EditProject';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomBadge from '../../../../components/CustomBadge';
import CustomAvatar from '../../../../components/CustomAvatar';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import SimpleSmallProgressBar from '../../../../components/SimpleSmallProgressBar';
import { Container, SettingContainer, LinkSpan, StateBox, DateBox } from '../../../../components/TableComponents';
import AlertModal from '../../../../components/AlertModal';
import { listProject } from '../../../../actions/project/listProject';
import { sortProject } from '../../../../actions/project/sortProject';
import { detailProjectGroup } from '../../../../actions/projectGroup/detailProjectGroup';
import { deleteProject } from '../../../../actions/project/deleteProject';
import { hideProject } from '../../../../actions/project/hideProject';
import { showProject } from '../../../../actions/project/showProject';
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

function displayDateRange(from, to) {
  if (
    from instanceof Date && !isNaN(from) 
    &&
    to instanceof Date && !isNaN(to)
  ) {
    return `${from.toLocaleDateString()} - ${to.toLocaleDateString()}`;
  } else {
    return '';
  }
}

const SettingButton = ({
  visibility,
  onEditProject,
  onHideProject,
  onShowProject,
  onDeleteProject
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [setting, setSetting] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  function handleClick(evt) {
    setAnchorEl(evt.currentTarget);
  }

  function handleClose(evt) {
    setAnchorEl(null);
  }

  return (
    <SettingContainer onClick={evt => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={evt => setSetting(true)}>Cài đặt</MenuItem>
        <MenuItem
          onClick={evt => {
            handleClose(evt);
            onEditProject(evt);
          }}
        >
          Chỉnh sửa
        </MenuItem>
        <MenuItem
          onClick={evt => {
            handleClose(evt);
            visibility ? onHideProject() : onShowProject();
          }}
        >
          {visibility ? 'Ẩn' : 'Bỏ ẩn'}
        </MenuItem>
        <MenuItem onClick={evt => setAlert(true)}>Xóa</MenuItem>
      </Menu>
      <ProjectSettingModal open={setting} setOpen={setSetting} />
      <AlertModal
        open={alert}
        setOpen={setAlert}
        content="Bạn chắc chắn muốn xóa dự án?"
        onCancle={handleClose}
        onConfirm={() => {
          handleClose();
          onDeleteProject();
        }}
      />
    </SettingContainer>
  );
};

function AllProjectTable({
  expand,
  handleExpand,
  listProject, listProjectGroup,
  detailProjectGroup,
  doDeleteProject,
  doHideProject,
  doShowProject,
  doSortProject,
  colors,
  isDefault = false,
}) {
  const { setProjectGroupId } = React.useContext(ProjectPageContext);
  const { projectGroupId } = useParams();
  const history = useHistory();

  const bgColor = colors.find(item => item.selected === true);

  const {
    data: { projects: _projects },
    loading: listProjectLoading,
    error: listProjectError
  } = listProject;

  const {
    data: { projectGroups },
    loading: listProjectGroupLoading,
    error: listProjectGroupError,
  } = listProjectGroup;

  const {
    loading: detailProjectGroupLoading,
    error: detailProjectGroupError
  } = detailProjectGroup;

  const loading = listProjectLoading || detailProjectGroupLoading || listProjectGroupLoading;
  const error = listProjectError || detailProjectGroupError || listProjectGroupError;

  const [openCreateProject, setOpenCreateProject] = React.useState(false);

  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const [downloadAnchor, setDownloadAnchor] = React.useState(null);
  const [timeAnchor, setTimeAnchor] = React.useState(null);

  const [filter, setFilter] = React.useState(1);
  const [time, setTime] = React.useState(0);
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);
  const [projects, setProjects] = React.useState(_projects);
  const [startDate, setStartDate] = React.useState(moment().toDate());
  const [endDate, setEndDate] = React.useState(moment().toDate());
  const [timeTitle, setTimeTitle] = React.useState(`Năm ${moment().year()}`);

  const [edittingProject, setEdittingProject] = React.useState(null);
  const [openEditProject, setOpenEditProject] = React.useState(false);

  const filterTitle = [
    'Tất cả',
    'Hoạt động',
    'Ẩn',
    'Đang chờ',
    'Đang thực hiện',
    'Hoàn thành',
    'Quá hạn',
    'Bạn tạo',
    'Bạn tham gia'
  ];

  React.useEffect(() => {
    let projects = _projects.map(project => {
      let projectGroupIcon = get(find(projectGroups, { id: get(project, 'project_group_id') }), 'icon');
      return {
        ...project,
        icon: projectGroupIcon,
      }
    });
    switch (filter) {
      case 0:
        break;
      case 1:
        projects = filterArr(projects, { visibility: true });
        break;
      case 2:
        projects = filterArr(projects, { visibility: false });
        break;
      case 3:
        projects = filterArr(projects, {
          visibility: true,
          state_name: 'Waiting'
        });
        break;
      case 4:
        projects = filterArr(projects, {
          visibility: true,
          state_name: 'Doing'
        });
        break;
      case 5:
        projects = filterArr(projects, {
          visibility: true,
          state_name: 'Finished'
        });
        break;
      case 6:
        projects = filterArr(projects, {
          visibility: true,
          state_name: 'Expired'
        });
        break;
      default:
        break;
    }
    if (sortField === 'state_name') {
      projects = sortBy(projects, [
        o => get(o, 'visibility', true),
        o => get(o, sortField)
      ]);
    } else {
      projects = sortBy(projects, [o => get(o, sortField)]);
    }
    if (sortType === -1) {
      reverse(projects);
    }
    if (isDefault) {
      projects = filterArr(projects, {
        project_group_id: null,
      });
    }
    setProjects(projects);
  }, [_projects, filter, sortField, sortType, projectGroups, isDefault]);

  React.useEffect(() => {
    switch (time) {
      case 0: {
        setStartDate(
          moment()
            .startOf('year')
            .toDate()
        );
        setEndDate(
          moment()
            .endOf('year')
            .toDate()
        );
        setTimeTitle(`Năm ${moment().year()}`);
        return;
      }
      case 1: {
        setStartDate(
          moment()
            .startOf('month')
            .toDate()
        );
        setEndDate(
          moment()
            .endOf('month')
            .toDate()
        );
        setTimeTitle(`Tháng ${moment().month() + 1}, năm ${moment().year()}`);
        return;
      }
      case 2: {
        setStartDate(
          moment()
            .subtract(1, 'M')
            .startOf('month')
            .toDate()
        );
        setEndDate(
          moment()
            .subtract(1, 'M')
            .endOf('month')
            .toDate()
        );
        setTimeTitle(
          `Tháng ${moment()
            .subtract(1, 'M')
            .month() + 1}, năm ${moment()
            .subtract(1, 'M')
            .year()}`
        );
        return;
      }
      case 3: {
        setStartDate(
          moment()
            .startOf('isoWeek')
            .toDate()
        );
        setEndDate(
          moment()
            .endOf('isoWeek')
            .toDate()
        );
        setTimeTitle(`Tuần ${moment().isoWeek()}, năm ${moment().year()}`);
        return;
      }
      case 4: {
        setStartDate(
          moment()
            .subtract(1, 'w')
            .startOf('isoWeek')
            .toDate()
        );
        setEndDate(
          moment()
            .subtract(1, 'w')
            .endOf('isoWeek')
            .toDate()
        );
        setTimeTitle(
          `Tuần ${moment()
            .subtract(1, 'w')
            .isoWeek()}, năm ${moment()
            .subtract(1, 'w')
            .year()}`
        );
        return;
      }
      case 5: {
        setStartDate(moment().toDate());
        setEndDate(moment().toDate());
        setTimeTitle(`Toàn bộ thời gian`);
        return;
      }
      case 6: {
        setTimeTitle(`Tùy chọn`);
        return;
      }
      default:
        return;
    }
  }, [time]);

  React.useEffect(() => {
    if (isDefault === false) setProjectGroupId(projectGroupId);
  }, [setProjectGroupId, projectGroupId, isDefault]);

  function handleFilterClose(filter = null) {
    return evt => {
      if (filter !== null) {
        setFilter(filter);
      }
      setFilterAnchor(null);
    };
  }

  function handleDownloadClose() {
    setDownloadAnchor(null);
  }

  function handleSortColumn(field) {
    if (field !== sortField) {
      setSortField(field);
      setSortType(1);
    } else {
      setSortType(sortType => -sortType);
    }
  }

  function handleHideProject(projectId) {
    doHideProject({ projectId });
  }

  function handleShowProject(projectId) {
    doShowProject({ projectId });
  }

  function handleDeleteProject(projectId) {
    doDeleteProject({ projectId });
  }

  return (
    <Container>
      {error !== null && <ErrorBox />}
      {error === null && (
        <React.Fragment>
          <CustomTable
            options={{
              title: `Danh sách dự án`,
              subTitle: '',
              subActions: [
                {
                  label: filterTitle[filter],
                  iconPath: mdiFilterOutline,
                  onClick: evt => setFilterAnchor(evt.currentTarget)
                },
                {
                  label: 'Tải xuống',
                  iconPath: mdiDownload,
                  onClick: evt => setDownloadAnchor(evt.currentTarget)
                },
                {
                  label: 'Năm 2019',
                  iconPath: mdiCalendar,
                  onClick: evt => setTimeAnchor(evt.currentTarget)
                }
              ],
              mainAction: {
                label: '+ Tạo dự án',
                onClick: evt => setOpenCreateProject(true)
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
                  doSortProject({
                    projectId: draggableId,
                    sortIndex: destination.index
                  });
                }
              },
              loading: {
                bool: loading,
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
                sort: evt => handleSortColumn('name'),
                align: 'left',
                width: '29%',
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
                sort: evt => handleSortColumn('state_name'),
                align: 'left',
                width: '10%',
              },
              {
                label: 'Hoàn thành',
                field: row => (
                  <SimpleSmallProgressBar
                    percentDone={get(row, 'complete', 0)}
                    color={'#3edcdb'}
                  />
                ),
                sort: evt => handleSortColumn('complete'),
                align: 'left',
                width: '15%',
              },
              {
                label: 'Tiến độ',
                field: row => (
                  <DateBox>
                    <span>{get(row, 'duration') ? get(row, 'duration') + ' ngày' : ''}</span>
                    <small>
                      {displayDateRange(
                        new Date(get(row, 'date_start')),
                        new Date(get(row, 'date_end'))
                      )}
                    </small>
                  </DateBox>
                ),
                sort: evt => handleSortColumn('duration'),
                align: 'left',
                width: '15%',
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
                sort: evt => handleSortColumn('priority_code'),
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
                    onEditProject={evt => {
                      setEdittingProject(row);
                      setOpenEditProject(true);
                    }}
                    visibility={get(row, 'visibility', true)}
                    onHideProject={() => handleHideProject(get(row, 'id'))}
                    onShowProject={() => handleShowProject(get(row, 'id'))}
                    onDeleteProject={() => handleDeleteProject(get(row, 'id'))}
                  />
                ),
                align: 'center',
                width: '5%',
              }
            ]}
            data={projects}
          />
          <Menu
            id="filter-menu"
            anchorEl={filterAnchor}
            open={Boolean(filterAnchor)}
            onClose={handleFilterClose()}
            transformOrigin={{
              vertical: -30,
              horizontal: 'right'
            }}
          >
            {filterTitle.map((title, index) => (
              <CustomMenuItem
                key={index}
                onClick={handleFilterClose(index)}
                selected={filter === index}
              >
                <Icon path={mdiCheckCircle} size={0.7} /> {title}
              </CustomMenuItem>
            ))}
          </Menu>
          <Popover
            id="download-menu"
            anchorEl={downloadAnchor}
            open={Boolean(downloadAnchor)}
            onClose={handleDownloadClose}
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
              <ListItem button onClick={handleDownloadClose}>
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
                      Tùy chỉnh
                    </StyledListSubheader>
                  }
                >
                  <TimeListItem
                    button
                    onClick={evt => setTime(0)}
                    style={time === 0 ? {
                      borderLeft: `3px solid ${bgColor.color}`,
                    } : {
                      borderLeft: '3px solid #fff',
                    }}
                  >
                    <ListItemText primary={'Năm nay'} />
                  </TimeListItem>
                  <TimeListItem
                    button
                    onClick={evt => setTime(1)}
                    style={time === 1 ? {
                      borderLeft: `3px solid ${bgColor.color}`,
                    } : {
                      borderLeft: '3px solid #fff',
                    }}
                  >
                    <ListItemText primary={'Tháng này'} />
                  </TimeListItem>
                  <TimeListItem
                    button
                    onClick={evt => setTime(2)}
                    style={time === 2 ? {
                      borderLeft: `3px solid ${bgColor.color}`,
                    } : {
                      borderLeft: '3px solid #fff',
                    }}
                  >
                    <ListItemText primary={'Tháng trước'} />
                  </TimeListItem>
                  <TimeListItem
                    button
                    onClick={evt => setTime(3)}
                    style={time === 3 ? {
                      borderLeft: `3px solid ${bgColor.color}`,
                    } : {
                      borderLeft: '3px solid #fff',
                    }}
                  >
                    <ListItemText primary={'Tuần này'} />
                  </TimeListItem>
                  <TimeListItem
                    button
                    onClick={evt => setTime(4)}
                    style={time === 4 ? {
                      borderLeft: `3px solid ${bgColor.color}`,
                    } : {
                      borderLeft: '3px solid #fff',
                    }}
                  >
                    <ListItemText primary={'Tuần trước'} />
                  </TimeListItem>
                  <TimeListItem
                    button
                    onClick={evt => setTime(5)}
                    style={time === 5 ? {
                      borderLeft: `3px solid ${bgColor.color}`,
                    } : {
                      borderLeft: '3px solid #fff',
                    }}
                  >
                    <ListItemText primary={'Mọi lúc'} />
                  </TimeListItem>
                  <TimeListItem
                    button
                    onClick={evt => setTime(6)}
                    style={time === 6 ? {
                      borderLeft: `3px solid ${bgColor.color}`,
                    } : {
                      borderLeft: '3px solid #fff',
                    }}
                  >
                    <ListItemText primary={'Tùy chọn'} />
                  </TimeListItem>
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
                  <YearBox>{timeTitle}</YearBox>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateWrapper>
                      {time === 5 ? (
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
                            disabled={time !== 6}
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
                            disabled={time !== 6}
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
                  >Áp dụng</StyledButton>
                </Content>
              </MainBar>
            </TimeBox>
          </Popover>
          <CreateProjectModal
            open={openCreateProject}
            setOpen={setOpenCreateProject}
          />
          <EditProjectModal
            curProject={edittingProject}
            open={openEditProject}
            setOpen={setOpenEditProject}
          />
        </React.Fragment>
      )}
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    listProject: state.project.listProject,
    listProjectGroup: state.projectGroup.listProjectGroup,
    detailProjectGroup: state.projectGroup.detailProjectGroup,
    colors: state.setting.colors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doSortProject: ({ projectId, sortIndex }) =>
      dispatch(sortProject({ projectId, sortIndex })),
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId })),
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doDetailProjectGroup: ({ projectGroupId }, quite) =>
      dispatch(detailProjectGroup({ projectGroupId }, quite))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProjectTable);
