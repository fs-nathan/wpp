import { Box, Checkbox, Drawer, ExpansionPanel, ExpansionPanelSummary, FormControlLabel, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CloseIcon from "@material-ui/icons/Close";
import { mdiAccount, mdiAlarm, mdiCalendar, mdiDotsVertical, mdiFilterOutline, mdiMenuUp } from "@mdi/js";
import Icon from "@mdi/react";
import * as images from 'assets';
import ColorTypo from 'components/ColorTypo';
import CustomAvatar from "components/CustomAvatar";
import { TimeRangePopover, useTimes } from 'components/CustomPopover';
import { CustomTableLayout, CustomTableProvider } from "components/CustomTable";
import LoadingOverlay from "components/LoadingOverlay";
import SearchInput from 'components/SearchInput';
import { filter, get, isNull, map, set } from "lodash";
import React from 'react';
import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import "../styles.scss";

function CalendarProjectAlarmPresenter({
  expand, handleExpand, bgColor, projects,
  timeType, handleTimeType, handleTimeRange,
  filterOpen, setFilterOpen, projectReminds,
  handleOpenDetail
}) {

  const { t } = useTranslation();
  const times = useTimes();
  const history = useHistory();
  const [menuAnchor, setMenuAnchor] = React.useState();
  const [searchPattern, setSearchPattern] = React.useState('');
  const [timeAnchor, setTimeAnchor] = React.useState();
  const [filteredRemind, setFilteredRemind] = React.useState(projectReminds);
  const [filterdListHaveRemind, setFilteredListHaveRemind] = React.useState(projectReminds);
  const [selectedRemind, setSelectedRemind] = React.useState();
  const [remindCheckBoxList, setRemindCheckBoxList] = React.useState([]);
  const [selectedCheckBox, setSelectedCheckBox] = React.useState();
  const [projectHaveRemind, setProjectHaveRemind] = React.useState([]);
  const [searchProject, setSearchProject] = React.useState('');
  const [projectHaveRemindSession, setProjectHaveRemindSession] = React.useState({ data: [] });
  const [projectHaveRemindBeforeSearch, setProjectHaveRemindBeforeSearch] = React.useState([]);

  function doOpenMenu(anchorEl, remind) {
    setMenuAnchor(anchorEl);
    setSelectedRemind(remind);
  }

  React.useEffect(() => {
    if (projectReminds.data.length !== 0) {
      let filtered = [];
      projectReminds.data.map((data) => {
        let filteredRemind = filter(data.reminds, remind => get(remind, 'content', '').toLowerCase().includes(searchPattern.toLowerCase()));
        let newData = {
          ...data,
          reminds: filteredRemind
        }
        filtered = filtered.concat(newData);
      });

      setFilteredRemind({
        ...projectReminds,
        data: filtered
      });
    }
  }, [projectReminds, searchPattern]);

  React.useEffect(() => {
    if (projectReminds.data.length !== 0) {
      let filtered = [];
      projectReminds.data.map((data, index) => {
        if (data.reminds.length !== 0) {
          filtered = filtered.concat(data);
        }
      });
      setFilteredListHaveRemind({
        ...projectReminds,
        data: filtered
      });
      setProjectHaveRemindSession({
        data: filtered
      });
    }
  }, [projectReminds]);

  React.useEffect(() => {
    if (projectReminds.data.length !== 0 && projects.data.length !== 0) {
      let checkBoxList = [];
      let projectIdList = map(projectReminds.data, "id");
      let filtered = [];
      let idx = 0;
      projects.data.map((item) => {
        if (Array.isArray(item.projects) && item.projects.length !== 0) {
          let _projects = filter(item.projects, project => projectIdList.indexOf(project.id) >= 0);
          if (_projects.length !== 0) {
            filtered = filtered.concat({ name: item.name, projects: _projects });
            let checkBox = Array.from(_projects, (v, k) => ({
              idx: k + idx,
              id: v.id,
              state: true
            }));
            idx += _projects.length;
            checkBoxList = checkBoxList.concat(checkBox);
          }
        }
      });
      if (filtered.length !== 0) {
        setProjectHaveRemind(filtered);
        setProjectHaveRemindBeforeSearch(filtered);
        setRemindCheckBoxList(checkBoxList);
      }
    }
  }, [projectReminds, projects]);

  const handleCheckBoxChange = (state, dataID) => {
    let checkBox = filter(remindCheckBoxList, item => item.id === dataID);
    set(checkBox[0], `state`, state);
    remindCheckBoxList[checkBox[0].idx] = checkBox[0];
    setRemindCheckBoxList(remindCheckBoxList);
    setSelectedCheckBox({
      checkBox
    });
  };

  React.useEffect(() => {
    let filtered = [];
    let trueStates = filter(remindCheckBoxList, item => item.state === true, []);
    trueStates.map((item) => {
      let data = filter(projectHaveRemindSession.data, data => data.id === item.id);
      filtered = filtered.concat(data);
    });
    setFilteredRemind({
      ...filterdListHaveRemind,
      data: filtered
    });
  }, [remindCheckBoxList, selectedCheckBox]);

  React.useEffect(() => {
    let filteredProject = [];
    projectHaveRemindBeforeSearch.map((item) => {
      let filtered = filter(item.projects, project => get(project, 'name', '').toLowerCase().includes(searchProject.toLowerCase()));
      if (filtered.length !== 0) {
        filteredProject = filteredProject.concat({
          ...item,
          projects: filtered
        });
      }
    });
    if (filteredProject.length !== 0) setProjectHaveRemind(filteredProject);
    else setProjectHaveRemind(projectHaveRemindBeforeSearch);
  }, [searchProject]);

  return (
    <>
      <React.Fragment>
        <CustomTableProvider value={{
          options: {
            title: t('views.calendar_page.left_part.project_alarm'),
            search: {
              patern: searchPattern,
              onChange: str => setSearchPattern(str)
            },
            expand: {
              bool: expand,
              toggleExpand: () => handleExpand(!expand)
            },
            subActions: [
              {
                label: times[timeType].title,
                iconPath: mdiCalendar,
                onClick: evt => setTimeAnchor(evt.currentTarget)
              },
              {
                label: t('IDS_WP_FILTER'),
                iconPath: mdiFilterOutline,
                onClick: () => setFilterOpen(true)
              }
            ]
          },
          bgColor
        }}>
          <CustomTableLayout children={
            <LoadingOverlay
              active={projectReminds.loading}
              spinner
              fadeSpeed={100}
            >
              <Scrollbars
                autoHide
                autoHideTimeout={500}
              >
                {
                  filteredRemind.data.length !== 0 && (
                    <div className="alarm_calendar_table_container">
                      {
                        get(filteredRemind, "data", []).map((item) => {
                          return (
                            <Box key={get(item, "id", "")}>
                              <div className={`alarm_celendar_item_MainContainer`}>
                                <div className="alarm_calendar_table_header">
                                  <Typography variant={"h5"}>{get(item, "name", "")}</Typography>
                                  <div className="reminds_count">
                                    <Icon path={mdiAlarm} size={0.7} color="#fff" />
                                    {Array.isArray(item.reminds) ? item.reminds.length : 0}
                                  </div>
                                </div>
                                {
                                  get(item, "reminds", []).map((remind) => {
                                    return (
                                      <>
                                        <div className="alarm_calendar_item_container">
                                          <div className="alarm_calendar_item_header">
                                            {
                                              isNull(get(remind, "time_remind_next", null)) && (
                                                <img
                                                  src={images.ic_alarm_complete}
                                                  alt="ic_alarm_complete"
                                                  width="40px"
                                                />
                                              )
                                            }
                                            {
                                              !isNull(get(remind, "time_remind_next", null)) && (
                                                <>
                                                  <div className="calendar_item_month">{t('IDS_WP_MONTH')} {remind.time_remind_next.month}</div>
                                                  <div className="calendar_item_day">{remind.time_remind_next.date}</div>
                                                </>
                                              )
                                            }
                                          </div>
                                          <div className="alarm_calendar_item_mainContent">
                                            <div className="alarm_calendar_item_mainContent_content">
                                              <div className="main_conten_top">
                                                {remind.content}
                                                <div className="calendar_item_badge calendar_item_badge_bg">
                                                  <span className="calendar_item_badge_secondary calendar_item_badge_secondary_bg">{remind.category_name}</span>
                                                  <span className="calendar_item_badge_default">
                                                    <Icon path={mdiAccount} size={0.8} color="#FF9B15" /> {remind.members_assign.length}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="main_content_auther">
                                                <abbr title={remind.user_create_name}>
                                                  <CustomAvatar
                                                    style={{ width: 15, height: 15 }}
                                                    src={remind.user_create_avatar} alt='avatar'
                                                  />
                                                </abbr>
                                                <span>{t('IDS_WP_CREATED_AT')}: {remind.created_at}</span>
                                              </div>
                                              <div className="main_content_alarm">
                                                <Icon path={mdiAlarm} size={0.7} color="rgba(0,0,0,0.7)" />
                                                <span>{remind.label_remind_time}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="alarm_calendar_item_control">
                                            <IconButton
                                              key={item.id}
                                              onClick={evt => doOpenMenu(evt.currentTarget, remind)}
                                            >
                                              <abbr title={t('IDS_WP_MORE')}>
                                                <Icon path={mdiDotsVertical} size={1} color="rgba(0,0,0,0.7)" />
                                              </abbr>
                                            </IconButton>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  })
                                }
                              </div>
                            </Box>
                          )
                        })
                      }
                    </div>
                  )
                }
                {
                  Array.isArray(filteredRemind.data) && filteredRemind.data.length === 0
                  && !projectReminds.loading && (
                    <>
                      <div className="views_Calendar_Alarm_No_Data_Container">
                        <img
                          src={images.no_data}
                          alt="no-data"
                          width="200px"
                        />
                        <span style={{ color: `${bgColor.color}` }} className="title">{t('views.calendar_page.right_part.no_data')}</span>
                        <span className="description">{t('views.calendar_page.right_part.no_data_description_alarm')}</span>
                      </div>
                    </>
                  )
                }
              </Scrollbars>
            </LoadingOverlay>
          } />
        </CustomTableProvider>
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
      </React.Fragment>

      <React.Fragment key={"filterViewDrawer"}>
        <Drawer
          className="views_FilterViewLayout__drawer"
          anchor={'right'}
          variant="persistent"
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          classes={{
            paper: "views_FilterViewLayout__drawerPaper"
          }}
        >
          <Box className="views_FilterViewLayout__header">
            <div className="views_FilterViewLayout__headerLeft">
              <Icon
                className="views_FilterViewLayout__headerIcon"
                path={mdiFilterOutline}
              ></Icon>
              <Box className="views_FilterViewLayout__headerTitle">
                {t("IDS_WP_FILTER")}
              </Box>
            </div>
            <div className="views_FilterViewLayout__headerRight">
              <IconButton onClick={() => setFilterOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </Box>
          <div className={"views_FilterViewLayout__container"}>
            <div className={"views_FilterViewLayout__title"}>
              <div>{t('IDS_WP_FILTER_BY_PROJECT')}</div>
              <div>{t('IDS_WP_FILTER_BY_PROJECT_DESCRIPTION')}</div>
            </div>
            <div className="views_FilterViewLayout__searchBox">
              <SearchInput
                fullWidth
                placeholder={t("IDS_WP_INPUT_SEARCH_PROJECT")}
                value={searchProject}
                onChange={evt => setSearchProject(evt.target.value)}
              />
            </div>
            <Box className="views_FilterViewLayout__contentContainer">
              {
                projectHaveRemind.length !== 0 &&
                projectHaveRemind.map((item, index) => {
                  return (
                    <ExpansionPanel
                      key={`project-remind-key-${index}`}
                      defaultExpanded
                      square={false}
                      className="views_FilterViewLayout__contentPanel"
                    >
                      <ExpansionPanelSummary
                        key={`project-remind-expansionPanel-${index}`}
                        expandIcon={<Icon path={mdiMenuUp} size={1} />}
                        id="panel1bh-header"
                        className="views_FilterViewLayout__contentPanel_Summary"
                      >
                        <ColorTypo style={{ color: '#828282', fontWeight: 500 }}>
                          {item.name}
                        </ColorTypo>
                      </ExpansionPanelSummary>
                      <MuiExpansionPanelDetails
                        key={`project-remind-muiExpansionPanel-${index}`}
                        className="views_FilterViewLayout__contentPanel_detail"
                      >
                        {
                          item.projects.map((project, index) => {
                            return (
                              <FormControlLabel
                                key={`project-checkBox-${index}-${project.id}`}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={filter(remindCheckBoxList, cbx => cbx.id === project.id, [{ state: false }])[0].state}
                                    onChange={({ target }) => handleCheckBoxChange(target.checked, project.id)}
                                    name={`checkBox-${index}-${project.id}`}
                                    key={`checkBox-${index}-${project.id}`}
                                  />
                                }
                                label={project.name}
                              />
                            )
                          })
                        }
                      </MuiExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })
              }
            </Box>
          </div>
        </Drawer>
      </React.Fragment>

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
          onClick={() => {
            history.push(selectedRemind.url_redirect);
            setMenuAnchor(null);
          }}
        >
          {t("views.calendar_page.right_part.view_task")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenDetail(selectedRemind)
            setMenuAnchor(null);
          }}
        >
          {t("views.calendar_page.right_part.view_detail")}
        </MenuItem>
      </Menu>
    </>
  )
}

export default CalendarProjectAlarmPresenter;