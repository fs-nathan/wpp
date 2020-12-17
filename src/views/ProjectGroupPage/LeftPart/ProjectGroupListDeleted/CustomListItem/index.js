import {ListItemText} from '@material-ui/core';
import {get} from 'lodash';
import React from 'react';
import CustomAvatar from '../../../../../components/CustomAvatar';
import {Primary, StyledListItem} from '../../../../../components/CustomList';
import {Link} from 'react-router-dom';
import * as images from "../../../../../assets";

function CustomListItem({ projectGroup, index, groupID}) {
  const workType = [
    {key: 'work_topic', image: images.check_64},
    {key: 'project', image: images.speed_64},
    {key: 'process', image: images.workfollow_64}
  ];
  return (
      <StyledListItem
          key={`group_project_deleted_${index}`}
          to={`/projects/deleted?group_id=${get(projectGroup, "id")}`}
          component={Link}
          className={groupID === get(projectGroup, "id") ? "item-actived" : ""}
      >
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
  );
}

export default CustomListItem;
