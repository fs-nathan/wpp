import { TextField, Typography } from '@material-ui/core';
import ColorPickerModal from "components/ColorPickerModal";
import CustomModal from 'components/CustomModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';
const Container = ({ className = '', ...props }) =>
  <div
    className={`view_CreatPeronsalRemindGroup_container ${className}`}
    {...props}
  />;

function CreateGroupPersonalRemind({
  open, setOpen, onConfirm
}) {

  const { t } = useTranslation();
  const [openModal, setOpenModal] = React.useState(false);
  const [color, setColor] = React.useState({ color: "#009cf3", selected: true });
  const [groupTitle, setGroupTitle] = React.useState('');

  function handleOnChangeBG(colors) {
    if (colors !== undefined && Array.isArray(colors)) {
      let color = colors.find(item => item.selected === true);
      setColor(color);
    }
  }

  return (
    <>
      <CustomModal
        title={t("views.calendar_page.modal.create_group_personal_remind.title_create")}
        open={open}
        setOpen={setOpen}
        canConfirm={groupTitle !== ''}
        onConfirm={() => onConfirm({ title: groupTitle, color: color.color })}
        height='mini'
        maxWidth='sm'
      >
        <Container>
          <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="view_CreatPeronsalRemindGroup_container_label">
            <Typography component={'span'}> {t('views.calendar_page.modal.create_group_personal_remind.group_title')}</Typography>
            <span>*</span>
          </abbr>
          <TextField
            id="group-name"
            variant="outlined"
            fullWidth
            size="small"
            value={groupTitle}
            onChange={({ target }) => setGroupTitle(target.value)}
            helperText={t('IDS_WP_REQUIRED')}
          />
          <div className="group_remind_color_avatar">
            <Typography component={'div'}> {t('views.calendar_page.modal.create_group_personal_remind.group_color')} </Typography>
            <div
              className="color_picked_block"
              onClick={() => setOpenModal(true)}
              style={{ borderColor: color.color }}
            >
              <div className="color_picked_inner" style={{ backgroundColor: color.color }}></div>
            </div>
          </div>
        </Container>
      </CustomModal>
      <ColorPickerModal
        open={openModal}
        setOpen={setOpenModal}
        handleOnChangeBG={colors => handleOnChangeBG(colors)}
        index={8}
      />
    </>
  )
}

export default CreateGroupPersonalRemind;