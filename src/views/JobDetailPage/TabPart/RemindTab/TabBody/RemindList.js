import React from 'react';
import RemindModal from '../RemindModal';
import { useSelector } from 'react-redux';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import RemindItem from './RemindItem';

const RemindList = (props) => {
  const remind = useSelector(state => state.taskDetail.taskRemind.remind);
  const [isRemind] = React.useState(true)
  const [open, _setOpen] = React.useState(false);
  const [elemState, _setElem] = React.useState(null)

  // const [data] = React.useState(__data);

  // Toogle popup array contains status of each popup
  const handleClickOpen = (item) => {
    _setOpen(true)
    _setElem(item)
  };

  const handleClickClose = () => {
    _setOpen(false)
  };

  return remind.length ? (
    <ul className="styled-list">
      {remind.map((item, idx) =>
        (
          <RemindItem key={idx} {...item} idx={idx} handleClickOpen={handleClickOpen} />
        )
      )}
      <RemindModal isOpen={open} handleClickClose={() => handleClickClose()} data={elemState} isRemind={isRemind} />
    </ul>
  ) : (
      <NoDataPlaceHolder
        src="/images/no-aler.png"
        title="Chưa có nhắc hẹn được khởi tạo Click + để tạo mới nhắc hẹn">
      </NoDataPlaceHolder>
    );
}

export default RemindList