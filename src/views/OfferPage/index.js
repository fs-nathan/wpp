import { mdiEmailCheck, mdiEmailVariant, mdiViewDashboard } from "@mdi/js";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from 'react-router-dom';
import { usePrevious } from 'react-use';
import CustomModal from '../../components/CustomModal';
import { useTimes } from "../../components/CustomPopover";
import LoadingBox from "../../components/LoadingBox";
import TwoColumnsLayout from "../../components/TwoColumnsLayout";
import { apiService } from '../../constants/axiosInstance';
import { useLocalStorage } from "../../hooks";
import { labels } from "./contants/attrs";
import {
  TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW,
  TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW,
  TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW,
} from './contants/localStorage';
import { Routes } from "./contants/routes";
import { useMultipleSelect } from "./hooks/useMultipleSelect";
import "./LeftPart_new/LeftSetting.css";
import TabList from "./LeftPart_new/TabList";
import { OfferPageContext } from "./OfferPageContext";
import { deleteOffer, loadDetailOffer, loadTaskPage } from './redux/actions';
import routes from "./routes";
import { get } from "./utils";
import {
  getDeleteOfferConfirmModalCancelBtn,
  getDeleteOfferConfirmModalConfirmBtn,
  getDeleteOfferConfirmModalMsg,
  getDeleteOfferConfirmModalTitle,
} from './utils/i18nSelectors';
import Notifier from "./utils/notifer";
import { formatTime } from "./utils/time";
import { checkUserIsInOfferDepartmentRoutes, checkUserIsInOfferGroupRoutes, checkUserIsInOfferProjectRoutes } from "./utils/validate";
import DetailOfferModal from './views/DetailOffer/DetailOfferModal';
import { getDetailOffer, getDetailOfferLoadingState } from './views/DetailOffer/selector';
import { getDepartmentGroupByKeyword } from "./views/OfferByDepartment/selector";
import { getSummaryByGroupByKeyword } from "./views/OfferByGroup/selector";
import { getSummaryByProjectAndKeyword } from "./views/OfferByProject/selector";
import './styles.scss';

const { Provider } = OfferPageContext;
const filterConfig = [
  {
    title: "LỌC THEO VAI TRÒ",
    subTitle: "Chọn/bỏ chọn trạng thái để lọc đề xuất",
    optionEntities: {
      you_offer: {
        label: "Bạn đề xuất",
        value: "you_offer"
      },
      you_monitor: {
        label: "Bạn giám sát",
        value: "you_monitor"
      },
      you_handle: {
        label: "Bạn phê duyệt",
        value: "you_handle"
      }
    },
    orders: ["you_offer", "you_monitor", "you_handle"]
  },
  {
    title: "LỌC THEO MỨC ĐỘ ƯU TIÊN",
    subTitle: "Chọn/bỏ chọn mức độ ưu tiên để lọc đề xuất",
    optionEntities: {
      normal: {
        label: "Bình thường",
        value: "normal"
      },
      urgent: {
        label: "Gấp",
        value: "low"
      },
      very_urgent: {
        label: "Rất gấp",
        value: "very_urgent"
      }
    },
    orders: ["normal", "urgent", "very_urgent"]
  },
  {
    title: "LỌC THEO TRẠNG THÁI",
    subTitle: "Chọn/bỏ chọn trạng thái để lọc đề xuất",
    optionEntities: {
      offer_waiting: {
        label: "Đang chờ duyệt",
        value: "offer_waiting"
      },
      offer_approving: {
        label: "Đang duyệt",
        value: "offer_approving"
      },
      offer_accept: {
        label: "Đã duyệt: Đồng ý",
        value: "offer_accept"
      },
      offer_reject: {
        label: "Đã duyệt: Từ chối",
        value: "offer_reject"
      }
    },
    orders: ["offer_waiting", "offer_accept", "offer_reject", "offer_approving"]
  }
];
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
  const { t } = useTranslation();
  const [keyword, setkeyword] = useState("");
  const [title, setTitle] = useState(get(labels, "pageTitle"));
  const [timeFilterTypeOfferByGroup, storeTimeFilterTypeOfferByGroup] = useLocalStorage(
    TIME_FILTER_TYPE_OFFER_BY_GROUP_VIEW,
    {
      timeType: 1,
    }
  );
  const [timeFilterTypeOfferByProject, storeTimeFilterTypeOfferByProject] = useLocalStorage(
    TIME_FILTER_TYPE_OFFER_BY_PROJECT_VIEW,
    {
      timeType: 1,
    }
  );
  const [timeFilterTypeOfferByDepartment, storeTimeFilterTypeOfferByDepartment] = useLocalStorage(
    TIME_FILTER_TYPE_OFFER_BY_DEPARTMENT_VIEW,
    {
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
    const { pathname } = history.location;
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
  const rightIcon = () => {
    return (
      <div className="right-setting-icon">
        <span>N</span>
      </div>
    );
  };
  const listMenu = [
    {
      title: t(labels.overview),
      url: Routes.OVERVIEW,
      color: "#7d99a6",
      icon: mdiViewDashboard
    },
    {
      title: t(labels.recently),
      url: Routes.RECENTLY,
      color: "#7d99a6",
      icon: mdiEmailCheck,
      rightIcon: rightIcon
    },
    {
      title: t(labels.group),
      subtitle: t(labels.offer_by_group),
      url: Routes.OFFERBYGROUP,
      color: "#7d99a6",
      icon: mdiEmailVariant,
      rightIcon: rightIcon
    },
    {
      title: t(labels.project),
      subtitle: t(labels.offer_by_project),
      url: Routes.OFFERBYPROJECT,
      color: "#7d99a6",
      icon: mdiEmailVariant
    },
    {
      title: t(labels.department),
      subtitle: t(labels.offer_by_department),
      url: Routes.OFFERBYDEPARTMENT,
      color: "#7d99a6",
      icon: mdiEmailVariant
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
        <TabList
          filter={filter}
          setOpenModalOfferByGroup={setOpenModalOfferByGroup}
          searchInput={true}
          searchPlaceHolder="Nhập nội dung cần tìm"
          title={title}
          {...{ listMenu: getDepartmentGroupByKeyword(filterTab)(state) }}
        />
      );
    }
    if (checkUserIsInOfferProjectRoutes(window.location.pathname)) {
      return (
        <TabList
          filter={filter}
          searchPlaceHolder="Nhập nội dung cần tìm"
          setOpenModalOfferByGroup={setOpenModalOfferByGroup}
          searchInput={true}
          title={title}
          subMenu={true}
          {...{ listMenu: getSummaryByProjectAndKeyword(filterTab)(state) }}
        />
      )
    }
    if (checkUserIsInOfferGroupRoutes(window.location.pathname)) {
      return (
        <TabList
          filter={filter}
          setOpenModalOfferByGroup={setOpenModalOfferByGroup}
          searchInput={true}
          searchPlaceHolder="Nhập nội dung cần tìm"
          title={title}
          isOfferGroupManageable={isOfferGroupManageable}
          {...{ listMenu: getSummaryByGroupByKeyword(filterTab, isOfferGroupManageable)(state) }}
        />
      );
    }
    return <TabList title={title} {...{ listMenu }} />;
  }, [title, listMenu, filterTab, state]);

  // Get offer details from redux store to show on offer detail modal
  const detailOffer = useSelector(state => getDetailOffer(state));
  const detailOfferLoading = useSelector(state => getDetailOfferLoadingState(state));
  const [isDetailOfferModalOpen, setDetailOfferModalOpen] = useState(false);
  // Current offer detail id to fetch data showing on offer detail modal
  const [currentDetailOfferId, setCurrentDetailOfferId] = useState('');
  useEffect(() => {
    if (currentDetailOfferId && isDetailOfferModalOpen) {
      dispatch(loadDetailOffer({ id: currentDetailOfferId }));
    }
  }, [currentDetailOfferId, isDetailOfferModalOpen]);

  // Delete offer confirm modal
  const [showDeleteOfferConfirmModal, setShowDeleteOfferConfirmModal] = useState(false);
  function onDeleteOffer() {
    dispatch(deleteOffer({ id: currentDetailOfferId }));
  }

  return (
    <TwoColumnsLayout
      leftRenders={[() => renderTabList]}
      rightRender={({ expand, handleExpand, handleSubSlide }) => (
        <Provider
          value={{
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
          }}
        >
          <div>
            <Suspense fallback={<LoadingBox />}>
              <Switch>
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  );
                })}
              </Switch>
              {isDetailOfferModalOpen && (
                <DetailOfferModal
                  open={isDetailOfferModalOpen}
                  setOpen={setDetailOfferModalOpen}
                  loading={detailOfferLoading}
                  {...detailOffer}
                />
              )}
              {showDeleteOfferConfirmModal && (
                <CustomModal
                  className="delete-offer-confirm-modal"
                  open={showDeleteOfferConfirmModal}
                  setOpen={setShowDeleteOfferConfirmModal}
                  height="mini"
                  title={getDeleteOfferConfirmModalTitle(t)}
                  confirmRender={() => getDeleteOfferConfirmModalConfirmBtn(t)}
                  onConfirm={onDeleteOffer}
                  cancleRender={() => getDeleteOfferConfirmModalCancelBtn(t)}
                >
                  {getDeleteOfferConfirmModalMsg(t)}
                </CustomModal>
              )}
            </Suspense>
            <Notifier />
          </div>
        </Provider>
      )}
    />
  );
}

export default OfferPage;
