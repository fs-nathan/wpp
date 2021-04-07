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
import {forEach, get} from "lodash";
import {WORKPLACE_TYPES} from "../../../constants/constants";
import {SUMMARY_PROJECT} from "../redux/types";

const LeftSetting = props => {
  const history = useHistory();
  const { t } = useTranslation();
  const { pathname } = props.location;
  const { handleOnDraggEnd } = useContext(OfferPageContext);
  const colors = useSelector(state => state.setting.colors);
  const bgColor = colors.find(item => item.selected === true);
  const summaryProject = useSelector(state => state.offerPage[SUMMARY_PROJECT]);
  const [workingTopic, setWorkingTopic] = React.useState([
    { type: t("VIEW_OFFER_LABEL_ALL"), value: -1, count: 0},
    { type: t("IDS_WP_TOPICS"), value: 0, count: 0},
    { type: t("IDS_WP_PROJECT"), value: 1, count: 0},
    { type: t("IDS_WP_PROCESS"), value: 2, count: 0},
  ]);
  const [filterTopicType, setFilterTopicType] = React.useState(-1);

  const checkBeforeShowLeftIcon = () => {
    const validPathname = [Routes.OVERVIEW, Routes.RECENTLY]
    if (validPathname.includes(pathname)) {
      return false
    }
    return true
  }

  const checkBeforeShowRightIcon = () => {
    return checkUserIsInOfferGroupRoutes(window.location.pathname)
  }

  React.useEffect(() => {
    if(summaryProject.projects) {
      let projects = [];
      forEach(summaryProject.projects, (item) => {
        projects = projects.concat(get(item, 'projects', []));
      });
      let _workingTopics = [...workingTopic];
      _workingTopics[0].count = projects.length;
      _workingTopics[1].count = 0;
      _workingTopics[2].count = 0;
      _workingTopics[3].count = 0;

      forEach(projects, (project) => {
        switch (get(project, 'work_type')) {
          case WORKPLACE_TYPES.JOB:
            _workingTopics[1].count += 1;
            break;
          case WORKPLACE_TYPES.PROJECT:
            _workingTopics[2].count += 1;
            break;
          case WORKPLACE_TYPES.PROCESS:
            _workingTopics[3].count += 1;
            break;
          default:
            break;
        }
      });
      setWorkingTopic(_workingTopics);
    }
  }, [summaryProject]);

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
      leftAction={checkBeforeShowLeftIcon() ? {
        iconPath: mdiChevronLeft,
        tooltip: t("IDS_WP_BACK"),
        onClick: () => history.push(Routes.OVERVIEW)
      } : {}}
      rightAction={checkBeforeShowRightIcon() ? {
        iconPath: mdiPlus,
        onClick: () => props.setOpenModalOfferByGroup(true)
      } : {}}

    >
      {
        props.hasFilterByCategory && (
            <div className={"leftSettings-filterByCategory-container"}>
                {workingTopic.map((topic,index) => (
                    <ColorChip
                        key={index}
                        label={`${topic.type} (${topic.count})`}
                        onClick={() => {
                          props.handleFilterByCategory(topic.value);
                          setFilterTopicType(topic.value);
                        }}
                        size="small"
                        color={filterTopicType === topic.value ? 'light-blue' : 'white'}
                        style={{ background: filterTopicType === topic.value && bgColor.color }}
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
