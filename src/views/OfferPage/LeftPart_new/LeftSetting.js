import { mdiChevronLeft, mdiPlus } from '@mdi/js';
import { StyledList } from 'components/CustomList';
import LeftSideContainer from "components/LeftSideContainer";
import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from "react-i18next";
import { useHistory, withRouter } from "react-router-dom";
import SearchInput from '../../../components/SearchInput';
import { Routes } from "../contants/routes";
import { OfferPageContext } from '../OfferPageContext';
import { checkUserIsInOfferGroupRoutes } from '../utils/validate';
import "./LeftSetting.scss";
import ListContent from "./listContent";
import ColorChip from "../../../components/ColorChip";
import {useSelector} from "react-redux";

const LeftSetting = props => {
  const history = useHistory();
  const { t } = useTranslation();
  const { pathname } = props.location;
  const { handleOnDraggEnd } = useContext(OfferPageContext);
  const colors = useSelector(state => state.setting.colors);
  const bgColor = colors.find(item => item.selected === true);
  const filterTopicType = 0;
  const workingTopic = [
      t("VIEW_OFFER_LABEL_ALL"),
      t("IDS_WP_PROJECT"),
      t("IDS_WP_PROCESS"),
      t("IDS_WP_PLAN"),
      t("IDS_WP_CAMPAIGN")
  ];
  const checkBeforeShowLeftIcon = () => {
    const validPathname = [Routes.OVERVIEW, Routes.RECENTLY]
    if (validPathname.includes(pathname)) {
      return false
    }
    return true
  }

  const checkBeforeShowRightIcon = () => {
    return props.isOfferGroupManageable && checkUserIsInOfferGroupRoutes(window.location.pathname)
  }

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    handleOnDraggEnd({ source, destination, id: draggableId });
  }

  return (
    <LeftSideContainer
      title={props.title}
      leftAction={checkBeforeShowLeftIcon() && {
        iconPath: mdiChevronLeft,
        tooltip: t("IDS_WP_BACK"),
        onClick: () => history.push(Routes.OVERVIEW)
      }}
      rightAction={checkBeforeShowRightIcon() && {
        iconPath: mdiPlus,
        onClick: () => props.setOpenModalOfferByGroup(true)
      }}

    >
      {
        props.hasFilterByCategory && (
            <div className={"leftSettings-filterByCategory-container"}>
                {workingTopic.map((topic,index) => (
                    <ColorChip
                        key={index}
                        label={topic}
                        onClick={() => {}}
                        size="small"
                        color={filterTopicType === index ? 'light-blue' : 'white'}
                        style={{ background: filterTopicType === index && bgColor.color }}
                    />
                ))}
            </div>
        )
      }
      {
        props.searchInput && (
          <div className="leftSettings-searchInput">
            <SearchInput
              placeholder={props.searchPlaceHolder}
              onChange={(e) => props.filter(e.target.value)}
            />
          </div>
        )
      }
      {
        props.draggable ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'offer-by-group-list'}>
              {provided => (
                <StyledList
                  className="leftSettings-item-disableAutoFocus"
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {<ListContent {...props} />}
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
            <StyledList className="leftSettings-item-disableAutoFocus">
              {<ListContent {...props} />}
            </StyledList>
          )
      }

    </LeftSideContainer>
  );
};

export default withRouter(LeftSetting);
