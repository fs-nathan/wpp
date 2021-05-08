import DateFnsUtils from '@date-io/date-fns';
import {Box, Button, FormControl, TextField, Typography} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiPlusCircle } from "@mdi/js";
import Icon from '@mdi/react';
import CustomAvatar from 'components/CustomAvatar';
import CustomSelect from 'components/CustomSelect';
import TimePicker from 'components/TimePicker';
import { listTimeSelect } from 'components/TimeSelect';
import {find, findIndex, get, map, pick} from 'lodash';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import AddOfferMemberModal from 'views/JobDetailPage/TabPart/OfferTab/AddOfferMemberModal';
import { bgColorSelector } from "../../../selectors";
import { membersSelector } from "./selectors";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import JobDetailModalWrap from "../../../../JobDetailPage/JobDetailModalWrap";
import OutlinedInputSelect from "../../../../JobDetailPage/TabPart/ProgressTab/OutlinedInputSelect";
import MySelect from "../../../../../components/MySelect";
import SelectGroupPersonalRemind from "../CreatePersonalRemind/SelectGroup"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_CreatPeronsalRemind_container ${className}`}
    {...props}
  />;
const StyledFormControl = ({ className = '', ...props }) =>
    <FormControl
        className={`view_ProjectGroup_CreateNew_Project_Modal___form-control ${className}`}
        {...props}
    />;

const DEFAULT_DATA = {
  selectedTime: listTimeSelect[16],
  selectedDate: moment().toDate(),
  selectedCategory: '',
  selectedCategoryName: "",
  selectedRepeatType: 0,
  notifyTimeType: 0,
  timeBefore: 30,
  content: '',
  frequency: 1
};

function UpdatePersonalRemind({
  open, setOpen, onConfirm, remindCategories, bgColor,
  members, categoryID, remind, isLoading = false
}) {

  const { t } = useTranslation();
  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  const [receiverListIndex, setReceiverListIndex] = React.useState([]);
  const [openReceiverDialog, setOpenReceiverDialog] = React.useState(false);
  const [openSelectGroupPersonalRemindModal, setOpenSelectGroupPersonalRemindModal] = React.useState(false);
  const badges = [
    {
      value: 0,
      label: t('LABEL_CHAT_TASK_NHAC_1_LAN'),
    },
    {
      value: 1,
      label: t('LABEL_CHAT_TASK_THEO_NGAY'),
    },
    {
      value: 2,
      label: t('LABEL_CHAT_TASK_THEO_TUAN'),
    },
    {
      value: 3,
      label: t('LABEL_CHAT_TASK_THEO_THANG'),
    },
  ]

  const handleChangeData = (attName, value) => {
    setDataMember(prevState => ({ ...prevState, [attName]: value }));
  };

  React.useEffect(() => {
    if (remind !== undefined) {
      handleChangeData("selectedTime", remind.time);
      handleChangeData("content", remind.content);
      handleChangeData("selectedCategory", remind.category_id);
      handleChangeData("selectedCategoryName", remind.category_name);
      handleChangeData("timeBefore", remind.remind_before);
      handleChangeData("selectedDate", remind.date);
      handleChangeData("frequency", remind.frequency);
      handleChangeData("selectedRepeatType", remind.type_remind);
      let receiverList = get(remind, "members_assign", []);
      let idxArr = [];
      receiverList.map((item) => {
        let idx = findIndex(members.members, { id: item.id });
        idxArr.push(idx);
      });
      setReceiverListIndex(idxArr);
    }
  }, [remind]);

  const handleReceiverChange = (value) => {
    setReceiverListIndex(value);
  }

  React.useEffect(() => {
    handleChangeData("selectedCategory", categoryID);
  }, [categoryID])

  function handleOnConfirm() {
    let userAssign = Object.values(pick(members.members, receiverListIndex));
    let model = {
      remindID: remind.id,
      categoryID: data.selectedCategory,
      content: data.content,
      dateRemind: `${moment(data.selectedDate).format("YYYY-MM-DD")} ${data.selectedTime}`,
      typeRemind: data.selectedRepeatType,
      remindBefore: data.notifyTimeType === 0 ? data.timeBefore : data.timeBefore * 60,
      userAssign: receiverListIndex.length !== 0 ? map(userAssign, "id") : [],
      frequency: data.frequency
    };
    onConfirm(model);
  }

  return (
    <>
      <JobDetailModalWrap
          maxWidth='sm'
          className="remindModal"
          title={t("views.calendar_page.modal.update_personal_remind.title")}
          open={open}
          setOpen={setOpen}
          confirmRender={() => t('IDS_WP_DONE')}
          onConfirm={() => handleOnConfirm()}
          actionLoading={isLoading}
          canConfirm={data.content !== '' && data.selectedDate !== null}
          manualClose
          onCancle={() => setOpen(false)}
      >
        <Container>
          <Box className="remind_group_container">
            <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="title">
              <Typography component={'span'} className="title"> {t('views.calendar_page.modal.create_personal_remind.choose_category')} </Typography>
              <span>*</span>
            </abbr>
            <div className="select-customer-from-input">
              <TextField
                placeholder={t('views.calendar_page.modal.create_personal_remind.choose_category')}
                className={"remind_group_container_input"}
                variant="outlined"
                fullWidth
                value={data.selectedCategoryName}
                onClick={() => setOpenSelectGroupPersonalRemindModal(true)}
                inputProps={{
                  readOnly: true
                }}
              />
              <ArrowDropDownIcon className="icon-arrow" />
            </div>
            <Typography component={'p'} className="create_remind_description"> {t('views.calendar_page.modal.create_personal_remind.description')} </Typography>
          </Box>
          <Box className="remind_setting_container">
            <div className="remind_setting_day">
              <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="title">
                <Typography component={'span'} className="title"> {t('views.calendar_page.modal.create_personal_remind.choose_day')} </Typography>
                <span>*</span>
              </abbr>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  inputVariant="outlined"
                  variant="inline"
                  ampm={false}
                  format="dd/MM/yyyy"
                  value={data.selectedDate}
                  onChange={(value) => handleChangeData("selectedDate", value)}
                  className="remind_setting_day_inputDate"
                  minDate={moment(data.selectedDate, "YYYY-MM-DD").format("YYYY-MM-DD[T]HH:mm:ss")}
                  autoOk={true}
                  invalidDateMessage={t('DATE_ERROR_FORMAT_MESSAGE')}
                  minDateMessage={t('DATE_ERROR_INTERVAL_MIN_MESSAGE')}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="remind_setting_time">
              <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="title">
                <Typography component={'span'} className="title"> {t('views.calendar_page.modal.create_personal_remind.choose_time')} </Typography>
                <span>*</span>
              </abbr>
              <TimePicker
                className="remind_setting_timeSelector"
                value={data.selectedTime}
                onChange={(value) => handleChangeData('selectedTime', value)}
                width={15}
              />
            </div>
            <div className="remind_setting_type">
              <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="title">
                <Typography component={'span'} className="title"> {t('views.calendar_page.modal.create_personal_remind.repeat_remind')} </Typography>
                <span>*</span>
              </abbr>
              <OutlinedInputSelect
                  commandSelect={badges}
                  selectedIndex={data.selectedRepeatType}
                  setOptions={typeId => { handleChangeData("selectedRepeatType", typeId); }}
              />
            </div>
            {
              data.selectedRepeatType !== 0 && (
                  <div className={"remind_setting_frequency"}>
                    <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="title">
                      <Typography component={'span'} className="title"> {t('views.calendar_page.modal.create_personal_remind.frequency')} </Typography>
                      <span>*</span>
                    </abbr>
                    <OutlinedInput
                        className={"remind_setting_frequency_input"}
                        value={data.frequency}
                        onChange={({target}) => handleChangeData('frequency', target.value)}
                        endAdornment={
                          <InputAdornment
                              position="end"
                              disableTypography={true}
                              variant={"filled"}
                          >
                            {t(`IDS_WP_REMIND_CALENDAR_FREQUENCY_${data.selectedRepeatType}`)}
                          </InputAdornment>
                        }
                    />
                  </div>
              )
            }
          </Box>
          <Box className="remind_setting_content">
            <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="title">
              <Typography component={'span'} className="title"> {t('views.calendar_page.modal.create_personal_remind.remind_content')} </Typography>
              <span>*</span>
            </abbr>
            <TextField
              placeholder={t('views.calendar_page.modal.create_personal_remind.content')}
              variant="outlined"
              multiline
              fullWidth
              value={data.content}
              onChange={({ target }) => handleChangeData("content", target.value)}
              rows={4}
              className="remind_setting_content_textFieldMuitiline"
            />
          </Box>
          <Box className="remind_setting_userAssign">
            <Typography component={'span'} className="title_normal"> {t('views.calendar_page.modal.create_personal_remind.member_assign')} </Typography>
            <Box className="remind_setting_userAssignBox">
              {
                receiverListIndex.length !== 0 && receiverListIndex.length < members.members.length &&
                Object.values(pick(members.members, receiverListIndex)).map((member) => {
                  return (
                    <Box className="remind_setting_userAssignItem">
                      <CustomAvatar
                        style={{ width: 20, height: 20 }}
                        src={get(member, 'avatar')} alt='avatar'
                      />
                      <span>{get(member, 'name')}</span>
                    </Box>
                  )
                })
              }
              {
                receiverListIndex.length !== 0 && receiverListIndex.length >= members.members.length && (
                  <Box className="remind_setting_userAssignAll">
                    {t('views.calendar_page.modal.create_weekly_calendar.all')}
                  </Box>
                )
              }
              <Button
                color="primary"
                startIcon={<Icon path={mdiPlusCircle} size={0.8} color={bgColor.color} />}
                onClick={() => setOpenReceiverDialog(true)}
                className="remind_setting_userAssignBox_buttonAdd"
              >
                <span className="remind_setting_userAssignBox_buttonAdd_title">{t('IDS_WP_COMMON_ADD')}</span>
              </Button>
            </Box>
          </Box>
        </Container>
      </JobDetailModalWrap>
      <AddOfferMemberModal
        setOpen={setOpenReceiverDialog}
        isOpen={openReceiverDialog}
        members={members.members}
        value={receiverListIndex}
        disableIndexes={[]}
        onChange={value => handleReceiverChange(value)}
      />
      {
        openSelectGroupPersonalRemindModal &&
        <SelectGroupPersonalRemind
          isOpen={true}
          setOpen={(value) => setOpenSelectGroupPersonalRemindModal(value)}
          selectedOption={(group) => {
            handleChangeData("selectedCategory", group.id)
            handleChangeData("selectedCategoryName", group.name)
          }}
          groupSelected={data.selectedCategory ? data.selectedCategory : null}
        />
      }
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  state => ({
    members: membersSelector(state),
    bgColor: bgColorSelector(state)
  }),
  mapDispatchToProps
)(UpdatePersonalRemind);