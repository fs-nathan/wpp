import { mdiEmailCheck, mdiEmailVariant, mdiViewDashboard } from "@mdi/js";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from 'react-router-dom';
import CustomModal from '../../components/CustomModal';
import { useTimes } from "../../components/CustomPopover";
import LoadingBox from "../../components/LoadingBox";
import TwoColumnsLayout from "../../components/TwoColumnsLayout";
import { apiService } from '../../constants/axiosInstance';
import { useLocalStorage } from "../../hooks";
import { TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW, TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, TIME_FILTER_TYPE_OFFER_OVERVIEW } from './contants/localStorage';
import { Routes } from "./contants/routes";
import { useMultipleSelect } from "./hooks/useMultipleSelect";
import "./LeftPart_new/LeftSetting.scss";
import TabList from "./LeftPart_new/TabList";
import { OfferPageContext } from "./OfferPageContext";
import { deleteOffer, loadDetailOffer, loadTaskPage } from './redux/actions';
import routes from "./routes";
import './styles.scss';
import { getDeleteOfferConfirmModalCancelBtn, getDeleteOfferConfirmModalConfirmBtn, getDeleteOfferConfirmModalMsg, getDeleteOfferConfirmModalTitle } from './utils/i18nSelectors';
import Notifier from "./utils/notifer";
import { formatTime } from "./utils/time";
import { checkUserIsInOfferDepartmentRoutes, checkUserIsInOfferGroupRoutes, checkUserIsInOfferProjectRoutes } from "./utils/validate";
import DetailOfferModal from './views/DetailOffer/DetailOfferModal';
import { getDetailOffer, getDetailOfferLoadingState } from './views/DetailOffer/selector';
import { getDepartmentGroupByKeyword } from "./views/OfferByDepartment/selector";
import { getSummaryByGroupByKeyword } from "./views/OfferByGroup/selector";
import { getSummaryByProjectAndKeyword } from "./views/OfferByProject/selector";

const {
  Provider
} = OfferPageContext;
export const defaultStatusFilter = {
  offer_waiting: true,
  offer_accept: true,
  offer_reject: true,
  offer_approving: true
};
export const defaultRoleFilter = {
  you_handle: true,
  you_monitor: true,
  you_offer: true
};
export const defaultPriorityFilter = {
  normal: true,
  very_urgent: true,
  urgent: true
};

export const defaultFilter = {
  ...defaultStatusFilter,
  ...defaultPriorityFilter,
  ...defaultRoleFilter
};

function OfferPage(props) {
  const {
    t
  } = useTranslation();
  const [keyword, setkeyword] = useState("");
  const [title, setTitle] = useState(t("VIEW_OFFER_LABEL_YOUR_OFFER"));
  const [timeFilterTypeOfferOverview, storeTimeFilterTypeOfferOverview] = useLocalStorage(
    TIME_FILTER_TYPE_OFFER_OVERVIEW, {
    timeType: 1,
  }
  );
  const [timeFilterTypeOfferByGroup, storeTimeFilterTypeOfferByGroup] = useLocalStorage(
    TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW, {
    timeType: 1,
  }
  );
  const [timeFilterTypeOfferByProject, storeTimeFilterTypeOfferByProject] = useLocalStorage(
    TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW, {
    timeType: 1,
  }
  );
  const [timeFilterTypeOfferByDepartment, storeTimeFilterTypeOfferByDepartment] = useLocalStorage(
    TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW, {
    timeType: 1,
  }
  );
  const [quickTask, setQuickTask] = useState();
  const [filterTab, setFilterTab] = useState("");
  const state = useSelector(state => state);
  const history = useHistory()
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [timeType, setTimeType] = React.useState(1);
  useEffect(() => {
    const {
      pathname
    } = history.location;
    const offerOverviewRouteRegex = new RegExp(Routes.OVERVIEW, 'gi');
    const offerByGroupRouteRegex = new RegExp(Routes.OFFERBYGROUP, 'gi');
    const offerByProjectRouteRegex = new RegExp(Routes.OFFERBYPROJECT, 'gi');
    const offerByDepartmentRouteRegex = new RegExp(Routes.OFFERBYDEPARTMENT, 'gi');
    if (offerByGroupRouteRegex.test(pathname)) {
      storeTimeFilterTypeOfferByGroup({
        ...timeFilterTypeOfferByGroup,
        timeType
      });
    } else if (offerByProjectRouteRegex.test(pathname)) {
      storeTimeFilterTypeOfferByProject({
        ...timeFilterTypeOfferByProject,
        timeType
      });
    } else if (offerByDepartmentRouteRegex.test(pathname)) {
      storeTimeFilterTypeOfferByDepartment({
        ...timeFilterTypeOfferByDepartment,
        timeType
      });
    } else if (offerOverviewRouteRegex.test(pathname)) {
      storeTimeFilterTypeOfferOverview({
        ...timeFilterTypeOfferOverview,
        timeType
      });
    }
  }, [timeType]);

  const times = useTimes();
  const [timeRange, setTimeRange] = React.useState(() => {
    const [startDate, endDate] = times[1].option();
    return {
      startDate,
      endDate
    };
  });
  const [
    statusFilter,
    setstatusFilter,
    handleRemoveStatusFilter
  ] = useMultipleSelect(defaultFilter, true, true);
  const dispatch = useDispatch();
  // reset lại mặc định khi route thay đổi
  useEffect(() => {
    history.listen(() => setFilterTab(''))
  }, [history]);
  useEffect(() => {
    dispatch(
      loadTaskPage({
        timeStart: formatTime(timeRange.startDate),
        timeEnd: formatTime(timeRange.endDate)
      })
    );
  }, [dispatch, timeRange.startDate, timeRange.endDate]);

  const listMenu = [{
    title: t("VIEW_OFFER_LABEL_OVERVIEW_TITLE"),
    url: Routes.OVERVIEW,
    color: "#7d99a6",
    icon: mdiViewDashboard
  },
  {
    title: t("VIEW_OFFER_LABEL_RECENTLY_TITLE"),
    url: Routes.RECENTLY,
    color: "#7d99a6",
    icon: mdiEmailCheck,
  },
  {
    title: t("VIEW_OFFER_LABEL_GROUP_TITLE"),
    subtitle: t("VIEW_OFFER_LABEL_GROUP_SUBTITLE"),
    url: Routes.OFFERBYGROUP,
    color: "#7d99a6",
    icon: mdiEmailVariant,
  },
  {
    title: t("VIEW_OFFER_LABEL_PROJECT_TITLE"),
    subtitle: t("VIEW_OFFER_LABEL_PROJECT_SUBTITLE"),
    url: Routes.OFFERBYPROJECT,
    color: "#7d99a6",
    icon: mdiEmailVariant
  },
  {
    title: t("VIEW_OFFER_LABEL_DEPARTMENT_TITLE"),
    subtitle: t("VIEW_OFFER_LABEL_DEPARTMENT_SUBTITLE"),
    url: Routes.OFFERBYDEPARTMENT,
    color: "#7d99a6",
    icon: mdiEmailVariant
  }
  ];

  const filterConfig = [{
    title: t("VIEW_OFFER_LABEL_FILTER_BY_ROLE"),
    subTitle: t("VIEW_OFFER_LABEL_FILTET_BY_ROLE_SUBTITLE"),
    optionEntities: {
      you_offer: {
        label: t("VIEW_OFFER_LABEL_FILTER_BY_ROLE_1"),
        value: "you_offer"
      },
      you_monitor: {
        label: t("VIEW_OFFER_LABEL_FILTER_BY_ROLE_2"),
        value: "you_monitor"
      },
      you_handle: {
        label: t("VIEW_OFFER_LABEL_FILTER_BY_ROLE_3"),
        value: "you_handle"
      }
    },
    orders: ["you_offer", "you_monitor", "you_handle"]
  },
  {
    title: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL"),
    subTitle: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL_SUBTITLE"),
    optionEntities: {
      normal: {
        label: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL_1"),
        value: "normal"
      },
      urgent: {
        label: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL_2"),
        value: "low"
      },
      very_urgent: {
        label: t("VIEW_OFFER_LABEL_FILTER_BY_PRIORITY_LEVEL_3"),
        value: "very_urgent"
      }
    },
    orders: ["normal", "urgent", "very_urgent"]
  },
  {
    title: t("VIEW_OFFER_LABEL_FILTER_BY_STATUS"),
    subTitle: t("VIEW_OFFER_LABEL_FILTER_BY_STATUS_SUBTITLE"),
    optionEntities: {
      offer_waiting: {
        label: t("VIEW_OFFER_LABEL_FILTER_BY_STATUS_1"),
        value: "offer_waiting"
      },
      offer_approving: {
        label: t("VIEW_OFFER_LABEL_FILTER_BY_STATUS_2"),
        value: "offer_approving"
      },
      offer_accept: {
        label: t("VIEW_OFFER_LABEL_FILTER_BY_STATUS_3"),
        value: "offer_accept"
      },
      offer_reject: {
        label: t("VIEW_OFFER_LABEL_FILTER_BY_STATUS_4"),
        value: "offer_reject"
      }
    },
    orders: ["offer_waiting", "offer_approving", "offer_accept", "offer_reject"]
  }
  ];

  const [pin, setPin] = useState(false);
  const handleClose = () => {
    !pin && setQuickTask(undefined);
  };
  // Mở modal tạo nhóm đề xuất
  const [openModalOfferByGroup, setOpenModalOfferByGroup] = useState(false);

  // Filter các tab bên cột trái
  const filter = value => {
    setFilterTab(value);
  };
  const [isOfferGroupManageable, setIsOfferGroupManageable] = useState(false);
  const fetchIsOfferGroupManageable = async () => {
    const config = {
      url: "/permissions/get-permission-view-offer",
      method: "GET"
    }
    const result = await apiService(config)
    if (result.data && result.data.permissions) {
      setIsOfferGroupManageable(result.data.permissions.manage_offer_group);
    }
  }
  useEffect(() => {
    fetchIsOfferGroupManageable();
  }, [props])
  // Trả tab bên cột trái
  const renderTabList = useMemo(() => {
    if (checkUserIsInOfferDepartmentRoutes(window.location.pathname)) {
      return (
        <TabList filter={
          filter
        }
          setOpenModalOfferByGroup={
            setOpenModalOfferByGroup
          }
          searchInput={
            true
          }
          searchPlaceHolder={t("IDS_WP_INPUT_SEARCH")}
          title={
            title
          } {
          ...{
            listMenu: getDepartmentGroupByKeyword(filterTab)(state)
          }
          }
        />
      );
    }
    if (checkUserIsInOfferProjectRoutes(window.location.pathname)) {
      return (
        <TabList filter={
          filter
        }
          searchPlaceHolder={t("IDS_WP_INPUT_SEARCH")}
          setOpenModalOfferByGroup={
            setOpenModalOfferByGroup
          }
          searchInput={
            true
          }
          title={
            title
          }
          subMenu={
            true
          } {
          ...{
            listMenu: getSummaryByProjectAndKeyword(filterTab)(state)
          }
          }
        />
      )
    }
    if (checkUserIsInOfferGroupRoutes(window.location.pathname)) {
      return (
        <TabList filter={
          filter
        }
          setOpenModalOfferByGroup={
            setOpenModalOfferByGroup
          }
          searchInput={
            true
          }
          searchPlaceHolder={t("IDS_WP_INPUT_SEARCH")}
          title={
            title
          }
          isOfferGroupManageable={
            isOfferGroupManageable
          } {
          ...{
            listMenu: getSummaryByGroupByKeyword(filterTab, isOfferGroupManageable, t)(state)
          }
          }
        />
      );
    }
    return <TabList title={
      title
    } {
      ...{
        listMenu
      }
      }
    />;
  }, [title, listMenu, filterTab, state]);

  // Get offer details from redux store to show on offer detail modal
  const detailOffer = useSelector(state => getDetailOffer(state));
  const detailOfferLoading = useSelector(state => getDetailOfferLoadingState(state));
  const [isDetailOfferModalOpen, setDetailOfferModalOpen] = useState(false);
  // Current offer detail id to fetch data showing on offer detail modal
  const [currentDetailOfferId, setCurrentDetailOfferId] = useState('');
  useEffect(() => {
    if (currentDetailOfferId && isDetailOfferModalOpen) {
      dispatch(loadDetailOffer({
        id: currentDetailOfferId
      }));
    }
  }, [currentDetailOfferId, isDetailOfferModalOpen]);

  // Delete offer confirm modal
  const [showDeleteOfferConfirmModal, setShowDeleteOfferConfirmModal] = useState(false);

  function onDeleteOffer() {
    dispatch(deleteOffer({
      id: currentDetailOfferId
    }));
  }

  return (<TwoColumnsLayout leftRenders={
    [() => renderTabList]
  }
    rightRender={
      ({
        expand,
        handleExpand,
        handleSubSlide
      }) => (
          <Provider value={
            {
              expand,
              setPin,
              handleClose,
              listMenu,
              filterConfig,
              handleExpand,
              quickTask,
              setQuickTask,
              handleSubSlide,
              timeAnchor,
              setTimeAnchor,
              openModalOfferByGroup,
              setOpenModalOfferByGroup,
              timeFilterTypeOfferOverview,
              timeFilterTypeOfferByGroup,
              timeFilterTypeOfferByProject,
              timeFilterTypeOfferByDepartment,
              timeType,
              setTimeType,
              timeRange,
              setTimeRange,
              statusFilter,
              setstatusFilter,
              handleRemoveStatusFilter,
              keyword,
              setkeyword,
              setTitle,
              setDetailOfferModalOpen,
              setCurrentDetailOfferId,
              setShowDeleteOfferConfirmModal,
            }
          } >
            <div>
              <Suspense fallback={
                <LoadingBox />
              }>
                <Switch> {
                  routes.map((route, index) => {
                    return (<
                      Route key={
                        index
                      }
                      path={
                        route.path
                      }
                      exact={
                        route.exact
                      }
                      component={
                        route.component
                      }
                    />
                    );
                  })
                } </Switch> {
                  isDetailOfferModalOpen && (<
                    DetailOfferModal open={
                      isDetailOfferModalOpen
                    }
                    setOpen={
                      setDetailOfferModalOpen
                    }
                    loading={
                      detailOfferLoading
                    } {
                    ...detailOffer
                    }
                  />
                  )
                } {
                  showDeleteOfferConfirmModal && (
                    <CustomModal className="delete-offer-confirm-modal"
                      open={
                        showDeleteOfferConfirmModal
                      }
                      setOpen={
                        setShowDeleteOfferConfirmModal
                      }
                      height="mini"
                      title={
                        getDeleteOfferConfirmModalTitle(t)
                      }
                      confirmRender={
                        () => getDeleteOfferConfirmModalConfirmBtn(t)
                      }
                      onConfirm={
                        onDeleteOffer
                      }
                      cancleRender={
                        () => getDeleteOfferConfirmModalCancelBtn(t)
                      }
                    >
                      {
                        getDeleteOfferConfirmModalMsg(t)
                      }
                    </CustomModal>
                  )
                }
              </Suspense>
              <Notifier />
            </div>
          </Provider>
        )
    }
  />
  );
}

export default OfferPage;