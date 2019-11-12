import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { get, sortBy, reverse } from 'lodash';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
  IconButton, Menu, MenuItem, Popover,
  List, ListItem, ListItemText, ListSubheader,
  Button, OutlinedInput,
} from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiDownload,
  mdiFilterOutline,
  mdiCalendar,
  mdiAccount,
  mdiDotsVertical,
  mdiCheckCircle,
  mdiShieldAccount,
} from '@mdi/js';
import ProjectSettingModal from '../../Modals/ProjectSetting';
import CreateProjectModal from '../../Modals/CreateProject';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomBadge from '../../../../components/CustomBadge';
import CustomAvatar from '../../../../components/CustomAvatar';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import SimpleSmallProgressBar from '../../../../components/SimpleSmallProgressBar';
import AlertModal from '../../../../components/AlertModal';
import { listProject } from '../../../../actions/project/listProject'
import { detailProjectGroup } from '../../../../actions/projectGroup/detailProjectGroup';

const Container = styled.div`
  grid-area: table;
`;

const ProgressBar = styled.div`
  max-width: 100px;
`;

const StyledBadge = styled(CustomBadge)`
  max-width: 70px;
`;

const StateBox = styled(({stateName, ...rest}) => <div {...rest} />)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div > span {
    font-size: 14px;
    color: ${props => props.stateName};
    &:first-child {
      margin-right: 6px;
    }
  }
  & > small {
    margin-top: 4px;
    font-size: 12px;
    margin-left: 20px;
  }
`;

const DurationBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > span {
    font-size: 14px;
    color: red;
  }
  & > small {
    margin-top: 4px;
    font-size: 12px;
  }
`;

const CustomMenuItem = styled(({ selected, ...rest }) => (<MenuItem {...rest} />))`
  display: flex;
  align-items: center;
  color: ${props => props.selected ? '#05b50c' : '#222'};
  & > svg {
    fill: ${props => props.selected ? '#05b50c' : '#888'};
    margin-right: 10px;
  }
  &:nth-child(2), &:nth-child(4), &:nth-child(8) {  
    border-top: 1px solid #f4f4f4;
  }
`;

const StyledListSubheader = styled(ListSubheader)`
  text-transform: uppercase;
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const TimeBox = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 200px 400px;
  grid-template-areas:
    "side main";
`;

const SideBar = styled.div`
  grid-area: side;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const MainBar = styled.div`
  grid-area: main;
`;

const SubHeader = styled.div`
  padding: 15px;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  color: rgba(0, 0, 0, 0.54);
  font-weight: 500;
  font-size: 14px;
  height: 18px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80%;
`;

const YearBox = styled.div`
  padding: 15px 0;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  background-color: #ddd;
  width: 90%;
`;

const DateWrapper = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  & > div {  
    display: flex;
    flex-direction: column;
    & > span {
      font-size: 14px;
      margin-bottom: 15px;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    padding: 5px 10px;
    border-radius: 5px;
    margin: 10px auto;
    background-color: #05b50c;
    color: #fff;
    width: 90%;
  }
  &&:hover {
    background-color: #05b50c;
    color: #fff;
  }
`;

const TimeListItem = styled(({ selected, ...rest }) => (<ListItem {...rest} />))`
  border-left: 3px solid ${props => props.selected ? '#05b50c' : '#fff'};
`;

function decodePriorityCode(priorityCode) {
  switch (priorityCode) {
    case 1:   
      return ({
        color: '#4a96ba',
        name: 'Thấp',
      });
    case 2: 
      return ({
        color: '#c49c56',
        name: 'Trung bình',
      });
    case 3: 
      return ({
        color: '#d63340',
        name: 'Cao',
      });
    default:
      return ({
        color: '#53d7fc',
        name: 'Thấp',
      });
  }
}

function decodeStateName(stateName) {
  switch (stateName) {
    case 'waiting': 
      return ({
        color: 'orange',
        name: 'Đang chờ',
      });
    case 'doing': 
      return ({
        color: 'green',
        name: 'Đang làm',
      });
    case 'expired': 
      return ({
        color: 'red',
        name: 'Quá hạn',
      });
    default:
      return ({
        color: 'orange',
        name: 'Đang chờ',
      });
  }
}

const SettingButton = () => {

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
    <div onClick={evt => evt.stopPropagation()}>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} size='small'>
        <Icon path={mdiDotsVertical} size={1} color='rgba(0, 0, 0, 0.7)'/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={evt => setSetting(true)}>Cài đặt</MenuItem>
        <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={handleClose}>Ẩn</MenuItem>
        <MenuItem onClick={evt => setAlert(true)}>Xóa</MenuItem>
      </Menu>
      <ProjectSettingModal open={setting} setOpen={setSetting}/>
      <AlertModal 
        open={alert}
        setOpen={setAlert}
        content='Bạn chắc chắn muốn xóa dự án?'
      />
    </div>
  );
}

function AllProjectTable({ expand, handleExpand, listProject, doListProject, detailProjectGroup, doDetailProjectGroup }) {

  const { projectGroupId } = useParams();

  const { data: { projects: _projects }, loading: listProjectLoading, error: listProjectError } = listProject;
  const { data: { projectGroup }, loading: detailProjectGroupLoading, error: detailProjectGroupError } = detailProjectGroup;

  const loading = listProjectLoading || detailProjectGroupLoading;
  const error = listProjectError || detailProjectGroupError;

  const [openCreateProject, setOpenCreateProject] = React.useState(false);

  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const [downloadAnchor, setDownloadAnchor] = React.useState(null);
  const [timeAnchor, setTimeAnchor] = React.useState(null);

  const [filter, setFilter] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [sortField, setSortField] = React.useState(null);
  const [sortType, setSortType] = React.useState(1);
  const [projects, setProjects] = React.useState(_projects);
  const [startDate, setStartDate] = React.useState(moment().toDate());
  const [endDate, setEndDate] = React.useState(moment().toDate());
  const [timeTitle, setTimeTitle] = React.useState(`Năm ${moment().year()}`);

  React.useEffect(() => {
    setProjects(_projects);
  }, [_projects]);

  React.useEffect(() => {
    if (sortField) {
      let newProjects = sortBy(projects, [o => get(o, sortField)]);
      if (sortType === -1) reverse(newProjects);
      setProjects(newProjects);
    }
  }, [sortField, sortType]);

  React.useEffect(() => {
    switch (time) {
      case 0: {
        setStartDate(moment().startOf('year').toDate());
        setEndDate(moment().endOf('year').toDate());
        setTimeTitle(`Năm ${moment().year()}`);
        return;
      }
      case 1: {
        setStartDate(moment().startOf('month').toDate());
        setEndDate(moment().endOf('month').toDate());
        setTimeTitle(`Tháng ${moment().month() + 1}, năm ${moment().year()}`);
        return;
      }
      case 2: {
        setStartDate(moment().subtract(1, 'M').startOf('month').toDate());
        setEndDate(moment().subtract(1, 'M').endOf('month').toDate());
        setTimeTitle(`Tháng ${moment().subtract(1, 'M').month() + 1}, năm ${moment().subtract(1, 'M').year()}`);
        return;
      }
      case 3: {
        setStartDate(moment().startOf('isoWeek').toDate());
        setEndDate(moment().endOf('isoWeek').toDate());
        setTimeTitle(`Tuần ${moment().isoWeek()}, năm ${moment().year()}`);
        return;
      }
      case 4: {
        setStartDate(moment().subtract(1, 'w').startOf('isoWeek').toDate());
        setEndDate(moment().subtract(1, 'w').endOf('isoWeek').toDate());
        setTimeTitle(`Tuần ${moment().subtract(1, 'w').isoWeek()}, năm ${moment().subtract(1, 'w').year()}`);
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
    let options = {};
    if (projectGroupId) {
      options = { 
        ...options,
        groupProject: projectGroupId,
      };
    }
    switch (filter) {
      case 0: 
        break;
      case 1:
        options = {
          ...options,
          type: 'active',
        };
        break;
      case 2: 
        options = {
          ...options,
          type: 'hidden',
        };
        break;
      case 3: 
        options = {
          ...options,
          status: 0,
        };
        break;
      case 4: 
        options = {
          ...options,
          status: 1,
        };
        break;
      case 5: 
        options = {
          ...options,
          status: 2,
        };
        break;
      case 6: 
        options = {
          ...options,
          status: 3,
        };
        break;
      default:
        break;
    }
    doListProject(options);
  }, [doListProject, projectGroupId, filter]);

  React.useEffect(() => {
    if (projectGroupId) doDetailProjectGroup({ projectGroupId });
  }, [projectGroupId]);

  function handleFilterClose(filter = null) {
    return evt => {
      if (filter !== null) {
        setFilter(filter);
      }
      setFilterAnchor(null);
    }
  }

  function handleDownloadClose() {
    setDownloadAnchor(null);
  }

  function handleSortColumn(field) {
    if (field !== sortField) {
      setSortField(field);
      setSortType(1);
    } else {
      setSortType(prev => prev * -1);
    }
  }

  return (
    <Container>
      {error !== null && <ErrorBox />}
      {error === null && (
        <React.Fragment>
          <CustomTable
            options={{
              title: `${loading ? '...' : projectGroupId ? get(projectGroup, 'name', 'Tất cả') : 'Tất cả'}`,
              subTitle: '',
              subActions: [{
                label: 'Hoạt động',
                iconPath: mdiFilterOutline,
                onClick: (evt) => setFilterAnchor(evt.currentTarget),
              }, {
                label: 'Tải xuống',
                iconPath: mdiDownload,
                onClick: (evt) => setDownloadAnchor(evt.currentTarget),
              }, {
                label: 'Năm 2019',
                iconPath: mdiCalendar,
                onClick: (evt) => setTimeAnchor(evt.currentTarget),
              }],
              mainAction: {
                label: '+ Tạo dự án',
                onClick: (evt) => setOpenCreateProject(true),  
              },
              expand: {
                bool: expand,
                toggleExpand: () => handleExpand(!expand),
              },
              moreMenu: [{
                label: 'Cài đặt bảng',
                onClick: () => null,
              }, {
                label: 'Thùng rác',
                onClick: () => null,
              }],
              grouped: {
                bool: false,
              },
              draggable: {
                bool: true,
                onDragEnd: result => {
                  return;
                }, 
              },
              loading: {
                bool: loading,
                component: () => <LoadingBox />,
              },
            }}
            columns={[{
              label: () => <Icon path={mdiShieldAccount} size={1} color={'rgb(102, 102, 102)'}/>,
              field: (row) => <CustomAvatar src={get(row, 'user_create.avatar')} alt='user create avatar' />,
            }, {
              label: 'Dự án',
              field: 'name',
              sort: (evt) => handleSortColumn('name'),
            }, {
              label: 'Trạng thái',
              field: (row) => <StateBox stateName={decodeStateName(get(row, 'state_name', '')).color}>
                                <div>
                                  <span>&#11044;</span><span>{decodeStateName(get(row, 'state_name', '')).name}</span>
                                </div>
                                <small>
                                  {get(row, 'state_name', '') === 'expired' ? get(row, 'day_expired', 0) : get(row, 'day_implement', 0)} ngày
                                </small>
                              </StateBox>,
              sort: (evt) => handleSortColumn('state_name'),
            }, {
              label: 'Hoàn thành',
              field: (row) => <ProgressBar>
                                <SimpleSmallProgressBar percentDone={get(row, 'complete', 0)} color={'#3edcdb'} />
                              </ProgressBar>,
              sort: (evt) => handleSortColumn('complete'),
            }, {
              label: 'Tiến độ',
              field: (row) => <DurationBox>
                                <span>{get(row, 'duration', 0)} ngày</span>
                                <small>
                                  {(new Date(get(row, 'date_start'))).toLocaleDateString()} - {(new Date(get(row, 'date_end'))).toLocaleDateString()}
                                </small>
                              </DurationBox>,
              sort: (evt) => handleSortColumn('duration'),
            }, {
              label: 'Ưu tiên',
              field: (row) => <StyledBadge color={decodePriorityCode(get(row, 'priority_code', 0)).color}>
                                {decodePriorityCode(get(row, 'priority_code', 0)).name}  
                              </StyledBadge>,
              sort: (evt) => handleSortColumn('priority_code'),
            }, {
              label: () => <Icon path={mdiAccount} size={1} color={'rgb(102, 102, 102)'}/>,
              field: row => <AvatarCircleList 
                              users={
                                get(row, 'members', [])
                                .map(member => ({
                                  name: get(member, 'name'),
                                  avatar: get(member, 'avatar'),
                                }))
                              } 
                              display={3} 
                            />,
            }, {
              label: '',
              field: row => <SettingButton />,
            }]}
            data={projects}
          />
          <Menu
            id="filter-menu"
            anchorEl={filterAnchor}
            open={Boolean(filterAnchor)}
            onClose={handleFilterClose()}
            transformOrigin={{
              vertical: -30,
              horizontal: 'right',
            }}
          >
            <CustomMenuItem onClick={handleFilterClose(0)} selected={filter === 0} ><Icon path={mdiCheckCircle} size={0.7} /> Tất cả</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose(1)} selected={filter === 1} ><Icon path={mdiCheckCircle} size={0.7} /> Hoạt động</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose(2)} selected={filter === 2} ><Icon path={mdiCheckCircle} size={0.7} /> Ẩn</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose(3)} selected={filter === 3} ><Icon path={mdiCheckCircle} size={0.7} /> Đang chờ</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose(4)} selected={filter === 4} ><Icon path={mdiCheckCircle} size={0.7} /> Đang thực hiện</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose(5)} selected={filter === 5} ><Icon path={mdiCheckCircle} size={0.7} /> Hoàn thành</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose(6)} selected={filter === 6} ><Icon path={mdiCheckCircle} size={0.7} /> Quá hạn</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose(7)} selected={filter === 7} ><Icon path={mdiCheckCircle} size={0.7} /> Bạn tạo</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose(8)} selected={filter === 8} ><Icon path={mdiCheckCircle} size={0.7} /> Bạn tham gia</CustomMenuItem>
          </Menu>
          <Popover
            id="download-menu"
            anchorEl={downloadAnchor}
            open={Boolean(downloadAnchor)}
            onClose={handleDownloadClose}
            transformOrigin={{
              vertical: -30,
              horizontal: 'right',
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
              horizontal: 'right',
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
                  <TimeListItem button onClick={evt => setTime(0)} selected={time === 0}>
                    <ListItemText primary={'Năm nay'} />
                  </TimeListItem>
                  <TimeListItem button onClick={evt => setTime(1)} selected={time === 1}>
                    <ListItemText primary={'Tháng này'} />
                  </TimeListItem>
                  <TimeListItem button onClick={evt => setTime(2)} selected={time === 2}>
                    <ListItemText primary={'Tháng trước'} />
                  </TimeListItem>
                  <TimeListItem button onClick={evt => setTime(3)} selected={time === 3}>
                    <ListItemText primary={'Tuần này'} />
                  </TimeListItem>
                  <TimeListItem button onClick={evt => setTime(4)} selected={time === 4}>
                    <ListItemText primary={'Tuần trước'} />
                  </TimeListItem>
                  <TimeListItem button onClick={evt => setTime(5)} selected={time === 5}>
                    <ListItemText primary={'Mọi lúc'} />
                  </TimeListItem>
                  <TimeListItem button onClick={evt => setTime(6)} selected={time === 6}>
                    <ListItemText primary={'Tùy chọn'} />
                  </TimeListItem>
                </List>
              </SideBar>
              <MainBar>
                <SubHeader>Thời gian được chọn</SubHeader>
                <Content>  
                  <YearBox>{timeTitle}</YearBox>
                  <DateWrapper>
                    <div>
                      <span>Từ ngày</span>
                      <OutlinedInput 
                        disabled={time !== 6}
                        variant='outlined'
                        type={time === 5 ? 'text' : 'date'}
                        value={time === 5 ? 'All' : moment(startDate).format('YYYY-MM-DD')}
                        onChange={evt => setStartDate(moment(evt.target.value).toDate())}
                      />
                    </div>
                    <div>
                      <span>Đến ngày</span>
                      <OutlinedInput 
                        disabled={time !== 6}
                        variant='outlined'
                        type={time === 5 ? 'text' : 'date'}
                        value={time === 5 ? 'All' : moment(endDate).format('YYYY-MM-DD')}
                        onChange={evt => setEndDate(moment(evt.target.value).toDate())}
                      />
                    </div>
                  </DateWrapper>
                  <StyledButton fullWidth>Áp dụng</StyledButton>
                </Content>
              </MainBar>
            </TimeBox>
          </Popover>
          <CreateProjectModal open={openCreateProject} setOpen={setOpenCreateProject} />
        </React.Fragment>
      )}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    listProject: state.project.listProject,
    detailProjectGroup: state.projectGroup.detailProjectGroup,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListProject: (options, quite) => dispatch(listProject(options, quite)),
    doDetailProjectGroup: ({ projectGroupId }, quite) => dispatch(detailProjectGroup({ projectGroupId }, quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllProjectTable);