import {Button, ListItemText} from '@material-ui/core';
import {mdiAccountCog, mdiChevronLeft} from '@mdi/js';
import CustomAvatar from 'components/CustomAvatar';
import {Primary, Secondary, StyledList, StyledListItem} from 'components/CustomList';
import LeftSideContainer from 'components/LeftSideContainer';
import LoadingBox from 'components/LoadingBox';
import SearchInput from 'components/SearchInput';
import {get, isNil} from 'lodash';
import React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {useTranslation} from 'react-i18next';
import {Link, useHistory, useParams} from 'react-router-dom';
import CustomListItem from './CustomListItem';
import {Routes} from "../../../../constants/routes";
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
  searchPattern, setSearchPattern,
  handleOpenModal,
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const {projectId, memberId} = useParams();
  return (
    <>
      <LeftSideContainer
        title={t("DMH.VIEW.PP.LEFT.PM.TITLE")}
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => {
            handleSubSlide(0);
            !isNil(memberId) && history.replace(`${Routes.PROJECT}/${projectId}`);
          },
          tooltip: t("DMH.VIEW.PP.LEFT.PM.BACK"),
        }}
        rightAction={{
          iconPath: mdiAccountCog,
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
            <Button
              variant={"contained"} color={"primary"} disableElevation
              className={"view_Project_ProjectMemberSlide___buttonAddMembers"}
            >
              {t("LABEL_CHAT_TASK_THEM_THANH_VIEN")}
            </Button>
            <SearchInput
              fullWidth
              placeholder={t("DMH.VIEW.PP.LEFT.PM.SEARCH")}
              value={searchPattern}
              style={{background: "#fff"}}
              onChange={evt => setSearchPattern(evt.target.value)}
            />
          </Banner>
          <Wrapper
            autoHide
            autoHideTimeout={500}
          >
            <StyledList>
              <StyledListItem
                to={`${Routes.PROJECT}/${projectId}`}
                component={Link}
                className={isNil(memberId) ? "item-actived" : ""}
              >
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
                  onClick={() => history.push(`${Routes.PROJECT}/${projectId}/${member.id}`)}
                />
              ))}
            </StyledList>
          </Wrapper>
          {/*<Button onClick={evt => handleOpenModal('MEMBER_SETTING')}>
            <Icon path={mdiAccountCog} size={1} />
            <span>{t("DMH.VIEW.PP.LEFT.PM.MANAGE")}</span>
          </Button>*/}
        </Container>
      </LeftSideContainer>
    </>
  )
}

export default ProjectMemberSlide;
