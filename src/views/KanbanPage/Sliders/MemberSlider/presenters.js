import React from 'react';
import SearchInput from 'components/SearchInput';
import { IconButton, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiClose, mdiAccountCog } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { includes, get, join } from 'lodash';
import './style.scss';
import CustomAvatar from 'components/CustomAvatar';
import Scrollbars from 'components/Scrollbars';

const Container = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_MemberSlider___container ${className}`}
    {...props}
  />

const Header = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_MemberSlider___header ${className}`}
    {...props}
  />

const Body = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_MemberSlider___body ${className}`}
    {...props}
  />

const Title = ({ className = '', ...props }) =>
  <span 
    className={`view_KanbanPage_MemberSlider___title ${className}`}
    {...props}
  />

const MemberBox = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_MemberSlider___member-box ${className}`}
    {...props}
  />

const MemberText = ({ className = '', ...props }) =>
  <span 
    className={`view_KanbanPage_MemberSlider___member-text ${className}`}
    {...props}
  />

const MemberSearch = ({ className = '', ...props }) =>
  <SearchInput 
    className={`view_KanbanPage_MemberSlider___member-search ${className}`}
    {...props}
  />

const MemberCheckBoxGroup = ({ className = '', ...props }) =>
  <FormGroup 
    className={`view_KanbanPage_MemberSlider___member-checkbox-group ${className}`}
    {...props}
  />

const MemberCheckBox = ({ className = '', checked, ...props }) =>
  <Checkbox 
    className={`view_KanbanPage_MemberSlider___member-checkbox${checked ? '-checked' : ''} ${className}`}
    checked={checked}
    {...props}
  />

const MemberDetail = ({ className = '', checked, ...props }) =>
  <div 
    className={`view_KanbanPage_MemberSlider___member-detail ${className}`}
    {...props}
  />

const MemberDetailText = ({ className = '', checked, ...props }) =>
  <div 
    className={`view_KanbanPage_MemberSlider___member-detail-text ${className}`}
    {...props}
  />
  
const MemberName = ({ className = '', checked, ...props }) =>
  <div 
    className={`view_KanbanPage_MemberSlider___member-name ${className}`}
    {...props}
  />

const MemberRole = ({ className = '', checked, ...props }) =>
  <div 
    className={`view_KanbanPage_MemberSlider___member-role ${className}`}
    {...props}
  />

const MemberScroll = ({ className = '', checked, ...props }) =>
  <Scrollbars
    className={`view_KanbanPage_MemberSlider___member-scrollbar ${className}`}
    {...props}
  />

function getDetail(member) {
  let result;
  if (get(member, 'group_permission_name')) {
    if (get(member, 'roles', []).length > 0) {
      result = `${get(member, 'group_permission_name')} - ${join(get(member, 'roles', []).map(role => get(role, 'name', '')), ', ')}`;
    } else {
      result = `${get(member, 'group_permission_name')}`
    }
  } else {
    if (get(member, 'roles', []).length > 0) {
      result = `${join(get(member, 'roles', []).map(role => get(role, 'name', '')), ', ')}`;
    } else {
      result = '';
    }
  }
  return result;
}

function MemberSlider({
  members,
  memberSearchStr, setMemberSearchStr, 
  memberFilter, setMemberFilter,
  handleCloseClick, handleOpenModal,
}) {

  const { t } = useTranslation();

  return (
    <Container>
      <Header>
        <Icon
          path={mdiAccountCircle}
          size={1}
          color={"rgba(0, 0, 0, 0.54)"}
        />
        <Title>{t("IDS_WP_MEMBER")}</Title>
        <abbr title={t("DMH.VIEW.PP.LEFT.PM.MANAGE")}>
          <IconButton
            onClick={evt => handleOpenModal("MEMBER_SETTING")}
          >
            <Icon
              path={mdiAccountCog}
              size={1}
              color={"rgba(0, 0, 0, 0.54)"}
            />
          </IconButton>
        </abbr>
        <abbr title={t("LABEL_CHAT_TASK_DONG")}>
          <IconButton
            onClick={evt => handleCloseClick()}
          >
            <Icon
              path={mdiClose}
              size={1}
              color={"rgba(0, 0, 0, 0.54)"}
            />
          </IconButton>
        </abbr>
      </Header>
      <Body>
        <MemberBox>
          <MemberSearch
            value={memberSearchStr}
            placeholder={t("LABEL_CHAT_TASK_TIM_KIEM_THANH_VIEN")}
            onChange={evt => setMemberSearchStr(evt.target.value)}
          />
          <MemberText>{t("LABEL_CHAT_TASK_DA_CHON_THANH_VIEN", { count: memberFilter.length })}</MemberText>
          <MemberScroll
            autoHide
            autoHideTimeout={500}
          >
            <MemberCheckBoxGroup>
              {members.length > 0 && memberSearchStr === '' && (<FormControlLabel
                control={
                  <MemberCheckBox
                    checked={memberFilter.length === members.length}
                    onChange={evt => setMemberFilter(memberFilter.length !== members.length, true)}
                    name={`all-checkbox`}
                  />
                }
                label={t("LABEL_CHAT_TASK_CHON_TAT_CA")}
              />)}
              {members
                .filter(member => includes(get(member, 'name', ''), memberSearchStr))
                .map((member, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <MemberCheckBox
                      checked={includes(memberFilter, get(member, 'id', ''))}
                      onChange={evt => setMemberFilter(get(member, 'id', ''))}
                      name={`${get(member, 'id', '')}-checkbox`}
                    />
                  }
                  label={
                    <MemberDetail>
                      <CustomAvatar src={get(member, 'avatar', '')} alt='member avatar' />
                      <MemberDetailText>
                        <MemberName>{get(member, 'name', '')}</MemberName>
                        <MemberRole>{getDetail(member)}</MemberRole>
                      </MemberDetailText>
                    </MemberDetail>
                  }
                />
              ))}
            </MemberCheckBoxGroup>
          </MemberScroll>
        </MemberBox>
      </Body>
    </Container>
  );
}

export default MemberSlider; 