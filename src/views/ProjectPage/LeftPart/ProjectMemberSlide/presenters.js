import { Button, ListItemText } from '@material-ui/core';
import { mdiAccountCog, mdiChevronLeft, mdiDragVertical, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { detailUser } from 'actions/user/detailUser';
import CustomAvatar from 'components/CustomAvatar';
import { Primary, Secondary, StyledList, StyledListItem } from 'components/CustomList';
import LeftSideContainer from 'components/LeftSideContainer';
import LoadingBox from 'components/LoadingBox';
import SearchInput from 'components/SearchInput';
import { get } from 'lodash';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomListItem from './CustomListItem';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_Project_ProjectMemberSlide___container ${className}`}
    {...props}
  />

const Banner = ({ className = '', ...props }) =>
  <div
    className={`view_Project_ProjectMemberSlide___banner ${className}`}
    {...props}
  />;

const StyledPrimary = ({ className = '', ...props }) =>
  <Primary
    className={`view_Project_ProjectMemberSlide___primary ${className}`}
    {...props}
  />;

const Wrapper = ({ className = '', ...rest }) =>
  <Scrollbars
    className={`view_Project_ProjectMemberSlide___wrapper ${className}`}
    {...rest}
  />;

function ProjectMemberSlide({
  handleSubSlide,
  members,
  searchPatern, setSearchPatern,
  handleOpenModal,
}) {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
  }

  return (
    <>
      <LeftSideContainer
        title={t("DMH.VIEW.PP.LEFT.PM.TITLE")}
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => handleSubSlide(0),
          tooltip: t("DMH.VIEW.PP.LEFT.PM.BACK"),
        }}
        rightAction={{
          iconPath: mdiPlus,
          onClick: () => handleOpenModal('MEMBER_SETTING'),
          tooltip: t("DMH.VIEW.PP.LEFT.PM.ADD"),
        }}
        loading={{
          bool: members.loading,
          component: () => <LoadingBox />
        }}
      >
        <Container>
          <Banner>
            <SearchInput
              fullWidth
              placeholder={t("DMH.VIEW.PP.LEFT.PM.SEARCH")}
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
            />
          </Banner>
          <Wrapper
            autoHide
            autoHideTimeout={500}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={'member-list'}>
                {provided => (
                  <StyledList
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <StyledListItem
                      to={`#`}
                      component={Link}
                    >
                      <div>
                        <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'} />
                      </div>
                      <CustomAvatar style={{ width: 40, height: 40, }} alt='avatar' />
                      <ListItemText
                        primary={
                          <StyledPrimary>{t("DMH.VIEW.PP.LEFT.PM.ALL_LABEL")}</StyledPrimary>
                        }
                        secondary={
                          <Secondary>
                            {t("DMH.VIEW.PP.LEFT.PM.ALL_TASK", {
                              number_task: get(members, 'totalTask', 0),
                            })}
                          </Secondary>
                        }
                      />
                    </StyledListItem>
                    {members.members.map((member, index) => (
                      <CustomListItem
                        key={get(member, 'id')}
                        member={member}
                        index={index}
                        onClick={evt => {
                          dispatch(detailUser({ userId: get(member, 'id') }))
                        }}
                      />
                    ))}
                    {provided.placeholder}
                  </StyledList>
                )}
              </Droppable>
            </DragDropContext>
          </Wrapper>
          <Button onClick={evt => handleOpenModal('MEMBER_SETTING')}>
            <Icon path={mdiAccountCog} size={1} />
            <span>{t("DMH.VIEW.PP.LEFT.PM.MANAGE")}</span>
          </Button>
        </Container>
      </LeftSideContainer>
    </>
  )
}

export default ProjectMemberSlide;
