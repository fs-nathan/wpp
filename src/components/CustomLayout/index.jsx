import React, { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

const CustomLayoutContext = createContext();

function CustomLayoutProvider({ children }) {
  const { pathname } = useLocation();
  const [, , view] = pathname.split("/");

  const [openSetting, setOpenSetting] = useState(false);
  const [settingProps, setSettingProps] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [openMemberSetting, setOpenMemberSetting] = React.useState(false);
  const [openMemberSettingModal, setOpenMemberSettingModal] = useState(false);
  const [openMemberSettingProps, setOpenMemberSettingProps] = useState({});
  const [openSettingProjectModal, setOpenSettingProjectModal] = useState(false);
  const [openSettingProjectProps, setOpenSettingProjectProps] = useState({});
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openMenuCreate, setOpenMenuCreate] = useState(null);
  const [modalSetting, setModalSetting] = React.useState({
    isOpen: false,
    props: {},
  });
  const [itemLocation, setItemLocation] = React.useState({
    id: "",
    startIndex: 0,
    endIndex: 0,
  });

  const doOpenModalKanban = (type, props) => {
    switch (type) {
      case "MENU_CREATE":
        setOpenMenuCreate(true);
        return;
      case "MEMBER_SETTING": {
        setOpenMemberSettingModal(true);
        setOpenMemberSettingProps(props);
        return;
      }
      case "CALENDAR": {
        setOpenCalendar(true);
        return;
      }
      case "SETTING_PROJECT": {
        setOpenSettingProjectModal(true);
        setOpenSettingProjectProps(props);
        return;
      }
      default:
        return;
    }
  };

  const doOpenModalDashboard = (type, props) => {
    switch (type) {
      case "SETTING":
        setModalSetting({ isOpen: true, props });
        return;
      default:
        return;
    }
  };

  function doOpenModal(type, props) {
    switch (type) {
      case "SETTING_MEMBER":
        setOpenMemberSetting(true);
        return;
      case "CALENDAR":
        setOpenCalendar(true);
        return;
      case "SETTING":
        setOpenSetting(true);
        setSettingProps(props);
        return;
      case "MENU_CREATE":
        setOpenMenuCreate(true);
        setSelectedGroup(props);
        return;
      default:
        return;
    }
  }

  const propsValue = () => {
    switch (view) {
      case "task-kanban":
        return {
          doOpenModal: doOpenModalKanban,
          openMemberSettingModal,
          setOpenMemberSettingModal,
          openMemberSettingProps,
          openSettingProjectModal,
          setOpenSettingProjectModal,
          openSettingProjectProps,
          openCalendar,
          setOpenCalendar,
          openMenuCreate,
          setOpenMenuCreate,
        };
      case "task-gantt":
        return;
      case "task-chat":
        return;
      case "dashboard":
        return {
          doOpenModal: doOpenModalDashboard,
          modalSetting,
          setModalSetting,
        };
      case "report":
        return;
      default:
        return {
          doOpenModal,
          itemLocation,
          setItemLocation,
          openMemberSetting,
          setOpenMemberSetting,
          openCalendar,
          setOpenCalendar,
          openSetting,
          setOpenSetting,
          settingProps,
          openMenuCreate,
          setOpenMenuCreate,
          selectedGroup,
          setSelectedGroup,
        };
    }
  };

  const value = {
    ...propsValue(),
  };

  return (
    <CustomLayoutContext.Provider value={value}>
      {children}
    </CustomLayoutContext.Provider>
  );
}

export { CustomLayoutContext, CustomLayoutProvider };
