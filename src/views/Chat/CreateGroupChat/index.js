import { Checkbox, Avatar, Typography, TextField } from '@material-ui/core';
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
import { getMembersToCreateGroupChat, createGroupChat } from "actions/chat/threadChat";
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
  onChange,
  appColor
}) => {

  return (
    <StyledDiv
      selectedColor={appColor}
      className="offerMemberItem">
      <Checkbox
        checked={isChecked}
        onChange={onChange}
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
  const membersOriginal = useSelector((state) => state.threadChat.membersToCreateGroupChat);
  const createGroupChatResponse = useSelector((state) => state.threadChat.createGroupChatResponse);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [members, setMembers] = useState(membersOriginal);
  const [loading, setLoading] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
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

  function handleClickMember(memberId, isChecked) {
    let membersSelected = []
    if (isChecked) {
      membersSelected = [...selectedMembers, memberId]
      setSelectedMembers(membersSelected)
    } else {
      membersSelected = selectedMembers.filter(e => e != memberId)
      setSelectedMembers(membersSelected)
    }
    if (membersSelected.length && groupName != "") {
      setCanConfirm(true)
    } else {
      setCanConfirm(false)
    }
  }

  function handleChangeGroupName(value) {
    setGroupName(value)
    if (selectedMembers.length && value != "") {
      setCanConfirm(true)
    } else {
      setCanConfirm(false)
    }
  }

  function handleConfirm() {
    setLoading(true)
    dispatch(createGroupChat({
      members_id: selectedMembers,
      group_name: groupName
    }))
  }

  React.useEffect(() => {
    if (isOpen) {
      dispatch(getMembersToCreateGroupChat())
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      setMembers(membersOriginal)
    }
  }, [membersOriginal]);

  React.useEffect(() => {
    if (createGroupChatResponse && createGroupChatResponse.state) {
      history.push(`/chats?task_id=${createGroupChatResponse.task_id}`)
      setOpen(false)
      setLoading(false)
      setSelectedMembers([])
      setCanConfirm(false)
    } else {
      setLoading(false)
    }
  }, [createGroupChatResponse]);

  return (
    <>
      <CustomModal
        title={t("THREAD_CHAT_CREATE_GROUP_CHAT")}
        open={isOpen}
        setOpen={setOpen}
        onCancle={
          () => {
            setOpen(false)
            setSelectedMembers([])
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
          <div className="per-line-modal">
            <p>
              {t("TREAD_CHAT_GROUP_NAME")}
              <span className="field-required" title={t("FIELD_REQUIRED")}>*</span>
            </p>
            <TextField
              id="group-name"
              variant="outlined"
              fullWidth
              size="small"
              value={groupName}
              onChange={({ target }) => handleChangeGroupName(target.value)}
            />
          </div>
          <div className="per-line-modal">
            <p>
              {t("TREAD_CHAT_CHOOSE_MEMBERS")}
              <span className="field-required" title={t("FIELD_REQUIRED")}>*</span>
            </p>
            <SearchInput placeholder={t('LABEL_CHAT_TASK_TIM_KIEM_THANH_VIEN')}
              value={searchValue}
              onChange={handleChangeSearch}
            />
            {members.map((member, i) => <MemberRow
              key={member.id}
              isChecked={selectedMembers.find(e => e === member.id) ? true : false}
              onChange={(event) => handleClickMember(member.id, event.target.checked)}
              avatar={member.avatar}
              roles={compact([member.position, member.room]).join(' - ')}
              name={member.name}
              appColor={appColor}
            />)}
          </div>
        </Container>
      </CustomModal>
    </>
  )
}

export default CreateThreadPrivate
