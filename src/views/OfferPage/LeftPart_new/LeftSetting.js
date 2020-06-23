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

const LeftSetting = props => {
  const history = useHistory();
  const { t } = useTranslation();
  const { pathname } = props.location;
  const { handleOnDraggEnd } = useContext(OfferPageContext);
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
