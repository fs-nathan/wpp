import { Avatar, Box, Chip, Divider } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createMapPropsFromAttrs } from "views/JobPage/utils";
import AddButton from "./components/AddButton";
import AddCategotyModal from "./components/AddCategotyModal";
import { ChipGroup } from "./components/ChipGroup";
import { DraggableList } from "./components/DraggableList";
import { Stack } from "./components/Stack";
import { SubTitle } from "./components/SubTitle";
import { Title } from "./components/Title";
import { categoryAttr } from "./contants";
import HomeContext from "./HomeContext";
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
  line-height: 1.4;
`;
const EnchanedChip = ({ id, logo, name }) => {
  const [{ status }, setAsyncAction] = useAsyncTracker();
  const handleDelete = () =>
    setAsyncAction(deletePostCategory({ category_id: id }));
  return (
    <Chip
      disabled={status === apiCallStatus.loading}
      avatar={<Avatar alt={name} src={logo} />}
      label={name}
      onDelete={handleDelete}
    />
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
            const [id, name, logo] = createMapPropsFromAttrs([
              categoryAttr.id,
              categoryAttr.name,
              categoryAttr.logo,
            ])(cate);
            return <EnchanedChip key={id} {...{ id, name, logo }} />;
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
        <DraggableList />
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
