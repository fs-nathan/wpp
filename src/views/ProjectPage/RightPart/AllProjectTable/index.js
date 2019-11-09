import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import { connect } from 'react-redux';
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
  mdiCheckCircle
} from '@mdi/js';
import ProjectSettingModal from '../../Modals/ProjectSetting';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import CustomTable from '../../../../components/CustomTable';
import CustomBadge from '../../../../components/CustomBadge';
import CustomAvatar from '../../../../components/CustomAvatar';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import SimpleSmallProgressBar from '../../../../components/SimpleSmallProgressBar';
import AlertModal from '../../../../components/AlertModal';
import { listProject } from '../../../../actions/project/listProject'

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

const CustomMenuItem = styled(({selected, ...rest}) => <MenuItem {...rest} />)`
  display: flex;
  align-items: center;
  color: ${props => props.selected ? '#05b50c' : '#222'};
  & > svg {
    fill: ${props => props.selected ? '#05b50c' : '#888'};
    margin-right: 10px;
  }
  &:nth-child(2), &:nth-child(4), &:nth-child(7) {  
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: #222;
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
    &:last-child {
      text-align: right;
    }
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
    width: 60%;
  }
  &&:hover {
    background-color: #05b50c;
    color: #fff;
  }
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

function AllProjectTable({ expand, handleExpand, listProject, doListProject }) {

  const { data: { projects }, loading, error } = listProject;

  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const [downloadAnchor, setDownloadAnchor] = React.useState(null);
  const [timeAnchor, setTimeAnchor] = React.useState(null);

  React.useEffect(() => {
    doListProject({});
  }, [doListProject]);

  function handleFilterClose() {
    setFilterAnchor(null);
  }

  function handleDownloadClose() {
    setDownloadAnchor(null);
  }

  function handleTimeClose() {
    setTimeAnchor(null);
  }

  return (
    <Container>
      {loading && <LoadingBox />}
      {error !== null && <ErrorBox />}
      {!loading && error === null && (
        <React.Fragment>
          <CustomTable
            options={{
              title: 'Tất cả',
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
                onClick: () => null,  
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
            }}
            columns={[{
              label: '',
              field: (row) => <CustomAvatar src={get(row, 'user_create.avatar')} alt='user create avatar' />,
            }, {
              label: 'Dự án',
              field: 'name',
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
            }, {
              label: 'Hoàn thành',
              field: (row) => <ProgressBar>
                                <SimpleSmallProgressBar percentDone={get(row, 'complete', 0)} color={'#3edcdb'} />
                              </ProgressBar>,
            }, {
              label: 'Tiến độ',
              field: (row) => <DurationBox>
                                <span>{get(row, 'duration', 0)} ngày</span>
                                <small>
                                  {(new Date(get(row, 'date_start'))).toLocaleDateString()} - {(new Date(get(row, 'date_end'))).toLocaleDateString()}
                                </small>
                              </DurationBox>,
            }, {
              label: 'Ưu tiên',
              field: (row) => <StyledBadge color={decodePriorityCode(get(row, 'priority_code', 0)).color}>
                                {decodePriorityCode(get(row, 'priority_code', 0)).name}  
                              </StyledBadge>,
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
            onClose={handleFilterClose}
            transformOrigin={{
              vertical: -30,
              horizontal: 'right',
            }}
          >
            <CustomMenuItem onClick={handleFilterClose} ><Icon path={mdiCheckCircle} size={0.7} /> Tất cả</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose} ><Icon path={mdiCheckCircle} size={0.7} /> Hoạt động</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose} ><Icon path={mdiCheckCircle} size={0.7} /> Ẩn</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose} ><Icon path={mdiCheckCircle} size={0.7} /> Đang thực hiện</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose} ><Icon path={mdiCheckCircle} size={0.7} /> Hoàn thành</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose} ><Icon path={mdiCheckCircle} size={0.7} /> Quá hạn</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose} ><Icon path={mdiCheckCircle} size={0.7} /> Bạn tạo</CustomMenuItem>
            <CustomMenuItem onClick={handleFilterClose} ><Icon path={mdiCheckCircle} size={0.7} /> Bạn tham gia</CustomMenuItem>
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
            onClose={handleTimeClose}
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
                  <ListItem button>
                    <ListItemText primary={'Năm nay'} />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary={'Tháng này'} />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary={'Tháng trước'} />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary={'Tuần này'} />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary={'Tuần trước'} />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary={'Mọi lúc'} />
                  </ListItem>
                </List>
              </SideBar>
              <MainBar>
                <SubHeader>Thời gian được chọn</SubHeader>
                <Content>  
                  <YearBox>Năm 2019</YearBox>
                  <DateWrapper>
                    <div>
                      <span>Từ ngày</span>
                      <OutlinedInput 
                        variant='outlined'
                        type='date' 
                      />
                    </div>
                    <div>
                      <span>Đến ngày</span>
                      <OutlinedInput 
                        variant='outlined'
                        type='date' 
                      />
                    </div>
                  </DateWrapper>
                  <StyledButton fullWidth>Áp dụng</StyledButton>
                </Content>
              </MainBar>
            </TimeBox>
          </Popover>
        </React.Fragment>
      )}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    listProject: state.project.listProject,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListProject: (quite) => dispatch(listProject(quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllProjectTable);