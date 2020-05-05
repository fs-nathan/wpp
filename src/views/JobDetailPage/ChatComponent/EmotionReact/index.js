import { chatEmotion } from 'actions/chat/chat';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

function getTotalReact(data_emotion) {
  let total = 0;
  for (let index = 0; index < data_emotion.length; index++) {
    const { members } = data_emotion[index];
    total += members.length
  }
  return total;
}

function getMembersReact(data_emotion) {
  let membersString = '';
  for (let index = 0; index < data_emotion.length; index++) {
    const { members } = data_emotion[index];
    membersString += members.map(({ name }) => name).join(', ')
  }
  return membersString;
}

const EmotionReact = ({
  chatId,
  handleDetailEmotion,
  is_me,
  data_emotion = [],
}) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickQuickReact() {
    dispatch(chatEmotion(taskId, chatId, data_emotion[0].value))
  }

  return (
    <div className={clsx("EmotionReact", { "EmotionReact__self": is_me })} >
      <div className={clsx("EmotionReact--react", { "EmotionReact--react__self": is_me })}
        onClick={handleDetailEmotion}
      >
        {data_emotion.map(emo => <img
          key={emo.value}
          className="EmotionReact--image"
          src={emo.icon} alt="emo"
        />)}
        <div className="EmotionReact--totalReact" >
          {getTotalReact(data_emotion)}
        </div>
        <div className="EmotionReact--reactMember" >
          {getMembersReact(data_emotion)}
        </div>
      </div>
      <button className="EmotionReact--button" onClick={onClickQuickReact} >
        <img className="EmotionReact--image" src={data_emotion[0].icon} alt="emo"></img>
      </button>
    </div>
  );
}

EmotionReact.propTypes = {
  handleDetailEmotion: PropTypes.func.isRequired,
  data_emotion: PropTypes.array.isRequired,
};

export default EmotionReact;
