import {Avatar, IconButton, ListItem} from '@material-ui/core';
import {mdiDotsVertical} from '@mdi/js';
import Icon from '@mdi/react';
import {openDetailMember} from 'actions/chat/chat';
import {deleteMember} from 'actions/taskDetail/taskDetailActions';
import {detailUser} from 'actions/user/detailUser';
import compact from 'lodash/compact';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import './styles.scss';
import {currentColorSelector} from 'views/JobDetailPage/selectors';
import * as images from '../../../../../assets/index';
import OptionModal from "../OptionModal";

const ButtonIcon = styled(IconButton)`
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`
const StyledListItem = styled(ListItem)`
    padding : 7px 0;
    &:hover .styled-menu-member {
      opacity: 1;
    }
`

const MemberListItem = ({
  id, name, avatar,
  room, position, group_permission,
  handleClickPermission, handleClickOptionModal,
  can_ban, is_admin, is_in_group,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    handleClickOptionModal();
  }

  /*const handleDeleteMembers = () => {
    dispatch(openDetailMember(false))
    dispatch(deleteMember({ task_id: taskId, member_id: id }))
    setAnchorEl(null);
  };*/

  const handleClickDetail = (evt) => {
    evt.stopPropagation();
    setAnchorEl(null);
    dispatch(detailUser({ userId: id }))
  };

  /*const onClickPermission = (evt) => {
    evt.stopPropagation();
    setAnchorEl(null);
    handleClickPermission()
  };*/

  return (
    <React.Fragment>
      <StyledListItem className="memberItem">
        <Avatar className="memberItem--avatar" src={avatar} alt='avatar' onClick={handleClickDetail} />
        <div className="memberItem--textWrap" onClick={handleClickDetail}>
          <div className="memberItem--name">
            {name}
            {is_admin &&
              <div className="memberItem--admin">
                Admin
              </div>
            }
          </div>
          <div className="memberItem--department">
            {group_permission && group_permission.name}
          </div>
          <div className="memberItem--role">
            {compact([room, position]).join(' - ')}
          </div>
        </div>

        {!is_in_group &&
          <div className="memberItem--left">
            {t('LABEL_CHAT_TASK_DA_ROI_NHOM')}
          </div>
        }
        <div className={"memberItem--menuButton buttonChat"}>
          <img src={images.messeger} width={20} height={20}/>
        </div>
        <ButtonIcon
          className="memberItem--menuButton"
          size='small' onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
          <Icon path={mdiDotsVertical} size={1} />
        </ButtonIcon>
      </StyledListItem>
    </React.Fragment>
  );
}

export default MemberListItem