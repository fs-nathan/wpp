import { mdiThumbUpOutline } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
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
  handleDetailEmotion,
  is_me,
  data_emotion = [],
}) => {

  return (
    <div className={clsx("EmotionReact", { "EmotionReact__self": is_me })} >
      <div className="EmotionReact--react" onClick={handleDetailEmotion} >
        {data_emotion.map(emo => <img key={emo.value} className="EmotionReact--image" src={emo.icon} alt="emo"></img>)}
        {getTotalReact(data_emotion)}
        <div className="EmotionReact--reactMember" >
          {getMembersReact(data_emotion)}
        </div>
      </div>
      <button className="EmotionReact--button" onClick={handleDetailEmotion} >
        <Icon className="EmotionReact--icon" path={mdiThumbUpOutline} />
      </button>
    </div>
  );
}

EmotionReact.propTypes = {
  handleDetailEmotion: PropTypes.func.isRequired,
  data_emotion: PropTypes.array.isRequired,
};

export default EmotionReact;
