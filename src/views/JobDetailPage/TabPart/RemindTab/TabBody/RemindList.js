import React from 'react';
import RemindModal from '../RemindModal';
import { useSelector } from 'react-redux';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import RemindItem from './RemindItem';
import DetailRemind from '../DetailRemind';

const RemindList = (props) => {
  const remind = useSelector(state => state.taskDetail.taskRemind.remind);
  const [isRemind] = React.useState(true)
  const [open, _setOpen] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [itemSelected, setItemSelected] = React.useState(false);
  // Toogle popup array contains status of each popup
  const handleClickOpen = (item) => {
    _setOpen(true)
    setItemSelected(item)
  };

  const handleClickClose = () => {
    _setOpen(false)
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
      <RemindModal isOpen={open} handleClickClose={handleClickClose} data={itemSelected} isRemind={isRemind} />
    </ul>
  ) : (
      <NoDataPlaceHolder
        src="/images/no-aler.png"
        title="Chưa có nhắc hẹn được khởi tạo Click + để tạo mới nhắc hẹn">
      </NoDataPlaceHolder>
    );
}

export default RemindList