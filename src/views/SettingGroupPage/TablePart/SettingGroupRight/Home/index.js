import { Avatar, Box, Checkbox, Chip, Divider } from "@material-ui/core";
import { mdiDotsVertical, mdiDragVertical } from "@mdi/js";
import Icon from "@mdi/react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import pluginSettings from "views/HomePage/redux/pluginSettings";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { createMapPropsFromAttrs, get } from "views/JobPage/utils";
import { ItemMenu } from "views/SettingGroupPage/GroupPermissionSettings/components/ItemMenu";
import AddButton from "./components/AddButton";
import AddCategotyModal from "./components/AddCategotyModal";
import { ChipGroup } from "./components/ChipGroup";
import { DraggableList } from "./components/DraggableList";
import EditCategoryModal from "./components/EditCategoryModal";
import { Stack } from "./components/Stack";
import { SubTitle } from "./components/SubTitle";
import { Title } from "./components/Title";
import { categoryAttr } from "./contants";
import HomeContext from "./HomeContext";
import "./index.css";
import {
  categoryListSelector,
  deletePostCategory,
  loadCategoryList,
} from "./redux";
import { apiCallStatus } from "./redux/apiCall/types";
import useAsyncTracker from "./redux/apiCall/useAsyncTracker";
const HomeWrap = styled.div`
  padding: 20px;
  font-size: 16px;
`;
const DragWrap = styled.div`
  line-height: 0;
`;
export const ChipMenu = ({
  menuAnchor,
  options,
  handleActionClick,
  setMenuAnchor,
}) => {
  const handleItemClick = handleActionClick;
  return (
    <ItemMenu
      onItemClick={handleItemClick}
      menuAnchor={menuAnchor}
      options={options}
      onClose={() => setMenuAnchor(null)}
    ></ItemMenu>
  );
};
const EnchanedChip = ({ id, logo, name, short_url }) => {
  const { t } = useTranslation();
  const [{ status }, setAsyncAction] = useAsyncTracker();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setModal } = useContext(HomeContext);

  const handleMenuClick = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);
  const menuOptions = useMemo(() => {
    return [
      { key: "edit", label: t("Sửa") },
      { key: "delete", label: t("Xóa") },
    ];
  }, [t]);
  const handleActionClick = useCallback(
    (key) => {
      switch (key) {
        case "edit":
          setModal(<EditCategoryModal {...{ id, logo, name, short_url }} />);
          break;
        case "delete":
          setAsyncAction(deletePostCategory({ category_id: id }));
          break;
        default:
          break;
      }
    },
    [id, logo, name, setAsyncAction, setModal, short_url]
  );
  return (
    <>
      <Chip
        className="comp_home__chip"
        disabled={status === apiCallStatus.loading}
        avatar={<Avatar alt={name} src={logo} />}
        label={name}
        deleteIcon={<Icon path={mdiDotsVertical} size={1} />}
        onDelete={handleMenuClick}
      />
      <ChipMenu
        menuAnchor={anchorEl}
        handleActionClick={handleActionClick}
        setMenuAnchor={setAnchorEl}
        options={menuOptions}
      />
    </>
  );
};
function Home() {
  const { categories, setModal } = useContext(HomeContext);
  const { t } = useTranslation();
  return (
    <HomeWrap>
      <Stack large className="payment-left">
        <Stack small>
          <Title>{t("Quản lý thể loại đăng tin")}</Title>
          <SubTitle>{t("Thiết lập thể loại đăng tin trên trang chủ")}</SubTitle>
        </Stack>
        <ChipGroup>
          {categories.map((cate, i) => {
            const [id, name, logo, short_url] = createMapPropsFromAttrs([
              categoryAttr.id,
              categoryAttr.name,
              categoryAttr.logo,
              categoryAttr.short_url,
            ])(cate);
            return <EnchanedChip key={id} {...{ id, name, logo, short_url }} />;
          })}
          <Box flexBasis="100%" margin="0px!important" />
          <AddButton
            label={t("Thêm")}
            onClick={() => {
              setModal(<AddCategotyModal />);
            }}
          ></AddButton>
        </ChipGroup>
        <Divider />
        <Stack small>
          <Title>{t("Quản lý plugin trang chủ")}</Title>
          <SubTitle>
            {t("Thiết lập các plugin thể hiện trên trang chủ")}
            <br />
            {t(
              "Checkbox thể hiện/ẩn plugin. Kéo thả để sắp xếp vị trí hiển thị"
            )}
            <br />
          </SubTitle>
        </Stack>
        <PluginSettings />
      </Stack>
    </HomeWrap>
  );
}

export default () => {
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCategoryList());
  }, [dispatch]);

  const categories = useSelector(categoryListSelector);
  return (
    <HomeContext.Provider value={{ categories, setModal }}>
      <Home />
      {modal}
    </HomeContext.Provider>
  );
};
const PluginSettings = () => {
  const STATUS = {
    ON: "ON",
    OFF: "OFF",
  };
  const dispatch = useDispatch();
  const pluginSettingsResponse = useSelector(
    pluginSettings.selectors.pluginSettingsSelector
  );
  const sections = get(pluginSettingsResponse, "data", emptyArray);
  const state = get(pluginSettingsResponse, "state", false);
  useEffect(() => {
    dispatch(pluginSettings.actions.loadPluginSettings());
  }, [dispatch]);
  const updatePloginSettings = (sections = emptyArray) => {
    dispatch(pluginSettings.actions.updatePluginSettings({ sections }));
  };
  if (!state) return null;
  return (
    <DraggableList
      onChange={(orderList = emptyArray) => {
        console.log({ orderList });
        updatePloginSettings(
          sections.map((s, i) => {
            return {
              ...s,
              sort_index: orderList.findIndex((value) => value === s.value),
            };
          })
        );
      }}
      list={sections}
      getId={(item) => item.value}
    >
      {({ name, sort_index, status, value }, bindDraggable, bindDragHandle) =>
        bindDraggable(
          <div>
            <Box display="flex" alignItems="center">
              {bindDragHandle(
                <DragWrap>
                  <Icon path={mdiDragVertical} size={1} color="#8d8d8d" />
                </DragWrap>
              )}
              <Checkbox
                defaultChecked={status === STATUS.ON}
                color="primary"
                onClick={(e) => {
                  console.log(e.target.checked);
                  updatePloginSettings(
                    sections.map((s) => {
                      if (s.value !== value) {
                        return s;
                      }
                      return {
                        value,
                        sort_index,
                        status: e.target.checked ? STATUS.ON : STATUS.OFF,
                      };
                    })
                  );
                }}
              ></Checkbox>
              <div>{name}</div>
            </Box>
          </div>
        )
      }
    </DraggableList>
  );
};
