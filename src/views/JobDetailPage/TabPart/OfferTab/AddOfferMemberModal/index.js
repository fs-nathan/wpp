import { Checkbox } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import SearchInput from 'components/SearchInput';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import OfferMemberItem from './OfferMemberItem';
import './styles.scss';

function AddOfferMemberModal({
  isOpen,
  setOpen,
  value = [],
  onChange,
  members,
  disableIndexes,
}) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(value);
  const [searchValue, setSearchValue] = useState('');
  function onClickDone() {
    onChange(selected)
    setOpen(false);
  }

  function onClickMember(i) {
    return () => {
      const itemIndex = selected.indexOf(i)
      if (itemIndex !== -1) {
        selected.splice(itemIndex, 1)
      } else {
        selected.push(i)
      }
      setSelected([...selected])
    }
  }

  function onClickSelectAll() {
    if (selected.length === members.length) {
      setSelected([])
    } else {
      setSelected(members.map((m, i) => i))
    }
  }

  function handleChangeSearch(evt) {
    setSearchValue(evt.target.value)
  }

  const filteredMembers = members
    .map((member, index) => ({ ...member, index }))
    .filter(({ name }) => name.indexOf(searchValue) !== -1)

  return (
    <JobDetailModalWrap
      title={t('LABEL_CHAT_TASK_THEM_THANH_VIEN')}
      open={isOpen}
      setOpen={setOpen}
      confirmRender={() => "Hoàn Thành"}
      onConfirm={onClickDone}
      className="addOfferMemberModal"
    >
      <React.Fragment>
        <SearchInput placeholder={t('LABEL_CHAT_TASK_TIM_KIEM_THANH_VIEN')}
          value={searchValue}
          onChange={handleChangeSearch}
        />
        <ColorTypo className="addOfferMemberModal--selected">{t('LABEL_CHAT_TASK_DA_CHON')}{selected.length}{t('LABEL_CHAT_TASK_THANH_VIEN')}</ColorTypo>
        <div className="addOfferMemberModal--selectAll">
          <Checkbox checked={selected.length === members.length} onClick={onClickSelectAll} ></Checkbox>
          <ColorTypo className="addOfferMemberModal--selectAllText" component="div">{t('LABEL_CHAT_TASK_CHON_TAT_CA')}</ColorTypo>
        </div>
        {filteredMembers.map((member, i) => <OfferMemberItem
          key={i}
          isSelected={selected.indexOf(member.index) !== -1}
          onClick={onClickMember(member.index)}
          avatar={member.avatar}
          roles={`${member.position} - ${member.room}`}
          name={member.name}
          isDisable={disableIndexes.indexOf(member.index) !== -1}
        />)}
      </React.Fragment>
    </JobDetailModalWrap>
  )
}

export default AddOfferMemberModal