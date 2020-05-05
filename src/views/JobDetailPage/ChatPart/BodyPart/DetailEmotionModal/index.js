import { AppBar, Avatar, Tab, Tabs } from '@material-ui/core';
import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

const DetailEmotionModal = ({ isOpen, setOpen, data_emotion = [] }) => {
  const { t } = useTranslation();
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newTab) => {
    // console.log('newTab', newTab)
    setTab(newTab);
  };

  const all = [];
  for (let index = 0; index < data_emotion.length; index++) {
    const data = data_emotion[index];
    const memberWithIcon = data.members.map(member => ({ ...member, icon: data.icon }))
    all.push(...memberWithIcon)
  }

  const { members = [], icon } = data_emotion[tab - 1] || {};

  const interactedMembers = (tab === 0) ? all : members;

  return (
    <CustomModal
      open={isOpen}
      setOpen={setOpen}
      fullWidth
      title={t('LABEL_CHAT_TASK_BIEU_CAM')}
      className="DetailEmotionModal"
      cancleRender={null}
      confirmRender={null}
    >
      <div className="DetailEmotionModal--container">
        <AppBar position="static">
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
          >
            <Tab label={`Tất cả (${all.length})`} />
            {data_emotion.map(({ icon, value, members = [] }) =>
              <Tab icon={<img alt="icon" className="DetailEmotionModal--tabIcon" src={icon} key={value} />} label={` (${members.length})`} />
            )}
          </Tabs>
        </AppBar>
        {interactedMembers.map(({ id, avatar, name, icon: src }) =>
          <div key={id} className="DetailEmotionModal--member">
            <Avatar className="DetailEmotionModal--avatar" src={avatar} />
            {name}
            <img className="DetailEmotionModal--icon" src={src || icon} alt="icon" />
          </div>
        )}

      </div>
    </CustomModal >
  );
};

export default DetailEmotionModal;
