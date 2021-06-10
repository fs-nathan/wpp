import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  actionUpdateColorGroup,
  actionFetchListColor
} from '../../../../actions/setting/setting';
import {
  actionGetProfile,
  getProfileService
} from '../../../../actions/system/system';
import { actionToast } from '../../../../actions/system/system';
import CustomModal from '../../../../components/CustomModal';
import './SettingGroupRight.scss';

function PickColorModal(props) {
  const { t } = useTranslation();
  const [colors, setColors] = useState(props.colors || []);

  useEffect(() => {
    setColors(props.colors);
  }, [props.colors]);

  const getProfile = async () => {
    try {
      const { data } = await getProfileService();
      if (data.data) props.actionGetProfile(data.data);
    } catch (error) {}
  };

  const handleSelectedColor = index => {
    const newList = colors.map((item, idx) => ({
      color: item.color,
      selected: idx === index
    }));
    setColors(newList);
  };

  const handleOnChangeBG = async () => {
    try {
      const selectedColor = colors.find(item => item.selected === true);
      await actionUpdateColorGroup(selectedColor.color);
      props.actionFetchListColor();
      getProfile();
      props.setOpen(false);
    } catch (error) {
      props.actionToast('error', t('IDS_WP_ERROR_CHANGE_COLOR_GROUP'));
      setTimeout(() => props.actionToast(null, ''), 3000);
    }
  };

  const { open, setOpen } = props;
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={t('IDS_WP_SETUP_COLOR')}
      className="pick-color-modal"
      onConfirm={handleOnChangeBG}
      height={"miniWide"}
    >
      <div className="pick-color-content list-color">
        {colors.map((item, idx) => (
          <div
            className="item-outer"
            style={{ borderColor: item.selected ? item.color : '#FFF' }}
            key={idx}
          >
            <span
              className="item-color"
              onClick={() => handleSelectedColor(idx)}
              style={{ background: item.color }}
            />
          </div>
        ))}
      </div>
    </CustomModal>
  );
}

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  {
    actionFetchListColor,
    actionToast,
    actionGetProfile
  }
)(PickColorModal);
