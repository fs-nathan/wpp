import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  mdiAccount,
  mdiCalendar,
  mdiCheckboxBlankCircleOutline,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiCheckCircle,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiDownload,
  mdiFilterOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import * as images from "assets";
import { statusTaskColors } from "constants/colors";
import {
  find,
  get,
  includes,
  isArray,
  isNil,
  join,
  remove,
  size,
  slice,
} from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import AvatarCircleList from "../../../../components/AvatarCircleList";
import CustomBadge from "../../../../components/CustomBadge";
import { ChartInfoBox } from "../../../../components/CustomDonutChart";
import {
  DownloadPopover,
  TimeRangePopover,
  useFilters,
  useTimes,
} from "../../../../components/CustomPopover";
import CustomTable from "../../../../components/CustomTable";
import ImprovedSmallProgressBar from "../../../../components/ImprovedSmallProgressBar";
import {
  LightTooltip,
  TooltipWrapper,
} from "../../../../components/LightTooltip";
import LoadingBox from "../../../../components/LoadingBox";
import {
  Container,
  DateBox,
  LinkSpan,
  SettingContainer,
  StateBox,
} from "../../../../components/TableComponents";
import { WORKPLACE_TYPES } from "../../../../constants/constants";
import { Routes } from "../../../../constants/routes";
import { decodePriorityCode } from "../../../../helpers/project/commonHelpers";
import { TitleTable } from "./components";
import HeaderTableAllGroup from "./components/HeaderTableAllGroup";
import EmptyPersonalBoard from "./Intro/EmptyPersonalBoard";
import EmptyWorkingBoard from "./Intro/EmptyWorkingBoard";
import EmptyWorkingGroup from "./Intro/EmptyWorkingGroup";
import "./style.scss";

const MyIcon = ({ className = "", ...props }) => (
  <Icon
    className={`view_ProjectGroup_Table_All___icon ${className}`}
    {...props}
  />
);
const SettingButton = ({ handleOpenMenu }) => {
  return (
    <SettingContainer onClick={(evt) => evt.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(evt) => handleOpenMenu(evt.currentTarget)}
        size="small"
      >
        <Icon path={mdiDotsVertical} size={1} color="rgba(0, 0, 0, 0.7)" />
      </IconButton>
    </SettingContainer>
  );
};

function AllProjectTable({
  expand,
  handleExpand,
  projects,
  filterType,
  handleFilterType,
  timeType,
  handleTimeType,
  handleSortType,
  type_data = null,
  handleShowOrHideProject,
  handleSortProject,
  handleOpenModal,
  bgColor,
  showHidePendings,
  projectGroup,
  groupID,
  isFiltering,
  setIsFiltering,
}) {
  const history = useHistory();
  const { t } = useTranslation();
  const [filterAnchor, setFilterAnchor] = React.useState(null);
  const [downloadAnchor, setDownloadAnchor] = React.useState(null);
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [curProject, setCurProject] = React.useState(null);
  const [showHideDisabled, setShowHideDisabled] = React.useState(false);
  const [projectSummary, setProjectSummary] = React.useState({});
  const [currentGroup, setCurrentGroup] = React.useState(null);

  const times = useTimes();
  const filters = useFilters();
  function doOpenMenu(anchorEl, project) {
    setMenuAnchor(anchorEl);
    setCurProject(project);
  }
  React.useEffect(() => {
    setShowHideDisabled(
      !isNil(
        find(
          showHidePendings.pendings,
          (pending) => pending === get(curProject, "id")
        )
      )
    );
  }, [showHidePendings, curProject]);
  React.useEffect(() => {
    setCurProject((oldProject) =>
      find(projects.projects, { id: get(oldProject, "id") })
    );
    setProjectSummary(projects.summary);
  }, [projects]);
  React.useEffect(() => {
    setCurrentGroup(find(projectGroup, { id: groupID }));
  }, [groupID, projectGroup]);

  function renderEmptyView() {
    switch (type_data) {
      case 2:
        return <EmptyPersonalBoard />;
      default:
        if (!isNil(groupID)) {
          return <EmptyWorkingBoard groupID={groupID} projects={projects} />;
        } else return <EmptyWorkingGroup />;
    }
  }

  return (
    <>
      <Container>
        {projects.loading && <LoadingBox />}
        {size(projects.projects) === 0 &&
          !projects.loading &&
          !isFiltering &&
          renderEmptyView()}
        {(size(projects.projects) > 0 || isFiltering) && !projects.loading && (
          <React.Fragment>
            <HeaderTableAllGroup
              currentGroup={currentGroup}
              expand={expand}
              onExpand={handleExpand}
              typeData={type_data}
              onOpenCreateModal={(evt) => handleOpenModal("CREATE")}
            />
            <CustomTable
              isCustomHeader
              customHeaderTable={() => <div />}
              options={{
                // title: () => (
                //   <div style={{ display: "flex", alignItems: "center" }}>
                //     <TitleTable
                //       currentGroup={currentGroup}
                //       expand={expand}
                //       onExpand={handleExpand}
                //       typeData={type_data}
                //     />
                //   </div>
                // ),
                // subTitle: "",
                // subActions: [
                //   {
                //     label: filters[filterType].title,
                //     iconPath: mdiFilterOutline,
                //     onClick: evt => setFilterAnchor(evt.currentTarget)
                //   },
                //   {
                //     label: t("DMH.VIEW.PGP.RIGHT.ALL.DOWN"),
                //     iconPath: mdiDownload,
                //     onClick: evt => setDownloadAnchor(evt.currentTarget)
                //   },
                //   {
                //     label: times[timeType].title,
                //     iconPath: mdiCalendar,
                //     onClick: evt => setTimeAnchor(evt.currentTarget)
                //   }
                // ],
                // mainAction:
                //   type_data !== 2
                //     ? {
                //         label: t("DMH.VIEW.PGP.RIGHT.ALL.ADD"),
                //         onClick: (evt) => handleOpenModal("CREATE"),
                //       }
                //     : type_data === 2
                //     ? {
                //         label: `+ ${t("LABEL_ADD_TABLE")}`,
                //         onClick: () => handleOpenModal("ADD_PERSONAL_BOARD"),
                //       }
                //     : null,
                // expand: {
                //   bool: expand,
                //   toggleExpand: () => handleExpand(!expand),
                // },
                // moreMenu: [
                //   {
                //     label: filters[filterType].title,
                //     iconPath: mdiFilterOutline,
                //     onClick: () => setFilterAnchor(true),
                //   },
                //   {
                //     label: t("DMH.VIEW.PGP.RIGHT.ALL.DOWN"),
                //     iconPath: mdiDownload,
                //     onClick: () => setDownloadAnchor(true),
                //   },
                //   {
                //     label: times[timeType].title,
                //     iconPath: mdiCalendar,
                //     onClick: () => setTimeAnchor(true),
                //   },
                //   {
                //     iconPath: mdiDeleteOutline,
                //     label: t("DMH.VIEW.PGP.RIGHT.ALL.TRASH"),
                //     onClick: () => history.push(`${Routes.PROJECTS}/deleted`),
                //   },
                // ],
                // grouped: {
                //   bool: false,
                // },
                draggable: {
                  bool: true,
                  onDragEnd: (result) => {
                    const { source, destination, draggableId } = result;
                    if (!destination) return;
                    if (
                      destination.droppableId === source.droppableId &&
                      destination.index === source.index
                    )
                      return;
                    let sortData = [...projects.projects];
                    const indexes = sortData.map((data) =>
                      get(data, "sort_index")
                    );
                    let removed = remove(sortData, { id: draggableId });
                    sortData = [
                      ...slice(sortData, 0, destination.index),
                      ...removed,
                      ...slice(sortData, destination.index),
                    ].map((data, index) => ({
                      ...data,
                      sort_index: indexes[index],
                    }));
                    handleSortProject(sortData);
                  },
                },
                loading: {
                  bool: projects.loading,
                  component: () => <LoadingBox />,
                },
                row: {
                  id: "id",
                },
                noData: {
                  bool: projects.projectGroupsCount === 0,
                  subtitle:
                    projects.projectGroupsCount === 0
                      ? t("DMH.VIEW.PGP.RIGHT.ALL.NO_DATA.NO_PROJECT")
                      : t("DMH.VIEW.PGP.RIGHT.ALL.NO_DATA.NO_TASK"),
                },
              }}
              columns={[
                {
                  label: () => null,
                  field: (row) => {
                    switch (get(row, "work_type")) {
                      case WORKPLACE_TYPES.JOB:
                        return (
                          <abbr title={t("IDS_WP_JOB")}>
                            <img
                              src={images.check_64}
                              alt={"work type icon"}
                              width={30}
                              height={30}
                              style={{ padding: "15px 10px 7px 3px" }}
                            />
                          </abbr>
                        );
                      case WORKPLACE_TYPES.PROJECT:
                        return (
                          <abbr title={t("IDS_WP_PROJECT")}>
                            <img
                              src={images.speed_64}
                              alt={"work type icon"}
                              width={30}
                              height={30}
                              style={{ padding: "15px 10px 7px 3px" }}
                            />
                          </abbr>
                        );
                      case WORKPLACE_TYPES.PROCESS:
                        return (
                          <abbr title={t("IDS_WP_PROCESS")}>
                            <img
                              src={images.workfollow_64}
                              alt={"work type icon"}
                              width={30}
                              height={30}
                              style={{ padding: "15px 10px 7px 3px" }}
                            />
                          </abbr>
                        );
                      default:
                        return;
                    }
                  },
                  align: "left",
                  width: "3%",
                },
                {
                  label: t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.NAME"),
                  field: (row) => (
                    <LinkSpan
                      onClick={(evt) =>
                        history.push(`${get(row, "url_redirect", "#")}`)
                      }
                      className={"view_ProjectGroup_Table_All_title_bold"}
                    >
                      {get(row, "name", "")}
                    </LinkSpan>
                  ),
                  sort: (evt) => handleSortType("name"),
                  align: "left",
                  width: "18%",
                },
                {
                  label: t("IDS_WP_GROUP"),
                  field: (row) => (
                    <div
                      title={get(row, "project_group.name")}
                      className="MuiAvatar-root"
                      style={{
                        width: "25px",
                        height: "25px",
                        margin: "0px auto",
                        padding: "0px 5px",
                      }}
                    >
                      <img
                        className="MuiAvatar-img"
                        style={{ borderRadius: "50%" }}
                        src={get(row, "icon")}
                        alt="project group icon"
                      />
                    </div>
                  ),
                  sort: (evt) => handleSortType("group"),
                  align: "center",
                  width: "10%",
                },
                {
                  label: t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.STATE"),
                  field: (row) => (
                    <StateBox stateCode={get(row, "state_code")}>
                      <div className="project_state_wrapper">
                        <span>&#11044;</span>
                        <span>
                          {get(row, "state_code") === 5
                            ? t("DMH.VIEW.PGP.RIGHT.ALL.HIDE")
                            : get(row, "state_name")}
                        </span>
                      </div>
                      {get(row, "state_code") === 3 &&
                      get(row, "day_expired", 0) !== 0 ? (
                        <small>
                          {t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.DATE", {
                            date: get(row, "day_expired", 0),
                          })}
                        </small>
                      ) : null}
                    </StateBox>
                  ),
                  sort: (evt) => handleSortType("state_code"),
                  align: "left",
                  width: "13%",
                },
                {
                  label: t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.PROGRESS"),
                  field: (row) => (
                    <LightTooltip
                      className={"view_ProjectGroup_Table_All___progress"}
                      placement="top"
                      title={
                        <ChartInfoBox
                          className="view_ProjectGroup_Table_All___tooltip"
                          title={t("DMH.VIEW.PGP.RIGHT.ALL.STATS.TOTAL")}
                          data={[
                            {
                              color: statusTaskColors.waiting,
                              title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.WAITING"),
                              value: get(row, "statistic.waiting", 0),
                            },
                            {
                              color: statusTaskColors.doing,
                              title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.DOING"),
                              value: get(row, "statistic.doing", 0),
                            },
                            {
                              color: statusTaskColors.complete,
                              title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.COMPLETE"),
                              value: get(row, "statistic.complete", 0),
                            },
                            {
                              color: statusTaskColors.expired,
                              title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.EXPIRED"),
                              value: get(row, "statistic.expired", 0),
                            },
                            {
                              color: statusTaskColors.stoped,
                              title: t("DMH.VIEW.PGP.RIGHT.ALL.STATS.STOP"),
                              value: get(row, "statistic.stop", 0),
                            },
                          ]}
                        />
                      }
                    >
                      <TooltipWrapper>
                        <ImprovedSmallProgressBar
                          data={[
                            {
                              color: "#ff9800",
                              value: get(row, "statistic.waiting", 0),
                            },
                            {
                              color: "#03a9f4",
                              value: get(row, "statistic.doing", 0),
                            },
                            {
                              color: "#f44336",
                              value: get(row, "statistic.expired", 0),
                            },
                            {
                              color: "#03c30b",
                              value: get(row, "statistic.complete", 0),
                            },
                            {
                              color: "#607d8b",
                              value: get(row, "statistic.stop", 0),
                            },
                          ]}
                          color={"#05b50c"}
                          percentDone={get(row, "complete", 0)}
                        />
                      </TooltipWrapper>
                    </LightTooltip>
                  ),
                  sort: (evt) => handleSortType("complete"),
                  align: "center",
                  width: "17%",
                },
                {
                  label: t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.DURATION"),
                  field: (row) => (
                    <DateBox>
                      {get(row, "duration") ? (
                        <>
                          <span>
                            {t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.DATE", {
                              date: get(row, "duration"),
                            })}
                          </span>
                          <small>
                            {get(row, "date_start")} - {get(row, "date_end")}
                          </small>
                        </>
                      ) : null}
                    </DateBox>
                  ),
                  sort: (evt) => handleSortType("duration"),
                  align: "left",
                  width: "15%",
                },
                {
                  label: t("DMH.VIEW.PGP.RIGHT.ALL.LABEL.PRIO"),
                  field: (row) => (
                    <CustomBadge
                      color={
                        decodePriorityCode(get(row, "priority_code", 0)).color
                      }
                      background={
                        decodePriorityCode(get(row, "priority_code", 0))
                          .background
                      }
                    >
                      {get(row, "priority_name", "")}
                    </CustomBadge>
                  ),
                  sort: (evt) => handleSortType("priority_code"),
                  align: "center",
                  width: "10%",
                },
                {
                  label: () => (
                    <Icon
                      path={mdiAccount}
                      size={1}
                      color={"rgb(102, 102, 102)"}
                    />
                  ),
                  field: (row) => (
                    <AvatarCircleList
                      users={get(row, "members", []).map((member) => ({
                        name: get(member, "name"),
                        avatar: get(member, "avatar"),
                      }))}
                      display={3}
                    />
                  ),
                  align: "center",
                  width: "10%",
                },
                {
                  label: "",
                  field: (project) =>
                    get(project, "can_update", false) ||
                    get(project, "can_delete", false) ? (
                      <SettingButton
                        handleOpenMenu={(currentTarget) =>
                          doOpenMenu(currentTarget, project)
                        }
                      />
                    ) : null,
                  align: "center",
                  width: "5%",
                },
              ]}
              data={projects.projects}
            />
            <Menu
              id="filter-menu"
              anchorEl={filterAnchor}
              open={Boolean(filterAnchor)}
              onClose={(evt) => setFilterAnchor(null)}
              transformOrigin={{
                vertical: -30,
                horizontal: "right",
              }}
            >
              <Box
                paddingLeft={"18px"}
                fontWeight={500}
                paddingY={"7px"}
                borderBottom={"1px solid #f4f4f4"}
              >
                {t("LABEL_FILTER_WORKING_BOARD")}
              </Box>
              {filters.map((filter, index) => (
                <MenuItem
                  key={index}
                  onClick={(evt) => {
                    handleFilterType(index);
                    setFilterAnchor(null);
                    setIsFiltering(true);
                  }}
                  button={false}
                  className={`${
                    includes(
                      !isArray(filterType) ? [filterType] : filterType,
                      index
                    )
                      ? "view_ProjectGroup_Table_All___menu-item-selected"
                      : "view_ProjectGroup_Table_All___menu-item"
                  }`}
                >
                  {filterType === index && filter.option_type === "radio" && (
                    <MyIcon path={mdiCheckCircle} size={1} />
                  )}
                  {filterType !== index && filter.option_type === "radio" && (
                    <MyIcon path={mdiCheckboxBlankCircleOutline} size={1} />
                  )}
                  {filterType !== index &&
                    filter.option_type === "checkbox" && (
                      <MyIcon path={mdiCheckboxBlankOutline} size={1} />
                    )}
                  {filterType === index &&
                    filter.option_type === "checkbox" && (
                      <MyIcon path={mdiCheckboxMarked} size={1} />
                    )}
                  <span>{filter.title}</span>
                  <span>
                    {filter.image && (
                      <img src={filter.image} width={20} height={20} alt={""} />
                    )}
                    {get(projectSummary, filter.field, 0)}
                  </span>
                </MenuItem>
              ))}
            </Menu>
            <DownloadPopover
              anchorEl={downloadAnchor}
              className="download-popover-project"
              setAnchorEl={setDownloadAnchor}
              fileName="projects"
              data={projects.projects.map((project) => ({
                id: get(project, "id", ""),
                icon: get(project, "icon", ""),
                name: get(project, "name", ""),
                status: get(project, "state_name", ""),
                task_count:
                  get(project, "statistic.waiting", 0) +
                  get(project, "statistic.doing", 0) +
                  get(project, "statistic.expired", 0) +
                  get(project, "statistic.complete", 0) +
                  get(project, "statistic.stop", 0),
                progress: `${get(project, "complete", 0)}%`,
                duration: get(project, "duration")
                  ? `${get(project, "duration")} ngày (${get(
                      project,
                      "date_start"
                    )} - ${get(project, "date_end")})`
                  : "",
                priority: get(project, "priority_name", ""),
                members: join(
                  get(project, "members", []).map((member) =>
                    get(member, "name")
                  ),
                  ","
                ),
              }))}
            />
            <TimeRangePopover
              bgColor={bgColor}
              anchorEl={timeAnchor}
              setAnchorEl={setTimeAnchor}
              className="time-range-popover"
              timeOptionDefault={timeType}
              handleTimeRange={(timeType) => handleTimeType(timeType)}
            />
            <Menu
              id="simple-menu"
              anchorEl={menuAnchor}
              keepMounted
              open={Boolean(menuAnchor)}
              onClose={(evt) => setMenuAnchor(null)}
              transformOrigin={{
                vertical: -30,
                horizontal: "right",
              }}
            >
              {get(curProject, "can_update", false) && (
                <MenuItem
                  onClick={(evt) => {
                    setMenuAnchor(null);
                    handleOpenModal("SETTING", {
                      curProject,
                      canChange: {
                        date: true,
                        copy: true,
                        view: true,
                      },
                    });
                  }}
                >
                  {t("DMH.VIEW.PGP.RIGHT.ALL.SETTING")}
                </MenuItem>
              )}
              {get(curProject, "can_update", false) && (
                <MenuItem
                  onClick={(evt) => {
                    setMenuAnchor(null);
                    handleOpenModal("UPDATE", {
                      curProject,
                    });
                  }}
                >
                  {t("DMH.VIEW.PGP.RIGHT.ALL.EDIT")}
                </MenuItem>
              )}
              {get(curProject, "can_update", false) && (
                <MenuItem
                  onClick={(evt) => {
                    setMenuAnchor(null);
                    handleShowOrHideProject(curProject);
                  }}
                  disabled={showHideDisabled}
                >
                  {showHideDisabled && (
                    <CircularProgress
                      size={16}
                      className="margin-circular"
                      color="white"
                    />
                  )}
                  {get(curProject, "visibility", false)
                    ? t("DMH.VIEW.PGP.RIGHT.ALL.HIDE")
                    : t("DMH.VIEW.PGP.RIGHT.ALL.SHOW")}
                </MenuItem>
              )}
              {get(curProject, "can_delete", false) && (
                <MenuItem
                  onClick={(evt) => {
                    setMenuAnchor(null);
                    handleOpenModal("ALERT", {
                      selectedProject: curProject,
                    });
                  }}
                >
                  {t("DMH.VIEW.PGP.RIGHT.ALL.DEL")}
                </MenuItem>
              )}
            </Menu>
          </React.Fragment>
        )}
      </Container>
    </>
  );
}
export default connect(
  (state) => ({
    projectGroup: get(
      state.projectGroup.listProjectGroup.data,
      "projectGroups",
      []
    ),
  }),
  {}
)(AllProjectTable);
