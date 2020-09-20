import {ListItemText} from '@material-ui/core';
import {get} from 'lodash';
import React from 'react';
import {useTranslation} from 'react-i18next';
import CustomAvatar from '../../../../../components/CustomAvatar';
import {Primary, StyledListItem} from '../../../../../components/CustomList';
import {Link} from 'react-router-dom';
import * as images from "../../../../../assets";

function CustomListItem({ projectGroup, index, groupID}) {
  const { t } = useTranslation();
  return (
      <StyledListItem
          key={`group_project_deleted_${index}`}
          to={`/projects/deleted?group_id=${get(projectGroup, "id")}`}
          component={Link}
          className={groupID === get(projectGroup, "id") ? "item-actived" : ""}
      >
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
  );
}

export default CustomListItem;
