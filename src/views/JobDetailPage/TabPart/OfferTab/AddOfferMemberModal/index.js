import { Checkbox } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import SearchInput from 'components/SearchInput';
import compact from 'lodash/compact';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import JobDetailModalWrap from 'views/JobDetailPage/JobDetailModalWrap';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import OfferMemberItem, { StyledDiv } from './OfferMemberItem';
import './styles.scss';

function AddOfferMemberModal({
  isOpen,
  setOpen,
  value = [],
  onChange,
  members = [],
  disableIndexes = [],
  isUpdate,
}) {

  const { t } = useTranslation();
  const appColor = useSelector(currentColorSelector)
  const [selected, setSelected] = useState(value);
  const [searchValue, setSearchValue] = useState('');

  const filteredMembers = useMemo(() => {
    return members
      .map((member, index) => ({ ...member, index }))
      .filter(({ index }) => !disableIndexes.includes(index))
      .filter(({ name }) => name.indexOf(searchValue) !== -1)
  }, [members, disableIndexes, searchValue])

  function onClickDone() {
    onChange(selected);
  }
  function onCancel() {
    !isUpdate && onChange([]);
  }

  React.useEffect(() => {
    setSelected(value);
  }, [value]);

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
    if (selected.length === filteredMembers.length) {
      setSelected([])
    } else {
      setSelected(members.map((_, idx) => idx).filter(idx => !disableIndexes.includes(idx)))
    }
  }

  function handleChangeSearch(evt) {
    setSearchValue(evt.target.value)
  }

  return (
    <JobDetailModalWrap
      title={t('LABEL_CHAT_TASK_THEM_THANH_VIEN')}
      open={isOpen}
      setOpen={setOpen}
      confirmRender={() => t('LABEL_CHAT_TASK_HOAN_THANH')}
      onConfirm={onClickDone}
      onCancle={onCancel}
      className="addOfferMemberModal"
    >
      <React.Fragment>
        <SearchInput placeholder={t('LABEL_CHAT_TASK_TIM_KIEM_THANH_VIEN')}
          value={searchValue}
          onChange={handleChangeSearch}
        />
        <ColorTypo className="addOfferMemberModal--selected">{t('LABEL_CHAT_TASK_DA_CHON_THANH_VIEN', { count: selected.length })}</ColorTypo>
        <StyledDiv
          selectedColor={appColor}
          className="addOfferMemberModal--selectAll">
          <Checkbox
            checked={selected.length === filteredMembers.length}
            onClick={onClickSelectAll}
          />
          <ColorTypo className="addOfferMemberModal--selectAllText" component="div">{t('LABEL_CHAT_TASK_CHON_TAT_CA')}</ColorTypo>
        </StyledDiv>
        {filteredMembers.map((member, i) => <OfferMemberItem
          key={i}
          isSelected={selected.indexOf(member.index) !== -1}
          onClick={onClickMember(member.index)}
          avatar={member.avatar}
          roles={compact([member.position, member.room]).join(' - ')}
          name={member.name}
          isDisable={disableIndexes.indexOf(member.index) !== -1}
        />)}
      </React.Fragment>
    </JobDetailModalWrap>
  )
}

export default AddOfferMemberModal
