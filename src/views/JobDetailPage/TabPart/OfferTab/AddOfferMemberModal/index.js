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
}) {
  const [selected, setSelected] = useState(value);

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

  return (
    <CustomModal
      title={"Thêm thành viên"}
      open={isOpen}
      setOpen={setOpen}
      confirmRender={() => "Hoàn Thành"}
      onConfirm={onClickDone}
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
    </CustomModal>
  )
}

export default AddOfferMemberModal