import CustomModal from 'components/CustomModal';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import './styles.scss';

function ColorPickerModal({
  handleOnChangeBG, index,
  open, setOpen, colors
}) {
  const { t } = useTranslation();
  const [listColors, setListColors] = useState(colors ?? []);

  const handleSelectedColor = index => {
    const newList = colors.map((item, idx) => ({
      color: item.color,
      selected: idx === index
    }));
    setListColors(newList);
  };

  React.useEffect(() => {
    handleSelectedColor(index);
  }, [colors]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={t('IDS_WP_SETUP_COLOR')}
      className="pick-color-modal"
      onConfirm={() => handleOnChangeBG(listColors)}
      height={"miniWide"}
    >
      <div className="pick-color-content list-color">
        {listColors.map((item, idx) => (
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
  })
)(ColorPickerModal);