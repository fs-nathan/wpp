import React from 'react';
import { useSelector } from 'react-redux';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import DetailRemind from '../DetailRemind';
import RemindModal from '../RemindModal';
import RemindItem from './RemindItem';

const RemindList = (props) => {
  const remind = useSelector(state => state.taskDetail.taskRemind.remind);
  const [open, setOpen] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [itemSelected, setItemSelected] = React.useState(false);
  // Toogle popup array contains status of each popup
  const handleClickOpen = (item) => {
    setOpen(true)
    setItemSelected(item)
  };

  function onClickDetail(item) {
    return () => {
      setItemSelected(item)
      setOpenDetail(true)
    }
  }

  function openEdit() {
    setOpenDetail(false)
    handleClickOpen(itemSelected)
  }
  return remind.length ? (
    <ul className="styled-list">
      {remind.map((item, idx) =>
        (
          <RemindItem key={idx} {...item} idx={idx}
            onClick={onClickDetail(item)}
            handleClickOpen={handleClickOpen} />
        )
      )}
      <DetailRemind
        isOpen={openDetail}
        handleCloseModal={() => setOpenDetail(false)}
        handleOpenEdit={openEdit}
        item={itemSelected} />
      <RemindModal isOpen={open} setOpen={setOpen} data={itemSelected} isRemind />
    </ul>
  ) : (
      <NoDataPlaceHolder
        src="/images/no-aler.png"
        title="Chưa có nhắc hẹn được khởi tạo Click + để tạo mới nhắc hẹn">
      </NoDataPlaceHolder>
    );
}

export default RemindList