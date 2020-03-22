import React, { useState } from 'react';

import ColorTypo from 'components/ColorTypo'
import SearchInput from 'components/SearchInput';
import DialogWrap from 'components/DialogWrap';
import OfferMemberItem from './OfferMemberItem';

import './styles.scss';

function AddOfferMemberModal({
  isOpen,
  handleClickClose,
  value = [],
  onChange,
  members,
}) {
  const [selected, setSelected] = useState(value);

  function onClickDone() {
    onChange(selected)
    handleClickClose();
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

  return (
    <DialogWrap
      title={"Thêm thành viên"}
      isOpen={isOpen}
      handleClickClose={handleClickClose}
      successLabel={"Hoàn Thành"}
      onClickSuccess={onClickDone}
    >
      <React.Fragment>
        <SearchInput placeholder='Tìm kiếm thành viên' />
        <ColorTypo className="addOfferMemberModal--selected">
          Đã chọn {selected.length} thành viên
          </ColorTypo>
        {members.map((member, i) => <OfferMemberItem
          key={i}
          isSelected={selected.indexOf(i) !== -1}
          onClick={onClickMember(i)}
          avatar={member.avatar}
          name={member.name} />)}
      </React.Fragment>
    </DialogWrap>
  )
}

export default AddOfferMemberModal