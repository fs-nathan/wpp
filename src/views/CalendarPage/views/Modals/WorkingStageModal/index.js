import DateFnsUtils from '@date-io/date-fns';
import { Box, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, Fade, IconButton } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import ColorTypo from 'components/ColorTypo';
import { isNil } from "lodash";
import moment from "moment";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import './styles.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction='down' ref={ref} {...props} />;
});

const DEFAULT_DATA = {
  selectedDateFrom: moment().toDate(),
  selectedDateTo: moment().add(1, 'day').toDate(),
  stageID: null
};

function WorkingStageModal({
  open, setOpen, onCancle = () => null,
  onConfirm, colors, workingStage
}) {

  const { t } = useTranslation();
  const bgColor = colors.find(item => item.selected === true);
  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  const [actionType, setActionType] = React.useState("CREATE");
  const handleChangeData = (attName, value) => {
    setDataMember(prevState => ({ ...prevState, [attName]: value }));
  };

  function handleCancle() {
    setOpen(false);
    onCancle();
  }
  function handleConfirm() {
    setOpen(false);
    onConfirm(actionType, data.stageID, data.selectedDateFrom, data.selectedDateTo);
  }

  React.useEffect(() => {
    if (!isNil(workingStage)) {
      handleChangeData("selectedDateFrom", moment(workingStage.start, "DD/MM/YYYY"));
      handleChangeData("selectedDateTo", moment(workingStage.end, "DD/MM/YYYY"));
      handleChangeData("stageID", workingStage.id);
      setActionType("EDIT");
    } else setActionType("CREATE");
  }, [workingStage]);

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
            actionType === "CREATE" ? t('views.calendar_page.modal.working_stage.create_title')
              : t('views.calendar_page.modal.working_stage.edit_title')
          }
        </ColorTypo>
        <IconButton onClick={() => handleCancle()}>
          <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
        </IconButton>
      </DialogTitle>
      <DialogContent className='comp_AlertModal___dialog-content'>
        <Box className="view_AddWorkingStage_container">
          <span>{t('views.calendar_page.modal.working_stage.description')}</span>
          <Box className="view_AddWorkingStage_form">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="view_AddWorkingStage_formControl">
                <span>{t('views.calendar_page.modal.working_stage.from_date')}</span>
                <KeyboardDatePicker
                  disableToolbar
                  inputVariant="outlined"
                  variant="inline"
                  ampm={false}
                  format="dd/MM/yyyy"
                  value={data.selectedDateFrom}
                  onChange={(value) => handleChangeData("selectedDateFrom", value)}
                  className={"view_AddWorkingStage_formControl_inputDate"}
                  autoOk={true}
                />
              </div>
              <div className="view_AddWorkingStage_formControl">
                <span>{t('views.calendar_page.modal.working_stage.to_date')}</span>
                <KeyboardDatePicker
                  disableToolbar
                  inputVariant="outlined"
                  variant="inline"
                  value={data.selectedDateTo}
                  minDate={data.selectedDateFrom}
                  onChange={(value) => handleChangeData("selectedDateTo", value)}
                  ampm={false}
                  format="dd/MM/yyyy"
                  className={"view_AddWorkingStage_formControl_inputDate"}
                  autoOk={true}
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
        <ButtonBase style={{ color: bgColor.color }} className='comp_AlertModal___accept-button' onClick={() => handleConfirm()}>
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
)(WorkingStageModal);