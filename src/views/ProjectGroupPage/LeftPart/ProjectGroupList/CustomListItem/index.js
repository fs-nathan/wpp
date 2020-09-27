import {ListItemText} from '@material-ui/core';
import {mdiDragVertical} from '@mdi/js';
import Icon from '@mdi/react';
import {get} from 'lodash';
import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import CustomAvatar from '../../../../../components/CustomAvatar';
import * as images from "assets";
import {Primary, StyledListItem} from '../../../../../components/CustomList';

function CustomListItem({ projectGroup, index, route, canDrag }) {
  const [isHover, setIsHover] = React.useState(false);
  const { t } = useTranslation();

  if (canDrag)
    return (
      <Draggable
        draggableId={get(projectGroup, 'id')}
        index={index}
      >
        {(provided) => (
          <StyledListItem
            component={Link}
            to={`${route}/group/${get(projectGroup, 'id', '')}`}
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <div {...provided.dragHandleProps}>
              <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'} />
            </div>
            <CustomAvatar style={{ height: 50, width: 50, }} src={get(projectGroup, 'icon')} alt='avatar' />
            <ListItemText
              primary={
                <Primary>{get(projectGroup, 'name', '')}</Primary>
              }
              secondary={
                <div className={"view_ProjectGroup_List_statistic"}>
                  <div className={"view_ProjectGroup_List_statistic_item"}>
                    <img src={images.check_64} alt="" width={15} height={15}/>
                    <span>{get(projectGroup, 'statistic.work_topic', 0)}</span>
                  </div>
                  <div className={"view_ProjectGroup_List_statistic_item"}>
                    <img src={images.speed_64} alt="" width={15} height={15}/>
                    <span>{get(projectGroup, 'statistic.project', 0)}</span>
                  </div>
                  <div className={"view_ProjectGroup_List_statistic_item"}>
                    <img src={images.workfollow_64} alt="" width={15} height={15}/>
                    <span>{get(projectGroup, 'statistic.process', 0)}</span>
                  </div>
                </div>
              }
            />
          </StyledListItem>
        )}
      </Draggable>
    )
  else
    return (
      <StyledListItem
        component={Link}
        to={`${route}/group/${get(projectGroup, 'id', '')}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div>
          <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'} />
        </div>
        <CustomAvatar style={{ height: 50, width: 50, }} src={get(projectGroup, 'icon')} alt='avatar' />
        <ListItemText
          primary={
            <Primary style={{marginLeft: "15px"}}>{get(projectGroup, 'name', '')}</Primary>
          }
          secondary={
            <div className={"view_ProjectGroup_List_statistic"}>
              <div className={"view_ProjectGroup_List_statistic_item"}>
                <img src={images.check_64} alt="" width={15} height={15}/>
                <span>{get(projectGroup, 'statistic.work_topic', 0)}</span>
              </div>
              <div className={"view_ProjectGroup_List_statistic_item"}>
                <img src={images.speed_64} alt="" width={15} height={15}/>
                <span>{get(projectGroup, 'statistic.project', 0)}</span>
              </div>
              <div className={"view_ProjectGroup_List_statistic_item"}>
                <img src={images.workfollow_64} alt="" width={15} height={15}/>
                <span>{get(projectGroup, 'statistic.process', 0)}</span>
              </div>
            </div>
          }
        />
      </StyledListItem>
    )
}

export default CustomListItem;
