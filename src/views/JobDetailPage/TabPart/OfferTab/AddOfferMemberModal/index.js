import ColorTypo from 'components/ColorTypo';
import CustomModal from 'components/CustomModal';
import SearchInput from 'components/SearchInput';
import React, { useState } from 'react';
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

  function handleChangeSearch(evt) {
    setSearchValue(evt.target.value)
  }

  const filteredMembers = members
    .map((member, index) => ({ ...member, index }))
    .filter(({ name }) => name.indexOf(searchValue) !== -1)

  return (
    <CustomModal
      title={"Thêm thành viên"}
      open={isOpen}
      setOpen={setOpen}
      confirmRender={() => "Hoàn Thành"}
      onConfirm={onClickDone}
      className="addOfferMemberModal"
    >
      <React.Fragment>
        <SearchInput placeholder='Tìm kiếm thành viên'
          value={searchValue}
          onChange={handleChangeSearch}
        />
        <ColorTypo className="addOfferMemberModal--selected">
          Đã chọn {selected.length} thành viên
          </ColorTypo>
        {filteredMembers.map((member, i) => <OfferMemberItem
          key={i}
          isSelected={selected.indexOf(member.index) !== -1}
          onClick={onClickMember(member.index)}
          avatar={member.avatar}
          roles={member.roles}
          name={member.name}
          isDisable={disableIndexes.indexOf(member.index) !== -1}
        />)}
      </React.Fragment>
    </CustomModal>
  )
}

export default AddOfferMemberModal