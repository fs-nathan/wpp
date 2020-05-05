import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { mdiPlusCircle } from "@mdi/js";
import Icon from '@mdi/react';
import CustomAvatar from 'components/CustomAvatar';
import CustomModal from 'components/CustomModal';
import TimeSelect, { listTimeSelect } from 'components/TimeSelect';
import { findIndex, get, map, pick } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import AddOfferMemberModal from 'views/JobDetailPage/TabPart/OfferTab/AddOfferMemberModal';
import { membersSelector } from "./selectors";

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_CreatPeronsalRemind_container ${className}`}
    {...props}
  />;

const DEFAULT_DATA = {
  selectedTime: listTimeSelect[16],
  selectedDate: moment().toDate(),
  selectedCategory: '',
  selectedRepeatType: 0,
  notifyTimeType: 0,
  timeBefore: 30,
  content: '',
};

function UpdatePersonalRemind({
  open, setOpen, onConfirm, remindCategories,
  members, categoryID, remind
}) {

  const { t } = useTranslation();
  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  const [receiverListIndex, setReceiverListIndex] = React.useState([]);
  const [openReceiverDialog, setOpenReceiverDialog] = React.useState(false);

  const handleChangeData = (attName, value) => {
    setDataMember(prevState => ({ ...prevState, [attName]: value }));
  };

  React.useEffect(() => {
    if (remind !== undefined) {
      handleChangeData("selectedTime", remind.time);
      handleChangeData("content", remind.content);
      handleChangeData("selectedCategory", remind.category_id);
      handleChangeData("timeBefore", remind.remind_before);
      handleChangeData("selectedDate", remind.date);
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
      userAssign: receiverListIndex.length !== 0 ? map(userAssign, "id") : []
    };
    onConfirm(model);
  }

  return (
    <>
      <CustomModal
        title={t("views.calendar_page.modal.update_personal_remind.title")}
        open={open}
        setOpen={setOpen}
        canConfirm={data.content !== ''}
        confirmRender={() => t('views.calendar_page.modal.update_personal_remind.title')}
        onConfirm={() => handleOnConfirm()}
        maxWidth='sm'
      >
        <Container>
          <Box className="remind_group_container">
            <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="title">
              <Typography component={'span'}> {t('views.calendar_page.modal.create_personal_remind.choose_category')} </Typography>
              <span>*</span>
            </abbr>
            <Select
              className="remind_group_selector"
              id="remind_group_selector"
              fullWidth
              variant="outlined"
              value={data.selectedCategory}
              onChange={({ target }) => handleChangeData("selectedCategory", target.value)}
            >
              {
                remindCategories !== undefined && Array.isArray(remindCategories)
                &&
                remindCategories.map((item, index) => {
                  return (
                    <MenuItem value={get(item, "id")} key={get(item, "item")}>{get(item, "name")}</MenuItem>
                  )
                })
              }
            </Select>
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
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="remind_setting_time">
              <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="title">
                <Typography component={'span'} className="title"> {t('views.calendar_page.modal.create_personal_remind.choose_time')} </Typography>
                <span>*</span>
              </abbr>
              <TimeSelect
                className="remind_setting_timeSelector"
                value={data.selectedTime}
                onChange={({ target }) => handleChangeData('selectedTime', target.value)}
              />
            </div>
            <div className="remind_setting_type">
              <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="title">
                <Typography component={'span'} className="title"> {t('views.calendar_page.modal.create_personal_remind.repeat_remind')} </Typography>
                <span>*</span>
              </abbr>
              <Select
                className="remind_setting_type_selector"
                fullWidth
                variant="outlined"
                value={data.selectedRepeatType}
                onChange={({ target }) => handleChangeData('selectedRepeatType', target.value)}
              >
                <MenuItem value={0} key={`remind_repeat_type_0`}>{t('views.calendar_page.modal.create_personal_remind.one_time')}</MenuItem>
                <MenuItem value={1} key={`remind_repeat_type_1`}>{t('views.calendar_page.modal.create_personal_remind.daily')}</MenuItem>
                <MenuItem value={2} key={`remind_repeat_type_2`}>{t('views.calendar_page.modal.create_personal_remind.weekly')}</MenuItem>
                <MenuItem value={3} key={`remind_repeat_type_3`}>{t('views.calendar_page.modal.create_personal_remind.monthly')}</MenuItem>
              </Select>
            </div>
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
            />
          </Box>
          <Box className="remind_setting_userAssign">
            <Typography component={'span'} className="title_normal"> {t('views.calendar_page.modal.create_personal_remind.member_assign')} </Typography>
            <Box className="remind_setting_userAssignBox">
              {
                receiverListIndex.length !== 0 &&
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
              <Button
                color="primary"
                startIcon={<Icon path={mdiPlusCircle} size={1} color={"#009CF3"} />}
                onClick={() => setOpenReceiverDialog(true)}
                className="remind_setting_userAssignBox_buttonAdd"
              >
                {t('IDS_WP_COMMON_ADD')}
              </Button>
            </Box>
          </Box>
        </Container>
      </CustomModal>
      <AddOfferMemberModal
        setOpen={setOpenReceiverDialog}
        isOpen={openReceiverDialog}
        members={members.members}
        value={receiverListIndex}
        disableIndexes={[]}
        onChange={value => handleReceiverChange(value)}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  state => ({
    members: membersSelector(state)
  }),
  mapDispatchToProps
)(UpdatePersonalRemind);