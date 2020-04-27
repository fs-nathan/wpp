import { Box, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { mdiAccount, mdiAlarm, mdiCalendar, mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import * as images from 'assets';
import CustomAvatar from "components/CustomAvatar";
import { TimeRangePopover, useTimes } from 'components/CustomPopover';
import { CustomTableLayout, CustomTableProvider } from "components/CustomTable";
import LoadingOverlay from "components/LoadingOverlay";
import { filter, get } from "lodash";
import moment from "moment";
import React from 'react';
import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from 'react-i18next';
import "../styles.scss";

function CalendarPersonalAlarmPresenter({
  expand, handleExpand, bgColor,
  timeType, handleTimeType, handleTimeRange,
  personalReminds, handleOpenModal, handleDeleteRemind
}) {

  const { t } = useTranslation();
  const times = useTimes();
  const [searchPattern, setSearchPattern] = React.useState('');
  const [menuAnchor, setMenuAnchor] = React.useState();
  const [timeAnchor, setTimeAnchor] = React.useState();
  const [filteredRemind, setFilteredRemind] = React.useState(personalReminds);
  const [selectedRemind, setSelectedRemind] = React.useState();

  function doOpenMenu(anchorEl, remind) {
    setMenuAnchor(anchorEl);
    setSelectedRemind(remind);
  }

  React.useEffect(() => {
    if (personalReminds.data.length !== 0) {
      let filtered = [];
      personalReminds.data.map((data) => {
        let filteredRemind = filter(get(data, "reminds", []), remind => get(remind, 'content', '').toLowerCase().includes(searchPattern.toLowerCase()));
        let newData = {
          ...data,
          reminds: filteredRemind
        }
        filtered = filtered.concat(newData);
      });

      setFilteredRemind({
        ...personalReminds,
        data: filtered
      });
    }
  }, [personalReminds, searchPattern])

  return (
    <React.Fragment>
      <CustomTableProvider value={{
        options: {
          title: t('views.calendar_page.left_part.my_alarm'),
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
            }
          ],
          mainAction: {
            label: t('views.calendar_page.right_part.create_alarm'),
            onClick: evt => handleOpenModal("CREATE")
          }
        },
        bgColor
      }}>
        <CustomTableLayout children={
          <LoadingOverlay
            active={personalReminds.loading}
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
                          <Box key={get(item, "id", "")}>
                            <div className={`alarm_celendar_item_MainContainer`}>
                              <div className="alarm_calendar_table_header">
                                <div style={{ backgroundColor: item.color }} className="mark-color"></div>
                                <Typography variant={"h5"}>{item.name}</Typography>
                                <div className="reminds_count">
                                  <Icon path={mdiAlarm} size={0.7} color="rgba(0,0,0,0.7)" />
                                  {item.reminds.length}
                                </div>
                              </div>
                              {
                                item.reminds.map((remind) => {
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
                                              <div className="calendar_item_badge">
                                                <span className="calendar_item_badge_primary">Dự án</span>
                                                <span className="calendar_item_badge_secondary">Bạn bè</span>
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
                                            onClick={evt => doOpenMenu(remind.can_modifi ? evt.currentTarget : null, remind)}
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
                filteredRemind.data.length === 0 && !personalReminds.loading && (
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
            handleOpenModal("VIEW", selectedRemind);
            setMenuAnchor(null);
          }}
        >
          {t("views.calendar_page.right_part.view_detail")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenModal("EDIT", selectedRemind);
            setMenuAnchor(null);
          }}
        >
          {t("views.calendar_page.right_part.edit")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteRemind(selectedRemind);
            setMenuAnchor(null);
          }}
        >
          {t("views.calendar_page.right_part.delete")}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default CalendarPersonalAlarmPresenter;