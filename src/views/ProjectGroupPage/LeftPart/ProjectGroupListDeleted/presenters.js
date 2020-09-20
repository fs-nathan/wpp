import { ListItemText } from '@material-ui/core';
import { mdiPlus } from '@mdi/js';
import { get, isNil } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomAvatar from '../../../../components/CustomAvatar';
import { Primary, Secondary, StyledList, StyledListItem } from '../../../../components/CustomList';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import SearchInput from '../../../../components/SearchInput';
import CustomListItem from './CustomListItem';
import './style.scss';
import {useLocation, Link} from "react-router-dom";
import * as images from "../../../../assets";

const Banner = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectGroup_List___banner ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) =>
  <Primary
    className={`view_ProjectGroup_List___primary ${className}`}
    {...props}
  />;

function ProjectListDeleted({
  groups, canModify, searchPattern, setSearchPattern, handleOpenModal,
}) {
  const { t } = useTranslation();
  const search = useLocation().search;
  const [groupID, setGroupID] = React.useState(null);

  React.useEffect(() => {
     let searchParams = new URLSearchParams(search);
     setGroupID(searchParams.get("group_id"));
  }, [search]);

  return (
    <>
      <LeftSideContainer
        title={t("DMH.VIEW.PGP.LEFT.LIST.TITLE")}
        rightAction={canModify ? {
          iconPath: mdiPlus,
          onClick: () => handleOpenModal('CREATE'),
          tooltip: t("DMH.VIEW.PGP.LEFT.LIST.ADD"),
        } : null}
        loading={{
          bool: groups.loading,
          component: () => <LoadingBox />,
        }}
      >
        <Banner>
          <SearchInput
            fullWidth
            placeholder={t("DMH.VIEW.PGP.LEFT.LIST.FIND")}
            value={searchPattern}
            onChange={evt => setSearchPattern(evt.target.value)}
          />
        </Banner>
        <StyledList>
          <StyledListItem
            to={`/projects/deleted`}
            component={Link}
            className={isNil(groupID) ? "item-actived" : ""}
          >
            <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
            <ListItemText
                primary={
                  <StyledPrimary>{t("DMH.VIEW.PGP.LEFT.LIST.ALL")}</StyledPrimary>
                }
                secondary={
                  <div className={"view_ProjectGroup_List_statistic"}>
                    <div className={"view_ProjectGroup_List_statistic_item"}>
                      <img src={images.check_64} alt="" width={15} height={15}/>
                      <span>{groups.groups.reduce((sum, projectGroup) => sum + get(projectGroup, 'statistic.work_topic', 0), 0)}</span>
                    </div>
                    <div className={"view_ProjectGroup_List_statistic_item"}>
                      <img src={images.speed_64} alt="" width={15} height={15}/>
                      <span>{groups.groups.reduce((sum, projectGroup) => sum + get(projectGroup, 'statistic.project', 0), 0)}</span>
                    </div>
                    <div className={"view_ProjectGroup_List_statistic_item"}>
                      <img src={images.workfollow_64} alt="" width={15} height={15}/>
                      <span>{groups.groups.reduce((sum, projectGroup) => sum + get(projectGroup, 'statistic.process', 0), 0)}</span>
                    </div>
                  </div>
                }
            />
          </StyledListItem>
          {groups.groups.map((projectGroup, index) => (
              <CustomListItem key={index} projectGroup={projectGroup} index={index} groupID={groupID}/>
          ))}
        </StyledList>
      </LeftSideContainer>
    </>
  )
}

export default ProjectListDeleted;
