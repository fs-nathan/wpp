import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import RemindItem from './RemindItem';

const RemindList = (props) => {
  const { t } = useTranslation();
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
        title={t('LABEL_CHAT_TASK_CHUA_CO_NHAC_HEN')}>
      </NoDataPlaceHolder>
    );
}

export default RemindList