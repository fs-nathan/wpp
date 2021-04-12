import { ListItemText, Box, IconButton } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { get } from 'lodash';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import CustomAvatar from '../../../../components/CustomAvatar';
import { Primary, Secondary, StyledList, StyledListItem } from '../../../../components/CustomList';
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import { DRAWER_TYPE } from '../../../../constants/constants';
import SearchInput from '../../../../components/SearchInput';
import CustomListItem from './CustomListItem';
import './style.scss';

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
    className={`deparmentList_container${className}`}
    {...props}
  />;


function DepartmentList({
  rooms, searchPatern, route, viewPermissions,
  handleSearchPatern, handleDragEnd,
  handleOpenModal, handleVisibleDrawerMessage,
}) {

  const { t } = useTranslation();
  const history = useHistory();
  const ref = React.useRef();
  const [searchAnchor, setSearchAnchor] = React.useState(null);
  let className = '';

  function handleMoreOpen(evt) {
    setSearchAnchor(evt.currentTarget);
  }

  const listMenu = [
    {
      title: t('DMH.VIEW.DP.RIGHT.UT.ADD_USER'),
      icon: PersonAddIcon,
      action: () => handleOpenModal("ADD_USER"),
      color: '#fff',
      style: { background: '#f4511e'},
    },
    {
      title: t('DMH.VIEW.DP.LEFT.ADD.LABEL.REQ'),
      icon: ContactMailRoundedIcon,
      action: () => { history.push(`${route}/member-required`) },
      color: '#fff',
      style: { background: '#4caf50'},
    },
  ]

  function doLink(roomId) {
    history.push(`${route}/room/${roomId}`);
  }

  React.useEffect(() => {
    ref.current.focus();
  }, []);

  if (get(viewPermissions.permissions, 'can_modify', false)) className = 'HasHeader';
  return (
    <React.Fragment>
      <Banner>
        <SearchInput
          fullWidth
          placeholder={t('DMH.VIEW.DP.LEFT.LIST.FIND')}
          value={searchPatern}
          onChange={handleSearchPatern}
        />
      </Banner>
      <Container className={className}>
        <LeftSideContainer
          title={get(viewPermissions.permissions, 'can_modify', false) ?
            <StyledList>
              {listMenu.map((item, index) => (
                <StyledListItem
                  component={Link}
                  innerRef={ref}
                  onClick={() => {
                    item.action(item);
                  }}
                >
                  {item.icon && (
                    <IconButton style={item.style}>
                      <item.icon style={{color: '#fff'}}/>
                    </IconButton>
                  )}
                  <ListItemText
                    primary={
                      <StyledPrimary style={{ fontWeight: 'normal' }}>
                        {item.title}
                      </StyledPrimary>
                    }
                  />
                  {item.rightIcon && item.rightIcon()}
                </StyledListItem>
              ))}
            </StyledList> : <div></div>
          }
          loading={{
            bool: rooms.loading,
            component: () => <LoadingBox />,
          }}
        >
          <Box style={{ background: "#fff" }}>
            <Stack small style={{ display: 'block' }}>
              <Box padding="0 1rem" style={{ display: 'inline-block', paddingTop: '15px' }}>
                <b style={{ fontSize: "16px" }}>
                  {t("Bộ phận")} ({rooms.rooms.length})
              </b>
              </Box>
              {
                get(viewPermissions.permissions, 'can_modify', false) && (
                  <Box padding="0 1rem 0 3rem" style={{ display: 'inline-block', float: 'right' }}>
                    <AddButton
                      onClick={() => {
                        handleOpenModal('CREATE')
                      }}
                      label={t("Thêm bộ phận")}
                    />
                  </Box>
                )
              }
            </Stack>
          </Box>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={'department-list'}>
              {provided => (
                <StyledList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <StyledListItem
                    to={`${route}`}
                    component={Link}
                    innerRef={ref}
                  >
                    {
                      get(viewPermissions.permissions, 'can_modify', false) && (
                        <div>
                          <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'} />
                        </div>
                      )
                    }
                    <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                    <ListItemText
                      primary={
                        <StyledPrimary>{t('DMH.VIEW.DP.LEFT.LIST.ALL')}</StyledPrimary>
                      }
                      secondary={
                        <Secondary>
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
