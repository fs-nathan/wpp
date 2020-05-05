import { chatEmotion } from 'actions/chat/chat';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';


const ReactEmotionPopup = ({ chatId }) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const emotionsList = useSelector(state => state.chat.emotionsList);

  function handleClickEmo(emo) {
    return () => {
      dispatch(chatEmotion(taskId, chatId, emo))
    }
  }

  return (
    <div className="ReactEmotionPopup">
      {emotionsList.map(emo =>
        <div key={emo.value} className="ReactEmotionPopup--menuItem" onClick={handleClickEmo(emo.value)}>
          <img className="ReactEmotionPopup--image" src={emo.icon} alt="emo"></img>
        </div>
      )}
    </div>
  );
}

ReactEmotionPopup.propTypes = {
  chatId: PropTypes.string.isRequired,
};

export default ReactEmotionPopup;
