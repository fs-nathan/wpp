import {mdiEmailCheck, mdiEmailVariant, mdiViewDashboard} from "@mdi/js";
import AlertModal from "components/AlertModal";
import {CustomEventDispose, CustomEventListener} from "constants/events";
import {isNil} from "lodash";
import React, {Suspense, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch, useHistory} from 'react-router-dom';
import {useMountedState} from "react-use";
import {useTimes} from "../../components/CustomPopover";
import LoadingBox from "../../components/LoadingBox";
import TwoColumnsLayout from "../../components/TwoColumnsLayout";
import {apiService} from '../../constants/axiosInstance';
import {defaultFilter} from "./contants/defaultValue";
import {Routes} from "./contants/routes";
import {useMultipleSelect} from "./hooks/useMultipleSelect";
import "./LeftPart_new/LeftSetting.scss";
import TabList from "./LeftPart_new/TabList";
import {OfferPageContext} from "./OfferPageContext";
import {deleteOffer, loadDetailOffer} from './redux/actions';
import {DELETE_APPROVAL_SUCCESS, HANDLE_OFFER_OFFERPAGE, UPDATE_OFFER_SUCCESS} from "./redux/types";
import routes from "./routes";
import './styles.scss';
import {getDeleteOfferConfirmModalMsg} from './utils/i18nSelectors';
import Notifier from "./utils/notifer";
import {
  checkUserIsInOfferDepartmentRoutes,
  checkUserIsInOfferGroupRoutes,
  checkUserIsInOfferProjectRoutes
} from "./utils/validate";
import DetailOfferModal from './views/DetailOffer/DetailOfferModal';
import {getDetailOffer, getDetailOfferLoadingState} from './views/DetailOffer/selector';
import {getDepartmentGroupByKeyword} from "./views/OfferByDepartment/selector";
import {getSummaryByGroupByKeyword} from "./views/OfferByGroup/selector";
import {getSummaryByProjectAndWorkTopic} from "./views/OfferByProject/selector";

const { Provider } = OfferPageContext;

function OfferPage() {
  const { t } = useTranslation();
  const [keyword, setkeyword] = useState("");
  const [title, setTitle] = useState(t("VIEW_OFFER_LABEL_YOUR_OFFER"));
  const [quickTask, setQuickTask] = useState();
  const [filterTab, setFilterTab] = useState("");
  const [filterTopic, setFilterTopic] = useState(-1);
  const state = useSelector(state => state);
  const history = useHistory();
  const [timeAnchor, setTimeAnchor] = React.useState(null);
  const [timeType, setTimeType] = React.useState(1);
  const [scrollBarPosition, setScrollBarPosition] = useState(0);
  const [onDraggEnd, handleOnDraggEnd] = useState({ source: null, distination: null, id: null });

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

  // M??? modal t???o nh??m ????? xu???t
  const [openModalOfferByGroup, setOpenModalOfferByGroup] = useState(false);

  // Filter c??c tab b??n c???t tr??i
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

  // Tr??? tab b??n c???t tr??i
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
            hasFilterByCategory={true}
            handleFilterByCategory={(type) => setFilterTopic(type)}
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
              listMenu: getSummaryByProjectAndWorkTopic(filterTab, filterTopic)(state)
            }
            }
          />
        )
      }
      if (checkUserIsInOfferGroupRoutes(window.location.pathname)) {
        return (
          <TabList
            filter={
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
            draggable={true}
          />
        );
      }
      return <TabList title={title}
        {...{ listMenu }}
      />;
    }
  }, [isMounted, title, listMenu, t, filterTab, state, isOfferGroupManageable]);

  // Get offer details from redux store to show on offer detail modal
  const detailOffer = useSelector(state => getDetailOffer(state));
  const detailOfferLoading = useSelector(state => getDetailOfferLoadingState(state));
  const [isDetailOfferModalOpen, setDetailOfferModalOpen] = useState(false);
  // Current offer detail id to fetch data showing on offer detail modal
  const [currentDetailOfferId, setCurrentDetailOfferId] = useState('');
  useEffect(() => {
    if (currentDetailOfferId && isDetailOfferModalOpen) {
      dispatch(loadDetailOffer({ id: currentDetailOfferId }));
      const refreshOfferModified = () => {
        dispatch(loadDetailOffer({ id: currentDetailOfferId }));
      }
      CustomEventListener(HANDLE_OFFER_OFFERPAGE, refreshOfferModified);
      CustomEventListener(UPDATE_OFFER_SUCCESS, refreshOfferModified);
      CustomEventListener(DELETE_APPROVAL_SUCCESS, refreshOfferModified);
      return () => {
        CustomEventDispose(HANDLE_OFFER_OFFERPAGE, refreshOfferModified);
        CustomEventDispose(DELETE_APPROVAL_SUCCESS, refreshOfferModified);
        CustomEventDispose(UPDATE_OFFER_SUCCESS, refreshOfferModified);
      };
    }
  }, [currentDetailOfferId, dispatch, isDetailOfferModalOpen]);

  // Delete offer confirm modal
  const [showDeleteOfferConfirmModal, setShowDeleteOfferConfirmModal] = useState(false);
  const [additionQuery, setAdditionQuery] = useState(null);

  function onDeleteOffer() {
    dispatch(deleteOffer({ id: currentDetailOfferId }));
  }

  return (
    <TwoColumnsLayout
      leftRenders={[() => (
        <Provider
          value={{
            handleOnDraggEnd, onDraggEnd
          }}
        >
          {renderTabList}
        </Provider>
      )]}
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
            scrollBarPosition, setScrollBarPosition,
            handleOnDraggEnd, onDraggEnd, setFilterTab, setAdditionQuery
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
                    additionQuery={additionQuery ? `task_id=${additionQuery}` : null}
                  />
                )
              }
              {
                showDeleteOfferConfirmModal && (
                  <AlertModal
                    open={showDeleteOfferConfirmModal}
                    setOpen={setShowDeleteOfferConfirmModal}
                    onConfirm={() => {
                      setShowDeleteOfferConfirmModal(false);
                      onDeleteOffer();
                      setDetailOfferModalOpen(false);
                    }}
                    content={getDeleteOfferConfirmModalMsg(t)}
                    manualClose={true}
                    onCancle={() => setShowDeleteOfferConfirmModal(false)}
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