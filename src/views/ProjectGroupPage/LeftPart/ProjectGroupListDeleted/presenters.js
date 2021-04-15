import {Box, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {get, size, isNil} from 'lodash';
import React from 'react';
import {useTranslation} from 'react-i18next';
import CustomAvatar from '../../../../components/CustomAvatar';
import SearchInput from '../../../../components/SearchInput';
import './style.scss';
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";
import {Scrollbars} from "react-custom-scrollbars";
import LoadingBox from "../../../../components/LoadingBox";
import {Routes} from "../../../../constants/routes";

const Banner = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectGroup_List___banner ${className}`}
    {...props}
  />;

const LeftContainer = styled.div`
  background: #F1F2F4;
  height: 100vh;
`;
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
      <LeftContainer>
        <Banner>
          <SearchInput
            fullWidth
            placeholder={t("DMH.VIEW.PGP.LEFT.LIST.FIND")}
            value={searchPattern}
            onChange={evt => setSearchPattern(evt.target.value)}
            style={{background: "#fff"}}
          />
        </Banner>
        <Box className={"view_ProjectGroup_List--LeftContainer"}>
          {groups.loading && <LoadingBox/>}
          {!groups.loading && (
            <>
              <ListItem
                component={Link} to={`${Routes.PROJECTS}/deleted`}
                className={`${isNil(groupID) ? 'active' : ''}`}
              >
                <ListItemIcon/>
                <ListItemText primary={`${t("LABEL_CHAT_TASK_TAT_CA")} (${size(groups.groups)})`}/>
              </ListItem>
              <Scrollbars autoHide autoHideTimeout={500}>
                <List component={"nav"} className={""}>
                  {groups.groups.map((projectGroup, index) => (
                    <ListItem
                      component={Link}
                      to={`?group_id=${projectGroup.id}`}
                      className={`${groupID === projectGroup.id ? 'active' : ''}`}
                    >
                      <ListItemIcon>
                        <CustomAvatar
                          style={{marginRight: "10px", width: 25, height: 25}}
                          src={get(projectGroup, 'icon')}
                          alt='avatar'
                        />
                      </ListItemIcon>
                      <ListItemText primary={`${get(projectGroup, "name")} (${projectGroup.number_project})`}/>
                    </ListItem>
                  ))}
                </List>
              </Scrollbars>
            </>
          )}
        </Box>
      </LeftContainer>
    </>
  )
}

export default ProjectListDeleted;
