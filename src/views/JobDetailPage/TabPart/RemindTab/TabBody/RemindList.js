import React from 'react';
import { useSelector } from 'react-redux';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import RemindItem from './RemindItem';

const RemindList = (props) => {
  const remind = useSelector(state => state.taskDetail.taskRemind.remind);

  return remind.length ? (
    <ul className="remindList">
      {remind.map((item, idx) =>
        (
          <RemindItem key={idx} {...item} idx={idx} />
        )
      )}
    </ul>
  ) : (
      <NoDataPlaceHolder
        src="/images/no-aler.png"
        title="Chưa có nhắc hẹn được khởi tạo Click + để tạo mới nhắc hẹn">
      </NoDataPlaceHolder>
    );
}

export default RemindList