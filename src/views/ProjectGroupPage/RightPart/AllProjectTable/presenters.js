import { CircularProgress, IconButton, Menu, MenuItem } from '@material-ui/core';
import { mdiAccount, mdiCalendar, mdiCheckCircle, mdiDotsVertical, mdiDownload, mdiFilterOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { find, get, isNil, join, remove, slice } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AvatarCircleList from '../../../../components/AvatarCircleList';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomBadge from '../../../../components/CustomBadge';
import { ChartInfoBox } from '../../../../components/CustomDonutChart';
import { DownloadPopover, TimeRangePopover, times } from '../../../../components/CustomPopover';
import CustomTable from '../../../../components/CustomTable';
import ErrorBox from '../../../../components/ErrorBox';
import ImprovedSmallProgressBar from '../../../../components/ImprovedSmallProgressBar';
import { LightTooltip, TooltipWrapper } from '../../../../components/LightTooltip';
import LoadingBox from '../../../../components/LoadingBox';
import { Container, DateBox, LinkSpan, SettingContainer, StateBox } from '../../../../components/TableComponents';
import { filters } from './constants';
import './style.scss';

const CustomMenuItem = ({ className = '', selected, refs, ...props }) =>
  <MenuItem
    button={false}
    className={`${selected
      ? 'view_ProjectGroup_Table_All___menu-item-selected'
      : 'view_ProjectGroup_Table_All___menu-item'
      } ${className}`}
    {...props}
  />;

function decodePriorityCode(priorityCode) {
  switch (priorityCode) {
    case 0:
      return {
        color: '#4caf50',
        background: '#4caf5042',
      };
    case 1:
      return {
        color: '#ff9800',
        background: '#ff980038',
      };
    case 2:
      return {
        color: '#fe0707',
        background: '#ff050524',
      };
    default:
      return {
        color: '#53d7fc',
      };
  }
}

const SettingButton = ({
  handleOpenMenu
}) => {

  return (
    <SettingContainer onClick={evt => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={evt => handleOpenMenu(evt.currentTarget)}
        size="small"
      >
        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
      </IconButton>
    </SettingContainer>
  );
};

function AllProjectTable({
  expand, handleExpand,
  projects,
  filterType, handleFilterType,
  timeType, handleTimeType,
  handleSortType,
  handleShowOrHideProject,
  handleDeleteProject,
  handleSortProject,
  handleOpenModal,
  handleTimeRange,
  bgColor,
  showHidePendings,
}) {

  const history = useHistory();

  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const [downloadAnchor, setDownloadAnchor] = React.useState(null);
  const [timeAnchor, setTimeAnchor] = React.useState(null);

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [curProject, setCurProject] = React.useState(null);
  const [showHideDisabled, setShowHideDisabled] = React.useState(false);

  function doOpenMenu(anchorEl, project) {
    setMenuAnchor(anchorEl)
    setCurProject(project)
  }

  React.useEffect(() => {
    setShowHideDisabled(
      !isNil(find(showHidePendings.pendings, pending => pending === get(curProject, 'id')))
    )
  }, [showHidePendings, curProject]);

  React.useEffect(() => {
    setCurProject(oldProject => find(projects.projects, { id: get(oldProject, 'id') }))
  }, [projects]);

  return (
    <Container>
      {isNil(projects.error)
        ? (
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
                    const indexes = sortData.map(data => get(data, 'sort_index'));
                    let removed = remove(sortData, { id: draggableId });
                    sortData = [
                      ...slice(sortData, 0, destination.index),
                      ...removed,
                      ...slice(sortData, destination.index)
                    ].map((data, index) => ({
                      ...data,
                      sort_index: indexes[index],
                    }));
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
                      stateCode={get(row, 'state_code')}
                    >
                      <div>
                        <span>&#11044;</span>
                        <span>
                          {get(row, 'state_code') === 5 ? 'Ẩn' : get(row, 'state_name')}
                        </span>
                      </div>
                      {get(row, 'state_code') !== 5 && (
                        <small>
                          {get(row, 'state_code', '') === 3
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
                  align: 'center',
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
                  align: 'center',
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
                  field: project => (
                    <SettingButton
                      handleOpenMenu={currentTarget =>
                        doOpenMenu(
                          currentTarget,
                          project,
                        )
                      }
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
                  <Icon path={mdiCheckCircle} size={0.7} />
                  <span>{filter.title}</span>
                  <span>{get(projects.summary, filter.field, 0)}</span>
                </CustomMenuItem>
              ))}
            </Menu>
            <DownloadPopover
              anchorEl={downloadAnchor}
              setAnchorEl={setDownloadAnchor}
              fileName='projects'
              data={projects.projects.map(project => ({
                id: get(project, 'id', ''),
                icon: get(project, 'icon', ''),
                name: get(project, 'name', ''),
                status: get(project, 'state_name', ''),
                task_count: get(project, 'statistic.waiting', 0)
                  + get(project, 'statistic.doing', 0)
                  + get(project, 'statistic.expired', 0)
                  + get(project, 'statistic.complete', 0)
                  + get(project, 'statistic.stop', 0),
                progress: `${get(project, 'complete', 0)}%`,
                duration: get(project, 'duration')
                  ? `${get(project, 'duration')} ngày (${get(project, 'date_start')} - ${get(project, 'date_end')})`
                  : '',
                priority: get(project, 'priority_name', ''),
                members: join(
                  get(project, 'members', [])
                    .map(member => get(member, 'name')),
                  ','
                )
              }))}
            />
            <TimeRangePopover
              bgColor={bgColor}
              anchorEl={timeAnchor}
              setAnchorEl={setTimeAnchor}
              timeOptionDefault={timeType}
              handleTimeRange={(timeType, startDate, endDate) => {
                handleTimeType(timeType)
                handleTimeRange(startDate, endDate)
              }}
            />
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
                disabled={showHideDisabled}
              >
                {showHideDisabled &&
                  <CircularProgress
                    size={16}
                    className="margin-circular"
                    color="white"
                  />}
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
        ) : <ErrorBox />}
    </Container>
  );
}

export default AllProjectTable;