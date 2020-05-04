import { useTranslation } from 'react-i18next';
import { Avatar } from '@material-ui/core';
import CustomModal from 'components/CustomModal';
import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';

const DetailViewedModal = ({ isOpen, setOpen, data_emotion = [] }) => {
  const { t } = useTranslation();
  const viewedChatMembers = useSelector(state => state.chat.viewedChatMembers);


  return (
    <CustomModal
      open={isOpen}
      setOpen={setOpen}
      fullWidth
      title={t('LABEL_CHAT_TASK_THANH_VIEN_DA_XEM')}
      className="DetailViewedModal"
      cancleRender={null}
      confirmRender={null}
    >
      <div className="DetailViewedModal--container">
        {viewedChatMembers.map(({ id, avatar, name, role }) =>
          <div key={id} className="DetailViewedModal--member">
            <Avatar className="DetailViewedModal--avatar" src={avatar} />
            <div className="DetailViewedModal--name" >
              {name}
              <div className="DetailViewedModal--role" >
                {role}
              </div>
            </div>
          </div>
        )}

      </div>
    </CustomModal >
  );
};

export default DetailViewedModal;
