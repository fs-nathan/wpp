import {Badge, Box, IconButton, Link as MuiLink, ListItemText} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';
import {get} from 'lodash';
import React from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import {Link, useHistory} from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import {Primary, Secondary, StyledList, StyledListItem} from '../../../../components/CustomList';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import SearchInput from '../../../../components/SearchInput';
import CustomListItem from './CustomListItem';
import './style.scss';
import Typography from "@material-ui/core/Typography";

const Banner = ({ className = '', ...props }) =>
  <div
    className={`view_Department_List___banner ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) =>
  <Primary
    className={`view_Department_List___primary ${className}`}
    {...props}
  />;

const Container = ({ className = '', ...props }) =>
  <div
    className={`departmentList_container${className}`}
    {...props}
  />;

const NewUserBadge = ({ className = '', ...props }) =>
  <Badge
    className={`view_Department_AllUserTalbe___user-badge ${className}`}
    {...props}
  />

function DepartmentList({
  rooms, searchPattern, route, viewPermissions,
  handleSearchPattern, handleDragEnd,
  handleOpenModal, handleVisibleDrawerMessage, countRequirements = 0
}) {

  const { t } = useTranslation();
  const history = useHistory();
  let className = '';

  const listMenu = [
    {
      title: t('DMH.VIEW.DP.RIGHT.UT.ADD_USER'),
      icon: PersonAddIcon,
      action: () => handleOpenModal("ADD_USER"),
      color: '#fff',
      style: { background: '#f4511e', padding: "7px"},
    },
    {
      title: t('DMH.VIEW.DP.LEFT.ADD.LABEL.REQ'),
      icon: ContactMailRoundedIcon,
      action: () => { history.push(`${route}/member-required`) },
      color: '#fff',
      style: { background: '#4caf50', padding: "7px"},
      rightIcon: () => countRequirements > 0 ? <NewUserBadge badgeContent={countRequirements}/> : <div/>
    },
  ]

  function doLink(roomId) {
    history.push(`${route}/room/${roomId}`);
  }

  if (get(viewPermissions.permissions, 'can_modify', false)) className = 'HasHeader';
  return (
    <React.Fragment>
      <Banner>
        <SearchInput
          fullWidth style={{background: "#fff"}}
          placeholder={t('DMH.VIEW.DP.LEFT.LIST.FIND')}
          value={searchPattern}
          onChange={(e) => handleSearchPattern(e.target.value)}
        />
      </Banner>
      <Container className={className}>
        <LeftSideContainer
          title={
            <StyledList className={"departmentList_containerHasHeader"}>
              {get(viewPermissions.permissions, 'can_modify', false) && listMenu.map((item, index) => (
                <StyledListItem
                  component={Link}
                  onClick={() => {
                    item.action(item);
                  }}
                  className={`${history.location.pathname.includes("/member-required") && index === 1 && "active"}`}
                >
                  {item.icon && (
                    <IconButton style={item.style}>
                      <item.icon style={{color: '#fff'}}/>
                    </IconButton>
                  )}
                  <ListItemText
                    primary={
                      <StyledPrimary style={{ fontWeight: 'normal', marginLeft: "10px"}}>
                        {item.title}
                      </StyledPrimary>
                    }
                  />
                  {item.rightIcon && item.rightIcon()}
                </StyledListItem>
              ))}
              <Box className={"departmentList_containerHasHeader__summary"}>
                <Typography variant={"h6"}>{t("Bộ phận")} ({rooms.rooms.length})</Typography>
                {get(viewPermissions.permissions, 'can_modify', false) && (
                  <MuiLink onClick={() => handleOpenModal("CREATE")}>+ {t("Thêm bộ phận")}</MuiLink>
                )}
              </Box>
            </StyledList>
          }
          loading={{
            bool: rooms.loading,
            component: () => <LoadingBox />,
          }}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={'department-list'}>
              {provided => (
                <StyledList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <StyledListItem to={`${route}`} component={Link} style={history.location.pathname === "/users" ? {background: "#E6E6E6"} : {}}>
                    <CustomAvatar style={{ height: 35, width: 35, }} alt='avatar' />
                    <ListItemText
                      primary={<StyledPrimary style={{ marginLeft: "10px"}}>{t('DMH.VIEW.DP.LEFT.LIST.ALL')}</StyledPrimary>}
                      secondary={
                        <Secondary style={{ marginLeft: "10px"}}>
                          {t('DMH.VIEW.DP.LEFT.LIST.NUM_MEM', { members: rooms.rooms.reduce((sum, room) => sum += get(room, 'number_member'), 0) })}
                        </Secondary>
                      }
                    />
                  </StyledListItem>
                  {rooms.rooms.map((room, index) => (
                    <CustomListItem canDrag={get(viewPermissions.permissions, 'can_modify', false)} key={get(room, 'id')} room={room} index={index} handleLink={doLink} />
                  ))}
                  {provided.placeholder}
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
        </LeftSideContainer>
      </Container >
    </React.Fragment >
  )
};

export default DepartmentList;
