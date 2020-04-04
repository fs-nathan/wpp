import { Avatar, Box, Checkbox, Chip, Divider } from "@material-ui/core";
import { mdiDragVertical } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createMapPropsFromAttrs } from "views/JobPage/utils";
import AddButton from "./components/AddButton";
import AddCategotyModal from "./components/AddCategotyModal";
import { categoryAttr } from "./contants";
import HomeContext from "./HomeContext";
import {
  categoryListSelector,
  deletePostCategory,
  loadCategoryList,
  loadPostCategoryLogoList
} from "./redux";
import { apiCallStatus } from "./redux/apiCall/types";
import useAsyncTracker from "./redux/apiCall/useAsyncTracker";
const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 0.5em;
  }
`;
const Stack = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:first-child) {
    ${props => {
      switch (true) {
        case props.small:
          return `margin-top: 0.5em`;
        case props.large:
          return `margin-top: 2em`;
        case !!props.space:
          return `margin-top: ${props.space}`;
        default:
          return `margin-top: 1em`;
      }
    }}
  }
`;

const HomeWrap = styled.div`
  padding: 20px;
  font-size: 16px;
  line-height: 1.4;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
const SubTitle = styled.div`
  font-size: 15px;
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
  const [strings, setStrings] = useState([
    "Lịch tuần",
    "Tin nổi bật",
    "Thông kê"
  ]);
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
              categoryAttr.logo
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
        <DragDropContext
          onDragEnd={result => {
            const { destination, source, draggableId } = result;
            if (destination === null) return;
            const newStrings = [...strings];
            newStrings.splice(source.index, 1);
            newStrings.splice(destination.index, 0, draggableId);
            setStrings(newStrings);
          }}
        >
          <Droppable droppableId={"12312321"}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {strings.map((string, index) => (
                  <Draggable key={string} draggableId={string} index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Box display="flex" alignItems="center">
                          <Icon
                            path={mdiDragVertical}
                            size={1}
                            color="#8d8d8d"
                          />
                          <Checkbox color="primary"></Checkbox>
                          <div>{string}</div>
                        </Box>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Stack>
    </HomeWrap>
  );
}

export default () => {
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCategoryList());
    dispatch(loadPostCategoryLogoList());
  }, [dispatch]);

  const categories = useSelector(categoryListSelector);
  return (
    <HomeContext.Provider value={{ categories, setModal }}>
      <Home />
      {modal}
    </HomeContext.Provider>
  );
};
