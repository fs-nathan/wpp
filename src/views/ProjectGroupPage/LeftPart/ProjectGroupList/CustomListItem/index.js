import {ListItemText} from '@material-ui/core';
import {mdiDragVertical} from '@mdi/js';
import Icon from '@mdi/react';
import {get} from 'lodash';
import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {Link} from 'react-router-dom';
import CustomAvatar from '../../../../../components/CustomAvatar';
import * as images from "assets";
import {Primary, StyledListItem} from '../../../../../components/CustomList';

function CustomListItem({ projectGroup, index, route, canDrag }) {
  const [isHover, setIsHover] = React.useState(false);
  const workType = [
    {key: 'work_topic', image: images.check_64},
    {key: 'project', image: images.speed_64},
    {key: 'process', image: images.workfollow_64}
  ];
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
            <div {...provided.dragHandleProps} style={{marginLeft: "-10px"}}>
              <Icon path={mdiDragVertical} size={1} color={!isHover ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)'} />
            </div>
            <CustomAvatar style={{marginRight: "10px"}} src={get(projectGroup, 'icon')} alt='avatar' />
            <ListItemText
              primary={
                <Primary>{get(projectGroup, 'name', '')}</Primary>
              }
              secondaryTypographyProps={{ component: 'div' }}
              secondary={
                <div className={"view_ProjectGroup_List_statistic"}>
                  {get(projectGroup, 'work_types', []).map((item) => {
                    return (
                      <div key={"wtl" + item} className={"view_ProjectGroup_List_statistic_item"}>
                        <img src={workType[parseInt(item)].image} alt="" width={15} height={15}/>
                        <span>{get(projectGroup, `statistic.${workType[parseInt(item)].key}`, 0)}</span>
                      </div>
                    );
                  })}
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
        <div style={{marginLeft: "-10px"}}>
          <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'} />
        </div>
        <CustomAvatar style={{marginRight: "10px"}} src={get(projectGroup, 'icon')} alt='avatar' />
        <ListItemText
          primary={
            <Primary style={{marginLeft: "15px"}}>{get(projectGroup, 'name', '')}</Primary>
          }
          secondaryTypographyProps={{ component: 'div' }}
          secondary={
            <div className={"view_ProjectGroup_List_statistic"}>
              {get(projectGroup, 'work_types', []).map((item) => {
                return (
                  <div className={"view_ProjectGroup_List_statistic_item"}>
                    <img src={workType[parseInt(item)].image} alt="" width={15} height={15}/>
                    <span>{get(projectGroup, `statistic.${workType[parseInt(item)].key}`, 0)}</span>
                  </div>
                );
              })}
            </div>
          }
        />
      </StyledListItem>
    )
}

export default CustomListItem;
