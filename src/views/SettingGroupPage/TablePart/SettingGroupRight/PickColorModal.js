import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionChangeBGMenu } from '../../../../actions/setting/setting';
import CustomModal from '../../../../components/CustomModal';
import './SettingGroupRight.scss';

function PickColorModal(props) {
  const [colors, setColors] = useState(props.colors || []);

  const handleSelectedColor = index => {
    const newList = colors.map((item, idx) => ({
      value: item.value,
      selected: idx === index
    }));
    setColors(newList);
  };

  const handleOnChangeBG = () => {
    props.actionChangeBGMenu(colors);
    props.setOpen(false);
  };

  const { open, setOpen } = props;
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="THIẾT LẬP MÀU"
      onConfirm={handleOnChangeBG}
    >
      <div className="pick-color-modal list-color">
        {colors.map((item, idx) => (
          <div
            className="item-outer"
            style={{ borderColor: item.selected ? item.value : '#FFF' }}
            key={idx}
          >
            <span
              className="item-color"
              onClick={() => handleSelectedColor(idx)}
              style={{ background: item.value }}
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
    actionChangeBGMenu
  }
)(PickColorModal);
