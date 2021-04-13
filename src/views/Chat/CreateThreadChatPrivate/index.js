import { Radio, Avatar, Typography } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import SearchInput from 'components/SearchInput';
import compact from 'lodash/compact';
import React, { useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import CustomModal from 'components/CustomModal';
import '../styles.scss';
import styled from 'styled-components';
import { currentColorSelector } from 'views/Chat/selectors';
import { getMembersNotCreatePrivateChat, createPrivateChat } from "actions/chat/threadChat";
import {
  getListTaskDetail
} from "actions/taskDetail/taskDetailActions";
import { useHistory } from "react-router-dom";

export const StyledDiv = styled.div`
  .Mui-checked {
    color: ${props => props.selectedColor} !important;
  }
`

const Container = ({ className = '', ...props }) =>
  <div
    className={`chat-threat ${className}`}
    {...props}
  />;

const MemberRow = ({
  isChecked = false,
  avatar,
  name,
  roles,
  onClick,
  appColor
}) => {

  return (
    <StyledDiv
      selectedColor={appColor}
      className="offerMemberItem">
      <Radio
        checked={isChecked}
        onClick={onClick}
      />
      <Avatar className="offerMemberItem--avatar" src={avatar} />
      <Typography className="offerMemberItem--name" component="div">
        {name}
        <Typography
          className="offerMemberItem--role"
          component="div">{roles}</Typography>
      </Typography>
    </StyledDiv>
  )
}

function CreateThreadPrivate({
  isOpen,
  setOpen,
  onSubmit = () => {},
}) {
  const timeoutRef = useRef(null); 
  const history = useHistory();
  const projectId = useSelector(
    (state) => state.system.profile.group_chat_id
  );
  const membersOriginal = useSelector((state) => state.threadChat.membersNotCreatePrivateChat);
  const createPrivateResponse = useSelector((state) => state.threadChat.createPrivateResponse);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [members, setMembers] = useState(membersOriginal);
  const [loading, setLoading] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);
  const appColor = useSelector(currentColorSelector)

  function handleChangeSearch(evt) {
    setSearchValue(evt.target.value)
    const value = evt.target.value
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(()=> {
      timeoutRef.current = null;
      let membersTemp = []
      membersOriginal.map(e => {
        if (String(e.name).toLowerCase().indexOf(String(value).toLowerCase()) >= 0) {
          membersTemp.push(e)
        }
      })
      setMembers(membersTemp)
    }, 300);    
  }

  function handleClickMember(memberId) {
    setSelectedMember(memberId)
    setCanConfirm(true)
  }

  function handleConfirm(memberId) {
    setLoading(true)
    dispatch(createPrivateChat({member_id: selectedMember}))
  }

  React.useEffect(() => {
    if (isOpen) {
      dispatch(getMembersNotCreatePrivateChat())
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      setMembers(membersOriginal)
    }
  }, [membersOriginal]);

  React.useEffect(() => {
    if (createPrivateResponse && createPrivateResponse.state) {
      history.push(`/chats?task_id=${createPrivateResponse.task_id}`)
      setOpen(false)
      setLoading(false)
      setSelectedMember(false)
      setCanConfirm(false)
    } else {
      setLoading(false)
    }
  }, [createPrivateResponse]);

  return (
    <>
      <CustomModal
        title={t("THREAD_CHAT_CHAT_TO")}
        open={isOpen}
        setOpen={setOpen}
        onCancle={
          () => {
            setOpen(false)
            setSelectedMember(false)
            setCanConfirm(false)
          }
        }
        onConfirm={handleConfirm}
        height='tall'
        maxWidth='sm'
        actionLoading={loading}
        manualClose={true}
        canConfirm={canConfirm}
      >
        <Container>
          <SearchInput placeholder={t('LABEL_CHAT_TASK_TIM_KIEM_THANH_VIEN')}
            value={searchValue}
            onChange={handleChangeSearch}
          />
          {members.map((member, i) => <MemberRow
            key={member.id}
            isChecked={selectedMember === member.id}
            onClick={() => handleClickMember(member.id)}
            avatar={member.avatar}
            roles={compact([member.position, member.room]).join(' - ')}
            name={member.name}
            appColor={appColor}
          />)}
        </Container>
      </CustomModal>
    </>
  )
}

export default CreateThreadPrivate
