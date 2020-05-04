import DateFnsUtils from '@date-io/date-fns';
import { Box, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Fade, IconButton, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import ColorTypo from 'components/ColorTypo';
import TimePicker from 'components/TimePicker';
import { listTimeSelect } from 'components/TimeSelect';
import { isEmpty, isNil } from "lodash";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import './styles.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
});

const DEFAULT_DATA = {
  selectedTimeStart: listTimeSelect[16],
  selectedTimeEnd: listTimeSelect[16],
  shiftName: '',
  shiftID: null
};

function ShiftStageModal({
  open, setOpen, onCancle = () => null,
  onConfirm, colors, shiftStage
}) {

  const { t } = useTranslation();
  const bgColor = colors.find(item => item.selected === true);
  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  const [actionType, setActionType] = React.useState("CREATE");
  const [canConfirm, setCanConfirm] = React.useState(false);
  const handleChangeData = (attName, value) => {
    setDataMember(prevState => ({ ...prevState, [attName]: value }));
  };

  function handleCancle() {
    setOpen(false);
    onCancle();
  }

  function handleConfirm() {
    setOpen(false);
    onConfirm(actionType, data);
  }

  React.useEffect(() => {
    if (!isNil(shiftStage)) {
      handleChangeData("stageID", shiftStage.id);
      handleChangeData("shiftName", shiftStage.name);
      handleChangeData("selectedTimeStart", shiftStage.start);
      handleChangeData("selectedTimeEnd", shiftStage.end);
      setActionType("EDIT");
    } else setActionType("CREATE");
  }, [shiftStage, open]);

  React.useEffect(() => {
    if (isEmpty(data.shiftName)) setCanConfirm(false);
    else setCanConfirm(true);
  }, [data.shiftName]);

  return (
    <Dialog
      className='comp_AlertModal___dialog'
      maxWidth='sm'
      open={open}
      TransitionComponent={Transition}
      onClose={() => handleCancle()}
      aria-labelledby="alert-dialog-slide-title"
    >
      <DialogTitle className='comp_AlertModal___dialog-title' id="alert-dialog-slide-title">
        <ColorTypo uppercase>
          {
            actionType === "CREATE" ? t('views.calendar_page.modal.shift_stage.create_title')
              : t('views.calendar_page.modal.shift_stage.edit_title')
          }
        </ColorTypo>
        <IconButton onClick={() => handleCancle()}>
          <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
        </IconButton>
      </DialogTitle>
      <DialogContent className='comp_AlertModal___dialog-content'>
        <Box className="view_ShiftStage_container">
          <Box className="view_ShiftStage_form">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="view_ShiftStage_formControl">
                <span>{t('views.calendar_page.modal.shift_stage.shift_name')}</span>
                <TextField
                  variant="outlined"
                  size={"small"}
                  value={data.shiftName}
                  className="view_ShiftStage_formControl_textField"
                  onChange={({ target }) => handleChangeData('shiftName', target.value)}
                />
              </div>
              <div className="view_ShiftStage_formControl">
                <span>{t('views.calendar_page.modal.shift_stage.time_start')}</span>
                <TimePicker
                  value={data.selectedTimeStart}
                  onChange={(value) => handleChangeData('selectedTimeStart', value)}
                />
              </div>
              <div className="view_ShiftStage_formControl">
                <span>{t('views.calendar_page.modal.shift_stage.time_end')}</span>
                <TimePicker
                  value={data.selectedTimeEnd}
                  onChange={(value) => handleChangeData('selectedTimeEnd', value)}
                />
              </div>
            </MuiPickersUtilsProvider>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className='comp_AlertModal___dialog-actions'>
        <ButtonBase className='comp_AlertModal___cancle-button' onClick={() => handleCancle()}>
          {t('DMH.COMP.ALERT_MODAL.CANCLE_BTN')}
        </ButtonBase>
        <ButtonBase
          style={{ color: bgColor.color, opacity: canConfirm ? 1 : 0.5 }} className='comp_AlertModal___accept-button'
          onClick={() => handleConfirm()}
          disabled={!canConfirm}
        >
          {t('IDS_WP_DONE')}
        </ButtonBase>
      </DialogActions>
    </Dialog>
  )
}

export default connect(state => ({
  colors: state.setting.colors
}),
  {},
)(ShiftStageModal);