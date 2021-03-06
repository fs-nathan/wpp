import { ListItemText } from "@material-ui/core";
import { mdiChevronLeft, mdiPlus } from "@mdi/js";
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import { Primary, StyledList, StyledListItem } from "components/CustomList";
import LeftSideContainer from "components/LeftSideContainer";
import LoadingBox from "components/LoadingBox";
import SearchInput from "components/SearchInput";
import { Routes } from "constants/routes";
import { get } from "lodash";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";
import "./style.scss";

const Banner = ({ className = "", ...props }) => (
    <div
        className={`view_WeeklyCalendarLeftPart_List___banner ${className}`}
        {...props}
    />
);

function CalendarWeeklyLeftPartPresenter({
    calendars,
    handleOpenModal,
    handleSearchPattern,
    searchPattern,
    havePermission,
}) {
    const { t } = useTranslation();
    const history = useHistory();
    const params = useParams();

    return (
        <React.Fragment>
            <LeftSideContainer
                title={t("IDS_WP_WEEKLY_CALENDAR")}
                leftAction={{
                    iconPath: mdiChevronLeft,
                    onClick: () => history.push(Routes.CALENDAR),
                    tooltip: t("IDS_WP_BACK"),
                }}
                rightAction={{
                    iconPath: mdiPlus,
                    onClick: (evt) => handleOpenModal("CREATE"),
                    tooltip: t("views.calendar_page.left_part.create"),
                }}
            >
                <Banner>
                    <SearchInput
                        fullWidth
                        placeholder={t("IDS_WP_INPUT_SEARCH")}
                        value={searchPattern}
                        onChange={(evt) =>
                            handleSearchPattern(evt.currentTarget.value)
                        }
                    />
                </Banner>
                {calendars.loading ? (
                    <LoadingBox />
                ) : (
                    <StyledList className="week-schedule-left">
                        {calendars.data.map((item, index) => (
                            <React.Fragment key={index}>
                                <StyledListItem
                                    to={Routes.CALENDAR_WEEKLY.replace(
                                        ":year/:schedule_id/:from",
                                        `${get(item, "year", "")}/${get(
                                            item,
                                            "id",
                                            ""
                                        )}`
                                    )}
                                    component={Link}
                                    className={`${
                                        params.schedule_id ==
                                        get(item, "id", "")
                                            ? "item-actived"
                                            : ""
                                    }`}
                                >
                                    <InsertInvitationIcon
                                        className="view_WeeklyCalendarLeftPart_List_iconLeft"
                                        color={
                                            item.color || "rgba(0, 0, 0, 0.54)"
                                        }
                                    />
                                    <ListItemText
                                        primary={
                                            <>
                                                <Primary
                                                    className={`title-setting-item original-name ${
                                                        item.icon
                                                            ? ""
                                                            : "none-icon"
                                                    }`}
                                                >
                                                    <span>
                                                        {get(item, "name", "")}
                                                    </span>
                                                    {get(
                                                        item,
                                                        "is_curent",
                                                        "false"
                                                    ) && (
                                                        <span className="view_WeeklyCalendarLeftPart_List_presentLabel">
                                                            (
                                                            {t(
                                                                "IDS_WP_PRESENT"
                                                            )}
                                                            )
                                                        </span>
                                                    )}
                                                </Primary>
                                                <Primary
                                                    className={`title-setting-item actual-week-name ${
                                                        item.icon
                                                            ? ""
                                                            : "none-icon"
                                                    }`}
                                                >
                                                    {get(item, "full_label", "")}
                                                </Primary>
                                            </>
                                        }
                                    />
                                </StyledListItem>
                            </React.Fragment>
                        ))}
                    </StyledList>
                )}
            </LeftSideContainer>
        </React.Fragment>
    );
}

export default CalendarWeeklyLeftPartPresenter;
