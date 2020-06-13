import { mdiEmailCheck, mdiEmailVariant, mdiViewDashboard } from "@mdi/js";
import AlertModal from "components/AlertModal";
import { CustomEventDispose, CustomEventListener } from "constants/events";
import { get, isNil } from "lodash";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from 'react-router-dom';
import { useMountedState } from "react-use";
import { useTimes } from "../../components/CustomPopover";
import LoadingBox from "../../components/LoadingBox";
import TwoColumnsLayout from "../../components/TwoColumnsLayout";
import { apiService } from '../../constants/axiosInstance';
import { defaultFilter } from "./contants/defaultValue";
import { Routes } from "./contants/routes";
import { useMultipleSelect } from "./hooks/useMultipleSelect";
import "./LeftPart_new/LeftSetting.scss";
import TabList from "./LeftPart_new/TabList";
import { OfferPageContext } from "./OfferPageContext";
import { deleteOffer, loadDetailOffer } from './redux/actions';
import { HANDLE_OFFER_OFFERPAGE, LIST_STATUS_HAVE_NEW_OFFER } from "./redux/types";
import routes from "./routes";
import './styles.scss';
import { getDeleteOfferConfirmModalMsg } from './utils/i18nSelectors';
import Notifier from "./utils/notifer";
import { checkUserIsInOfferDepartmentRoutes, checkUserIsInOfferGroupRoutes, checkUserIsInOfferProjectRoutes } from "./utils/validate";
import DetailOfferModal from './views/DetailOffer/DetailOfferModal';
import { getDetailOffer, getDetailOfferLoadingState } from './views/DetailOffer/selector';
import { getDepartmentGroupByKeyword } from "./views/OfferByDepartment/selector";
import { getSummaryByGroupByKeyword } from "./views/OfferByGroup/selector";
import { getSummaryByProjectAndKeyword } from "./views/OfferByProject/selector";
const rightIcon = () => {
  return (
    <>
      <div className="right-setting-icon">
        <span>N</span>
      </div>
    </>
  );
};

const { Provider } = OfferPageContext;

function OfferPage() {
  const { t } = useTranslation();
  const [keyword, setkeyword] = useState("");
  const [title, setTitle] = useState(t("VIEW_OFFER_LABEL_YOUR_OFFER"));
  const [quickTask, setQuickTask] = useState();
  const [filterTab, setFilterTab] = useState("");
  const state = useSelector(state => state);
  const history = useHistory();
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [timeType, setTimeType] = React.useState(1);
  const [statusNewOffer, setStatusNewOffer] = useState(false);
  const [scrollBarPosition, setScrollBarPosition] = useState(0);

  const times = useTimes();
  const [timeRange, setTimeRange] = React.useState(() => {
    const [startDate, endDate] = times[timeType].option();
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
  const isMounted = useMountedState();

  useEffect(() => {
    history.listen(() => setFilterTab(''))
  }, [history]);

  const listMenu = [
    {
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
      rightIcon: statusNewOffer && rightIcon,
      rightIconVisiableAlways: statusNewOffer
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

  const filterConfig = [
    {
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

  const [isOfferGroupManageable, setIsOfferGroupManageable] = useState(null);

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
    if (isNil(isOfferGroupManageable)) {
      fetchIsOfferGroupManageable();
    } else console.log(isOfferGroupManageable);
  }, [dispatch]);

  // Trả tab bên cột trái
  const renderTabList = useMemo(() => {
    if (isMounted) {
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
              listMenu: getDepartmentGroupByKeyword(filterTab, t)(state)
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
      return <TabList title={title}
        {...{ listMenu }}
      />;
    }
  }, [isMounted, title, listMenu, t, filterTab, state, isOfferGroupManageable]);

  useEffect(() => {
    if (isMounted) {
      setStatusNewOffer(get(state.offerPage[LIST_STATUS_HAVE_NEW_OFFER], 'haveNewOffers', false));
    }
  }, [dispatch, isMounted, state]);

  // Get offer details from redux store to show on offer detail modal
  const detailOffer = useSelector(state => getDetailOffer(state));
  const detailOfferLoading = useSelector(state => getDetailOfferLoadingState(state));
  const [isDetailOfferModalOpen, setDetailOfferModalOpen] = useState(false);
  // Current offer detail id to fetch data showing on offer detail modal
  const [currentDetailOfferId, setCurrentDetailOfferId] = useState('');
  useEffect(() => {
    if (currentDetailOfferId && isDetailOfferModalOpen) {
      dispatch(loadDetailOffer({ id: currentDetailOfferId }));
      const refreshAfterApprove = () => {
        dispatch(loadDetailOffer({ id: currentDetailOfferId }));
      }
      CustomEventListener(HANDLE_OFFER_OFFERPAGE, refreshAfterApprove);
      return () => {
        CustomEventDispose(HANDLE_OFFER_OFFERPAGE, refreshAfterApprove);
      };
    }
  }, [currentDetailOfferId, dispatch, isDetailOfferModalOpen]);

  // Delete offer confirm modal
  const [showDeleteOfferConfirmModal, setShowDeleteOfferConfirmModal] = useState(false);

  function onDeleteOffer() {
    dispatch(deleteOffer({
      id: currentDetailOfferId
    }));
  }

  return (
    <TwoColumnsLayout
      leftRenders={[() => renderTabList]}
      rightRender={({ expand, handleExpand, handleSubSlide }) => (
        <Provider
          value={{
            expand, setPin,
            handleClose, listMenu,
            filterConfig, handleExpand,
            quickTask, setQuickTask,
            handleSubSlide, timeAnchor,
            setTimeAnchor, openModalOfferByGroup,
            setOpenModalOfferByGroup, timeType,
            setTimeType, timeRange,
            setTimeRange, statusFilter,
            setstatusFilter, handleRemoveStatusFilter,
            keyword, setkeyword,
            setTitle, setDetailOfferModalOpen,
            setCurrentDetailOfferId, setShowDeleteOfferConfirmModal,
            scrollBarPosition, setScrollBarPosition
          }
          }>
          <div>
            <Suspense fallback={
              <LoadingBox />
            }>
              <Switch>
                {
                  routes.map((route, index) => {
                    return (
                      <Route key={index} path={route.path} exact={route.exact} component={route.component} />
                    );
                  })
                }
              </Switch>
              {
                isDetailOfferModalOpen && (
                  <DetailOfferModal
                    open={isDetailOfferModalOpen}
                    setOpen={setDetailOfferModalOpen}
                    loading={detailOfferLoading}
                    {...detailOffer}
                  />
                )
              }
              {
                showDeleteOfferConfirmModal && (
                  <AlertModal
                    open={showDeleteOfferConfirmModal}
                    setOpen={setShowDeleteOfferConfirmModal}
                    onConfirm={() => {
                      setDetailOfferModalOpen(false);
                      onDeleteOffer();
                    }}
                    content={getDeleteOfferConfirmModalMsg(t)}
                  />
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