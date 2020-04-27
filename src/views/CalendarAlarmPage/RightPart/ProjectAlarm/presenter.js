import { Box, Checkbox, Drawer, ExpansionPanel, ExpansionPanelSummary, FormControlLabel, IconButton, List, ListSubheader, Menu, MenuItem, Typography } from "@material-ui/core";
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
import { filter, get, pick, set } from "lodash";
import moment from "moment";
import React from 'react';
import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import "../styles.scss";

function CalendarProjectAlarmPresenter({
  expand, handleExpand, bgColor,
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
  const [selectedCheckBox, setSelectedCheckBox] = React.useState({ dataIdx: 0, stateIdx: 0 });
  const [searchProject, setSearchProject] = React.useState('');
  const [projectHaveRemindSession, setProjectHaveRemindSession] = React.useState({ data: [] });

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
      let checkBoxList = [];
      projectReminds.data.map((data) => {
        if (data.reminds.length !== 0) {
          filtered = filtered.concat(data);
          let arr = Array.from(new Array(data.reminds.length), (val, index) => ({ idx: index, value: false }));
          let checkData = {
            id: data.id,
            states: arr
          }
          checkBoxList = checkBoxList.concat(checkData);
        }
      });

      setFilteredListHaveRemind({
        ...projectReminds,
        data: filtered
      });
      setProjectHaveRemindSession({
        data: filtered
      });
      setRemindCheckBoxList(checkBoxList);
    }
  }, [projectReminds]);

  const handleCheckBoxChange = (state, stateIdx, dataID, dataIdx) => {
    let checkBox = remindCheckBoxList[dataIdx];
    set(checkBox, `states[${stateIdx}].value`, state);
    setRemindCheckBoxList(remindCheckBoxList);
    setSelectedCheckBox({
      dataIdx, stateIdx
    });
  };

  React.useEffect(() => {
    if (filterdListHaveRemind.data.length !== 0) {
      let filtered = [];
      filterdListHaveRemind.data.map((data, idx) => {
        let states = get(remindCheckBoxList[idx], 'states');
        let trueStates = filter(states, state => state.value === true, []);
        if (trueStates.length !== 0) {
          let filteredRemind = Object.values(pick(data.reminds, trueStates.map(item => item.idx)));
          let newData = {
            ...data,
            reminds: filteredRemind
          }
          filtered = filtered.concat(newData);
        }
      });

      if (filtered.length !== 0) {
        setFilteredRemind({
          ...filterdListHaveRemind,
          data: filtered
        });
      } else {
        setFilteredRemind({
          ...filterdListHaveRemind
        });
      }
    }
  }, [filterdListHaveRemind, remindCheckBoxList, selectedCheckBox]);

  React.useEffect(() => {
    let filteredProject = [];
    filteredProject = filter(projectHaveRemindSession.data, project => get(project, 'name', '').toLowerCase().includes(searchProject.toLowerCase()));
    setFilteredListHaveRemind({
      ...filterdListHaveRemind,
      data: filteredProject
    });
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
                                    <Icon path={mdiAlarm} size={0.7} color="rgba(0,0,0,0.7)" />
                                    {Array.isArray(item.reminds) ? item.reminds.length : 0}
                                  </div>
                                </div>
                                {
                                  get(item, "reminds", []).map((remind) => {
                                    return (
                                      <>
                                        <div className="alarm_calendar_item_container">
                                          <div className="alarm_calendar_item_header">
                                            <div className="calendar_item_month">{t('IDS_WP_MONTH')} {moment(item.date).format("MM")}</div>
                                            <div className="calendar_item_day">{moment(item.date).format("DD")}</div>
                                          </div>
                                          <div className="alarm_calendar_item_mainContent">
                                            <div className="alarm_calendar_item_mainContent_content">
                                              <div className="main_conten_top">
                                                {remind.content}
                                                <div className="calendar_item_badge calendar_item_badge_bg">
                                                  <span className="calendar_item_badge_primary">Dự án</span>
                                                  <span className="calendar_item_badge_secondary calendar_item_badge_secondary_bg">Nhắc theo tin độ</span>
                                                  <span className="calendar_item_badge_default">
                                                    <Icon path={mdiAccount} size={0.8} color="#FF9B15" /> {remind.members_assign.length}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="main_content_auther">
                                                <CustomAvatar
                                                  style={{ width: 20, height: 20 }}
                                                  src={remind.user_create_avatar} alt='avatar'
                                                />
                                                <span>{t('IDS_WP_CREATED_AT')}: {remind.created_at}</span>
                                              </div>
                                              <div className="main_content_alarm">
                                                <Icon path={mdiAlarm} size={1} color="rgba(0,0,0,0.7)" />
                                                <span>{t('IDS_WP_REMIND')}: {remind.label_remind_time}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="alarm_calendar_item_control">
                                            <IconButton
                                              key={item.id}
                                              onClick={evt => doOpenMenu(evt.currentTarget, remind)}
                                            >
                                              <Icon path={mdiDotsVertical} size={1} color="rgba(0,0,0,0.7)" />
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
                filterdListHaveRemind.data.length !== 0 &&
                filterdListHaveRemind.data.map((item, index) => {
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
                        <List>
                          <ListSubheader className="views_FilterViewLayout__contentPanel_title">
                            <ColorTypo style={{ color: '#828282', fontWeight: 500 }}>
                              {item.name}
                            </ColorTypo>
                          </ListSubheader>
                        </List>
                      </ExpansionPanelSummary>
                      <MuiExpansionPanelDetails
                        key={`project-remind-muiExpansionPanel-${index}`}
                        className="views_FilterViewLayout__contentPanel_detail"
                      >
                        {
                          item.reminds.map((remind, remindIdx) => {
                            return (
                              <FormControlLabel
                                key={`project-remind-content-checkBox-${index}-${remind.id}`}
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={get(remindCheckBoxList[index], ['states', `${remindIdx}`, 'value'], true)}
                                    onChange={({ target }) => handleCheckBoxChange(target.checked, remindIdx, item.id, index)}
                                    name={`checkBox-${index}-${remind.id}`}
                                    key={`checkBox-${index}-${remind.id}`}
                                  />
                                }
                                label={remind.content}
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