import { Box, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { mdiAccount, mdiAlarm, mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import * as images from 'assets';
import CustomAvatar from "components/CustomAvatar";
import { CustomTableLayout, CustomTableProvider } from "components/CustomTable";
import LoadingOverlay from "components/LoadingOverlay";
import { filter, get, isNull } from 'lodash';
import React from 'react';
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import "../styles.scss";

function CalendarRecentlyAlarmPresenter({
  expand, handleExpand, bgColor,
  remindCalendars, handleOpenDetail
}) {

  const { t } = useTranslation();
  const history = useHistory();
  const [searchPattern, setSearchPattern] = React.useState('');
  const [menuAnchor, setMenuAnchor] = React.useState(false);
  const [filteredRemind, setFilteredRemind] = React.useState({
    ...remindCalendars,
    loading: true
  });
  const [selectedRemind, setSelectedRemind] = React.useState({
    can_modify: false
  });

  function doOpenMenu(anchorEl, remind) {
    setSelectedRemind(remind);
    setMenuAnchor(anchorEl);
  }

  React.useEffect(() => {
    if (remindCalendars.data.length !== 0) {
      let filtered = [];
      remindCalendars.data.map((data) => {
        let filteredRemind = filter(data.reminds, remind => get(remind, 'content', '').toLowerCase().includes(searchPattern.toLowerCase()));
        if (filteredRemind.length !== 0) {
          let newData = {
            ...data,
            reminds: filteredRemind
          }
          filtered = filtered.concat(newData);
        }
      });

      setFilteredRemind({
        ...remindCalendars,
        data: filtered
      });
    }
  }, [remindCalendars, searchPattern]);

  React.useEffect(() => {
    if (remindCalendars.data.length !== 0) {
      let filtered = [];
      remindCalendars.data.map((data) => {
        if (data.reminds.length !== 0) {
          filtered = filtered.concat(data);
        }
      });

      setFilteredRemind({
        ...remindCalendars,
        data: filtered
      });
    }
  }, [remindCalendars]);

  return (
    <React.Fragment>
      <CustomTableProvider value={{
        options: {
          title: t('views.calendar_page.left_part.recently'),
          search: {
            patern: searchPattern,
            onChange: str => setSearchPattern(str)
          },
          expand: {
            bool: expand,
            toggleExpand: () => handleExpand(!expand)
          }
        },
        bgColor
      }}>
        <CustomTableLayout children={
          <LoadingOverlay
            active={remindCalendars.loading}
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
                      filteredRemind.data.map((item, index) => {
                        return (
                          <Box key={item.id}>
                            <div className={`alarm_celendar_item_MainContainer`}>
                              <div className="alarm_calendar_table_header">
                                <Typography variant={"h5"}>{item.label_string ?? t('IDS_WP_DAY')} ({item.label_date})</Typography>
                              </div>
                              {
                                item.reminds.map((remind) => {
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
                                            <div className="main_content_top">
                                              <div
                                                className="main_content_top_content"
                                                onClick={() => handleOpenDetail(remind)}
                                              >
                                                {remind.content}
                                              </div>
                                              <div className="calendar_item_badge calendar_item_badge_bg">
                                                <span className="calendar_item_badge_primary">{t('LABEL_REMIND_PROJECT')}</span>
                                                <span className="calendar_item_badge_secondary">{t('LABEL_REMIND_FRIEND')}</span>
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
              {filteredRemind.data.length === 0 && !remindCalendars.loading && (
                <div className="views_Calendar_Alarm_No_Data_Container">
                  <img
                    src={images.no_data}
                    alt="no-data"
                    width="400px"
                  />
                  <span style={{ color: `${bgColor.color}` }} className="title">{t('views.calendar_page.right_part.no_data')}</span>
                  <span className="description">{t('views.calendar_page.right_part.no_data_description_alarm')}</span>
                </div>
              )}
            </Scrollbars>
          </LoadingOverlay>
        } />
      </CustomTableProvider>
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
          key={"view_task"}
          onClick={() => history.push(selectedRemind.url_redirect)}
        >
          {t("views.calendar_page.right_part.view_task")}
        </MenuItem>
        {
          selectedRemind.can_modify && (
            <MenuItem key={"edit_remind"}>
              {t("views.calendar_page.right_part.edit")}
            </MenuItem>,
            <MenuItem key={"delete_remind"}>
              {t("views.calendar_page.right_part.delete")}
            </MenuItem>
          )
        }
      </Menu>
    </React.Fragment>
  )
}

export default CalendarRecentlyAlarmPresenter;