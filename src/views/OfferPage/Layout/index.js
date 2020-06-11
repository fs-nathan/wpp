import { Box, Button, Drawer } from "@material-ui/core";
import { mdiCalendar, mdiFilterOutline, mdiFullscreen, mdiFullscreenExit } from "@mdi/js";
import { CustomTableContext, CustomTableProvider } from "components/CustomTable";
import HeaderButtonGroup from "components/CustomTable/HeaderButtonGroup";
import React, { useContext, useState } from "react";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useMountedState } from "react-use";
import { TimeRangePopover, useTimes } from "../../../components/CustomPopover";
import OfferModal from '../../JobDetailPage/TabPart/OfferTab/OfferModal';
import { bgColorSelector } from "../../ProjectGroupPage/RightPart/AllProjectTable/selectors";
import QuickViewFilter from "../components/QuickViewFilter";
import { Routes } from '../contants/routes';
import { OfferPageContext } from "../OfferPageContext";
import { createOffer } from '../redux/actions';
import { get } from "../utils";
import "./Layout.css";

const Container = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTable___container ${className}`} {...rest} />
);
const Header = ({ className = "", ...rest }) => (
  <div
    className={`comp_CustomTable___header comp_TaskPage_CustomTable___header ${className}`}
    {...rest}
  />
);
const LeftHeader = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTable___left-header ${className}`} {...rest} />
);
const RightHeader = ({ className = "", ...rest }) => (
  <div className={`comp_CustomTable___right-header ${className}`} {...rest} />
);
const StyledButton = ({ className = "", ...rest }) => (
  <Button className={`comp_CustomTable___button ${className}`} {...rest} />
);

export const TableHeader = () => {
  const { options } = useContext(CustomTableContext);
  return (
    <Box>
      <Box
        {...{
          fontSize: "21px",
          lineHeight: "1",
          fontWeight: "600",
          whiteSpace: "nowrap",
        }}
      >
        {typeof get(options, "title") === "function"
          ? options.title()
          : get(options, "title", "")}
      </Box>
      <RightHeader>
        <HeaderButtonGroup />
        {get(options, "mainAction") && (
          <StyledButton
            size="small"
            onClick={get(options, "mainAction.onClick", () => null)}
          >
            {get(options, "mainAction.label", "")}
          </StyledButton>
        )}
      </RightHeader>
    </Box>
  );
};
export function CustomTableLayout({ children }) {
  const { options, bgColor } = React.useContext(CustomTableContext);
  return (
    <Container>
      <Header>
        <LeftHeader>
          <div>
            {typeof get(options, "title") === "function"
              ? options.title()
              : get(options, "title", "")}
          </div>
          {get(options, "subTitle") ? (
            <span>
              {typeof get(options, "subTitle") === "function"
                ? options.subTitle()
                : get(options, "subTitle", "")}
            </span>
          ) : null}
        </LeftHeader>
        <RightHeader>
          <HeaderButtonGroup />
          {get(options, "mainAction") && (
            <StyledButton
              className="comp_PrimaryHeaderButton"
              style={{
                backgroundColor:
                  get(options, "mainAction.color") || bgColor.color,
              }}
              onClick={get(options, "mainAction.onClick", () => null)}
            >
              {get(options, "mainAction.label", "")}
            </StyledButton>
          )}
        </RightHeader>
      </Header>
      {children}
    </Container>
  );
}
export function LayoutStateLess({ open, quickTask, children, setQuickTask }) {
  return (
    <div className="comp_JobPageLayoutWrapper">
      <div className="comp_JobPageLayout__content">
        <CustomTableLayout>{children}</CustomTableLayout>
      </div>

      <Drawer
        className="comp_JobPageLayout__drawer"
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: "comp_JobPageLayout__drawerPaper",
        }}
        onClose={() => setQuickTask(undefined)}
      >
        {open && quickTask}
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bgColor: bgColorSelector(state),
  };
};

export default connect(mapStateToProps)(({ bgColor, children, ...props }) => {
  const { t } = useTranslation();
  const isMounted = useMountedState();
  const {
    timeAnchor,
    setTimeAnchor,
    quickTask,
    setQuickTask,
    timeFilterTypeOfferOverview,
    timeFilterTypeOfferByGroup,
    timeFilterTypeOfferByProject,
    timeFilterTypeOfferByDepartment,
    setTimeType,
    setTimeRange,
    expand,
    handleExpand,
    keyword,
    setkeyword,
  } = useContext(OfferPageContext);

  const times = useTimes();
  const open = !!quickTask;
  const [openModalOffer, setOpenModalOffer] = useState(false);
  const [haveTimePopper, setHaveTimePopper] = useState(true);
  const [haveFilter, setHaveFilter] = useState(true);
  const [haveSearchBox, setHaveSearchBox] = useState(true);
  const { location: { pathname } } = useHistory();
  const [timeFilterType, setTimeFilterType] = useState(1);

  React.useEffect(() => {
    if (isMounted) {
      if (pathname.includes("/recently")) {
        setHaveTimePopper(false);
      } else if (pathname === Routes.OVERVIEW) {
        setHaveFilter(false);
        setHaveSearchBox(false);
        setTimeFilterType(timeFilterTypeOfferOverview.timeType);
      } else if (pathname.includes(Routes.OFFERBYGROUP)) {
        setTimeFilterType(timeFilterTypeOfferByGroup.timeType);
      } else if (pathname.includes(Routes.OFFERBYPROJECT)) {
        setTimeFilterType(timeFilterTypeOfferByProject.timeType);
      } else if (pathname.includes(Routes.OFFERBYDEPARTMENT)) {
        setTimeFilterType(timeFilterTypeOfferByDepartment.timeType);
      }
    }
  }, [isMounted, pathname, timeFilterTypeOfferOverview, timeFilterTypeOfferByGroup, timeFilterTypeOfferByProject, timeFilterTypeOfferByDepartment, setTimeFilterType]);

  const options = {
    title: props.title,
    subActions: [
      haveTimePopper ? {
        label: times[timeFilterType].title,
        iconPath: mdiCalendar,
        onClick: (evt) => setTimeAnchor(evt.currentTarget),
      } : null,
      {
        label: t(expand ? "IDS_WP_COLLAPS" : "IDS_WP_EXPAND"),
        iconPath: expand ? mdiFullscreenExit : mdiFullscreen,
        onClick: () => handleExpand(!expand),
      },
      haveFilter ? {
        label: t("IDS_WP_FILTER"),
        iconPath: mdiFilterOutline,
        onClick: () => setQuickTask(<QuickViewFilter />),
      } : null,
    ],
    mainAction: {
      label: t("VIEW_OFFER_LABEL_CREATE_OFFER"),
      onClick: () => setOpenModalOffer(true),
      color: "#fd7e14"
    },
    search: haveSearchBox ? {
      patern: keyword,
      onChange: setkeyword,
    } : null,
    row: {
      id: "id",
    },
  };

  return (
    <CustomTableProvider
      value={{
        options: options,
        bgColor,
      }}
    >
      <>
        <LayoutStateLess
          {...{
            open,
            quickTask,
            options,
            setQuickTask,
            ...props,
          }}
        >
          <Scrollbars autoHide autoHideTimeout={500}>
            {children}
          </Scrollbars>
        </LayoutStateLess>

        {
          haveTimePopper && (
            <TimeRangePopover
              bgColor={bgColor}
              anchorEl={timeAnchor}
              setAnchorEl={setTimeAnchor}
              timeOptionDefault={timeFilterType}
              handleTimeRange={(timeType, startDate, endDate) => {
                setTimeType(timeType);
                setTimeRange({ startDate, endDate });
              }}
            />
          )
        }

        {openModalOffer && (
          <OfferModal
            isOpen={openModalOffer}
            setOpen={setOpenModalOffer}
            actionCreateOffer={createOffer()}
          />
        )}
      </>
    </CustomTableProvider>
  );
});
