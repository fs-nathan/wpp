import { mdiAccount, mdiAccountCircle, mdiCalendar, mdiDownload, mdiScatterPlot, mdiAccountKey, mdiAccountMinusOutline, mdiPlusCircle} from '@mdi/js';
import Icon from '@mdi/react';
import AvatarCircleList from 'components/AvatarCircleList';
import CustomBadge from 'components/CustomBadge';
import { DownloadPopover, TimeRangePopover, useTimes } from 'components/CustomPopover';
import CustomTable from 'components/CustomTable';
import LoadingBox from 'components/LoadingBox';
import SimpleSmallProgressBar from 'components/SimpleSmallProgressBar';
import { Container, DateBox, LinkSpan, StateBox } from 'components/TableComponents';
import { find, flattenDeep, get, isNil, join } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-use';
import { Button } from "@material-ui/core";
import './style.scss';
import CustomAvatar from "../../../../components/CustomAvatar";

const SubTitle = ({ className = '', ...props }) =>
  <div
    className={`view_Project_AllTaskTable___subtitle ${className}`}
    {...props}
  />;

function decodePriorityCode(priorityCode) {
  switch (priorityCode) {
    case 0:
      return ({
        color: '#4caf50',
        background: '#4caf5042',
      });
    case 1:
      return ({
        color: '#ff9800',
        background: '#ff980038',
      });
    case 2:
      return ({
        color: '#fe0707',
        background: '#ff050524',
      });
    default:
      return ({
        color: '#53d7fc',
      });
  }
}

function displayDate(time, date, type) {
  return (
    <>
      {type === 2 && <span />}
      {type === 0 && <span>{time}</span>}
      {type <= 1 && <span>{date}</span>}
    </>
  );
}

function AllTaskTable({
  expand, handleExpand,
  showHidePendings,
  handleSubSlide,
  tasks, project,
  handleShowOrHideProject,
  handleSortTask,
  handleOpenModal, handleRemoveMemberFromTask,
  bgColor, timeType, handleAddMemberToTask,
  handleTimeType, memberID, memberTask,
  canUpdateProject, canCreateTask,
}) {

  const { t } = useTranslation();

  const history = useHistory();
  const { pathname } = useLocation();

  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [downloadAnchor, setDownloadAnchor] = React.useState(null);
  const times = useTimes();

  return (
    <Container>
        <CustomTable
            options={{
                title: t("DMH.VIEW.PP.RIGHT.ALL.TITLE"),
                subTitle: isNil(memberID) ? () => (
                    <SubTitle>
                        <div className={pathname.includes("table") ? 'view_Project_AllTaskTable___subtitle_active' : ''}>Table</div>
                        <div className={pathname.includes("gantt") ? 'view_Project_AllTaskTable___subtitle_active' : ''} onClick={evt => history.push(`${pathname.replace('task-table', 'task-gantt')}`)}>Gantt</div>
                        <div className={pathname.includes("chat") ? 'view_Project_AllTaskTable___subtitle_active' : ''} onClick={evt => history.push(`${pathname.replace('task-table', 'task-chat')}`)}>Chat</div>
                    </SubTitle>
                ) : () => (
                    <div className={"taskMember_title_container"}>
                        <div className={"taskMember_title_user"}>
                            <CustomAvatar style={{ width: 20, height: 20, }} src={get(memberTask.member, 'avatar', '')} alt='avatar' />
                            <span>{get(memberTask.member, "name")}</span>
                        </div>
                        <div className={"taskMember_title_summary"}>
                            <div style={{display: 'flex'}}>
                                <span>{t("LABEL_CHAT_TASK_NHOM_QUYEN")}: </span>
                                <div className={"taskMember_title_summary_value text-ellipsis"}>
                                    <abbr title={get(memberTask.member, "permission") ? get(memberTask.member, "permission") : t("IDS_WP_NOT_YET_ASSIGN")}>
                                        {get(memberTask.member, "permission") ? get(memberTask.member, "permission") : t("IDS_WP_NOT_YET_ASSIGN")}
                                    </abbr>
                                </div>
                            </div>
                            <div>
                                <span>{t("IDS_WP_JOIN")}: </span>
                                <span className={"taskMember_title_summary_value"}>
                                    {t("IDS_WP_TASK_COUNT_COMPLETE", {count: get(memberTask.member, "task_join"), total: get(memberTask.member, "total_task")})}
                                </span>
                            </div>
                            <div>
                                <span>{t("IDS_WP_DONE")}: </span>
                                <span className={"taskMember_title_summary_value"}>
                                    {get(memberTask.member, "complete_rate")} %
                                </span>
                            </div>
                        </div>
                    </div>
                ),
                subActions: [canUpdateProject && isNil(memberID) ? {
                    label: t("DMH.VIEW.PP.RIGHT.ALL.LABEL.MEMBER"),
                    iconPath: mdiAccountCircle,
                    onClick: (evt) => handleSubSlide(1),
                    noExpand: true,
                } : undefined, canUpdateProject && isNil(memberID) ? {
                    label: t("DMH.VIEW.PP.RIGHT.ALL.LABEL.GROUP_TASK"),
                    iconPath: mdiScatterPlot,
                    onClick: (evt) => handleSubSlide(2),
                    noExpand: true,
                } : undefined, isNil(memberID) ?{
                    label: t("DMH.VIEW.PP.RIGHT.ALL.LABEL.DOWNLOAD"),
                    iconPath: mdiDownload,
                    onClick: (evt) => setDownloadAnchor(evt.currentTarget)
                } : undefined, {
                    label: times[timeType].title,
                    iconPath: mdiCalendar,
                    onClick: evt => setTimeAnchor(evt.currentTarget)
                }],
                mainAction: canCreateTask && isNil(memberID) ? {
                    label: t("DMH.VIEW.PP.RIGHT.ALL.LABEL.CREATE"),
                    onClick: (evt) => handleOpenModal('CREATE'),
                } : !isNil(memberID) ? {
                    label: t("DMH.VIEW.DP.RIGHT.UT.PERMISSION"),
                    onClick: () => handleOpenModal('PERMISSION', {curMemberId: memberID}),
                    icon: mdiAccountKey
                } : null,
                expand: {
                    bool: expand,
                    toggleExpand: () => handleExpand(!expand),
                },
                moreMenu: isNil(memberID) ? [{
                    label: t("DMH.VIEW.PP.RIGHT.ALL.LABEL.SETTING"),
                    onClick: () => handleOpenModal('SETTING', {
                        curProject: project.project,
                        canChange: {
                            date: canUpdateProject,
                            copy: canUpdateProject,
                            view: true,
                        }
                    }),
                },
                    {
                        label: t("DMH.VIEW.PP.RIGHT.ALL.LABEL.PROJECT_CALENDAR"),
                        onClick: () => handleOpenModal('CALENDAR', {})
                    },canUpdateProject ? {
                        label: `${get(project.project, 'visibility') ? t("DMH.VIEW.PP.RIGHT.ALL.LABEL.HIDE") : t("DMH.VIEW.PP.RIGHT.ALL.LABEL.SHOW")}`,
                        onClick: () => handleShowOrHideProject(project.project),
                        disabled: !isNil(find(showHidePendings.pendings, pending => pending === get(project.project, 'id'))),
                    } : undefined] : undefined,
                grouped: {
                    bool: true,
                    id: 'id',
                    label: (group) => get(group, 'name'),
                    item: 'tasks',
                },
                draggable: canUpdateProject ? {
                    bool: true,
                    onDragEnd: result => {
                        const { source, destination, draggableId } = result;
                        if (!destination) return;
                        if (
                            destination.droppableId === source.droppableId &&
                            destination.index === source.index
                        ) return;
                        handleSortTask(draggableId, destination.droppableId, destination.index);
                    },
                } : {
                    bool: false,
                },
                loading: {
                    bool: tasks.loading,
                    component: () => <LoadingBox />,
                },
                row: {
                    id: 'id',
                },
                noData: {
                    bool: (tasks.firstTime === false) && (tasks.tasks.length === 0),
                    subtitle: t("DMH.VIEW.PP.RIGHT.ALL.LABEL.NO_DATA")
                },
            }}
            columns={[{
                label: t("DMH.VIEW.PP.RIGHT.ALL.TABLE.NAME"),
                field: (row) => <LinkSpan onClick={evt => {
                    history.push(`${get(row, 'url_redirect')}`);
                }}>{get(row, 'name', '')}</LinkSpan>,
                align: 'left',
                width: '25%',
            }, {
                label: t("DMH.VIEW.PP.RIGHT.ALL.TABLE.STATUS"),
                field: (row) => <StateBox
                    stateCode={get(row, 'status_code')}
                >
                    <div className="project_state_wrapper">
                        <span>&#11044;</span>
                        <span>
                  {get(row, 'status_name')}
                </span>
                    </div>
                    {get(row, 'status_code') === 3 && (
                        <small>
                            {t("DMH.VIEW.PP.RIGHT.ALL.TABLE.EXP_DATE", { date: get(row, 'day_expired', 0) })}
                        </small>
                    )}
                </StateBox>,
                align: 'left',
                width: '10%',
            }, {
                label: t("DMH.VIEW.PP.RIGHT.ALL.TABLE.PROGRESS"),
                field: (row) => get(row, 'duration_value', 0) !== 0 && `${get(row, 'duration_value', 0)} ${get(row, 'duration_unit', 'ngày')}`,
                align: 'center',
                width: '8%',
            }, {
                label: t("DMH.VIEW.PP.RIGHT.ALL.TABLE.BEGIN"),
                field: (row) => <DateBox>
                    {displayDate(get(row, 'start_time'), get(row, 'start_date'), get(row, 'type_time'))}
                </DateBox>,
                align: 'left',
                width: '10%',
            }, {
                label: t("DMH.VIEW.PP.RIGHT.ALL.TABLE.END"),
                field: (row) => <DateBox>
                    {displayDate(get(row, 'end_time'), get(row, 'end_date'), get(row, 'type_time'))}
                </DateBox>,
                align: 'left',
                width: '10%',
            }, {
                label: t("DMH.VIEW.PP.RIGHT.ALL.TABLE.COMPLETE"),
                field: (row) => <SimpleSmallProgressBar percentDone={get(row, 'complete', 0)} color={'#3edcdb'} />,
                align: 'center',
                width: '15%',
            }, {
                label: t("DMH.VIEW.PP.RIGHT.ALL.TABLE.PRIORITY"),
                field: (row) => <CustomBadge
                    color={decodePriorityCode(get(row, 'priority_code', 0)).color}
                    background={decodePriorityCode(get(row, 'priority_code', 0)).background}
                >
                    {get(row, 'priority_name', '0')}
                </CustomBadge>,
                align: 'center',
                width: '10%',
            }, {
                label: () => isNil(memberID) && <Icon path={mdiAccount} size={1} color={'rgb(102, 102, 102)'} />,
                field: row => isNil(memberID) ? <AvatarCircleList
                    users={
                        get(row, 'members', [])
                            .map(member => ({
                                name: get(member, 'name'),
                                avatar: get(member, 'avatar'),
                            }))
                    }
                    display={3}
                /> : <>
                    {
                        get(row, "is_joined") === true ? <div className={"taskMember_rowAction_container"}>
                            <Button
                                size={"small"}
                                className={"taskMember_rowAction_delete"}
                                startIcon={<Icon path={mdiAccountMinusOutline} size={0.8} color={'#fd7e14'}/>}
                                onClick={() => handleRemoveMemberFromTask(get(row, "id"))}
                            >
                                <span className={"taskMember_rowAction_colorOrange"}>{t("IDS_WP_REMOVE_FROM_TASK")}</span>
                            </Button>
                            {get(row, "leave_group", false) && <span className={"taskMember_rowAction_colorRed"}>{t("DMH.VIEW.PP.LEFT.PM.LEAVE")}</span>}
                        </div> : <div className={"taskMember_rowAction_container"}>
                            <Button
                                size={"small"}
                                startIcon={<Icon path={mdiPlusCircle} size={0.8} color={"#3DB1F5"}/>}
                                className={"taskMember_rowAction_add"}
                                onClick={() => handleAddMemberToTask(get(row, "id"))}
                            >
                                <span>{t("IDS_WP_ADD_TO_TASK")}</span>
                            </Button>
                        </div>
                    }
                </>,
                align: 'center',
                width: '12%',
            }]}
            data={tasks.tasks}
        />
        <DownloadPopover
            anchorEl={downloadAnchor}
            setAnchorEl={setDownloadAnchor}
            fileName='tasks'
            data={flattenDeep(
                tasks.tasks.map(groupTask =>
                    get(groupTask, 'tasks', [])
                        .map(task => ({
                            id: get(task, 'id', ''),
                            groupTask: get(groupTask, 'name', ''),
                            name: get(task, 'name', ''),
                            status: get(task, 'status_name', ''),
                            duration: get(task, 'duration_value', 0) + ' ' + get(task, 'duration_unit', ''),
                            start_time: get(task, 'start_time', ''),
                            start_date: get(task, 'start_date', ''),
                            end_time: get(task, 'end_time', ''),
                            end_date: get(task, 'end_date', ''),
                            progress: get(task, 'complete', 0) + '%',
                            priority: get(task, 'priority_name', ''),
                            members: join(
                                get(task, 'members', [])
                                    .map(member => get(member, 'name')),
                                ','
                            )
                        }))
                )
            )}
        />
        <TimeRangePopover
            bgColor={bgColor}
            anchorEl={timeAnchor}
            setAnchorEl={setTimeAnchor}
            timeOptionDefault={timeType}
            handleTimeRange={(timeType) => {
                handleTimeType(timeType)
            }}
        />
    </Container>
  )
}

export default AllTaskTable;