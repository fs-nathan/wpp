import { getListStickersRequest, openShareFileModal } from "actions/chat/chat";
import { actionFetchGroupDetail } from "actions/setting/setting";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import StickyBox from "react-sticky-box";
import ShareDocumentModal from "views/DocumentPage/TablePart/DocumentComponent/ShareDocumentModal";
import ModalImage from "views/JobDetailPage/ModalImage";
import { createMapPropsFromAttrs } from "views/JobPage/utils";
import TasksScrollbar from "views/SettingGroupPage/GroupPermissionSettings/components/TasksScrollbar";
import { Space } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Space";
import { loadCategoryList } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux";
import ScrollTopLocationChange from "./components/ScrollTopLocationChange";
import { groupDetailAttrs } from "./contant/attrs";
import { GroupDetailProvider } from "./GroupDetailContext";
import Left from "./Left";
import Logo from "./Logo";
import Middle from "./Middle";
import Right from "./Right";
import "./style.css";
function HomePage({ groupDetail }) {
  const [
    id,
    name,
    code,
    description,
    sologan,
    address,
    website,
    phone,
    email,
    number_member,
    logo,
    cover,
  ] = createMapPropsFromAttrs([
    groupDetailAttrs.id,
    groupDetailAttrs.name,
    groupDetailAttrs.code,
    groupDetailAttrs.description,
    groupDetailAttrs.sologan,
    groupDetailAttrs.address,
    groupDetailAttrs.website,
    groupDetailAttrs.phone,
    groupDetailAttrs.email,
    groupDetailAttrs.number_member,
    groupDetailAttrs.logo,
    groupDetailAttrs.cover,
  ])(groupDetail);

  return (
    <GroupDetailProvider
      value={{
        id,
        name,
        code,
        description,
        sologan,
        address,
        website,
        phone,
        email,
        number_member,
        logo,
        cover,
      }}
    >
      <TasksScrollbar>
        <ScrollTopLocationChange />
        <div className="views_HomePage___wrapper">
          <div className="views_HomePage___container">
            <StickyBox
              className="views_HomePage___left"
              offsetTop={20}
              offsetBottom={20}
            >
              <Left />
              <Space height="50px" />
            </StickyBox>

            <div className="views_HomePage___logo">
              <Logo />
            </div>
            <div className="views_HomePage___middle">
              <Middle />
            </div>
            <StickyBox offsetTop={-300} className="views_HomePage___right">
              <Right />
              <Space height="100px" />
            </StickyBox>
          </div>
        </div>
        <ModalImage />
      </TasksScrollbar>
    </GroupDetailProvider>
  );
}

export default connect((state) => ({
  groupDetail: state.setting.groupDetail,
}))((props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCategoryList());
  }, [dispatch]);
  useEffect(() => {}, [location]);

  useEffect(() => {
    dispatch(actionFetchGroupDetail());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getListStickersRequest());
  }, [dispatch]);
  const item = useSelector((state) => state.chat.item);
  const users_shared = item ? item.users_shared || [] : [];
  const shareItem = { ...item, users_shared };
  const isOpenShareFileModal = useSelector(
    (state) => state.chat.isOpenShareFileModal
  );
  function onCloseShare() {
    dispatch(openShareFileModal(false));
  }
  if (!props.groupDetail.id) return null;
  return (
    <>
      <HomePage {...props} />
      {isOpenShareFileModal && (
        <ShareDocumentModal onClose={onCloseShare} item={shareItem} />
      )}
    </>
  );
});
