import { ListItemText } from '@material-ui/core';
import {get} from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomAvatar from '../../../../../components/CustomAvatar';
import { Primary, Secondary, StyledListItem } from '../../../../../components/CustomList';
import { Link } from 'react-router-dom';

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
                <Secondary>{t("DMH.VIEW.PGP.LEFT.LIST.NUM_MEM", { projectGroups: get(projectGroup, 'number_project', 0) })}</Secondary>
              }
          />
      </StyledListItem>
  );
}

export default CustomListItem;
