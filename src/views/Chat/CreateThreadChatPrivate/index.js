import { Checkbox, Avatar, Typography } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import SearchInput from 'components/SearchInput';
import compact from 'lodash/compact';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomModal from 'components/CustomModal';
import './styles.scss';
import styled from 'styled-components';
import { currentColorSelector } from 'views/Chat/selectors';

export const StyledDiv = styled.div`
  .Mui-checked {
    color: ${props => props.selectedColor} !important;
  }
`

const memberRow = ({
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
      <Checkbox
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

  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [members, setMembers] = useState([{
    id: 1,
    avatar: "https://testapi.workplus.vn/avatars/1592276710678-filename",
    name: "Nguyen Van Anh",
    position: "Giam Doc",
    room: "Ban Giam DOc"
  }]);
  const appColor = useSelector(currentColorSelector)

  function handleChangeSearch(evt) {
    setSearchValue(evt.target.value)
  }

  function handleClickMember(memberId) {
    // body...
  }

  return (
    <>
      <CustomModal
        title="Tạo thread"
        open={isOpen}
        setOpen={setOpen}
        canConfirm={() => console.log('Cancel')}
        onConfirm={() => console.log('OK')}
        height='miniWide'
        maxWidth='sm'
        actionLoading={isLoading}
      >
        <Container>
          <SearchInput placeholder={t('LABEL_CHAT_TASK_TIM_KIEM_THANH_VIEN')}
            value={searchValue}
            onChange={handleChangeSearch}
          />
          {members.map((member, i) => <memberRow
            key={member.id}
            isSelected={selectedMember === member.id}
            onClick={handleClickMember(member.id)}
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
