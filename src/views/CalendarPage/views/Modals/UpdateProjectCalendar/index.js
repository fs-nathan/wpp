import { TextField, Typography } from '@material-ui/core';
import CustomModal from 'components/CustomModal';
import { get } from "lodash";
import React from 'react';
import { useTranslation } from 'react-i18next';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_CreateProjectCalendar_Modal_container ${className}`}
    {...props}
  />;

const DEFAULT_DATA = {
  name: '',
  description: ''
};

function UpdateProjectCalendar({
  open, setOpen, onConfirm, schedule, isLoading = false,
}) {
  const { t } = useTranslation();
  const [data, setDataMember] = React.useState(DEFAULT_DATA);
  const handleChangeData = (attName, value) => {
    setDataMember(prevState => ({ ...prevState, [attName]: value }));
  };

  React.useEffect(() => {
    handleChangeData("name", get(schedule, "name", ""));
    handleChangeData("description", get(schedule, "description", ""));
  }, [schedule]);

  return (
    <>
      <CustomModal
        title={t("views.calendar_page.modal.create_project_calendar.edit_title")}
        open={open}
        setOpen={setOpen}
        height='mini'
        maxWidth='sm'
        onConfirm={() => onConfirm(data.name, data.description)}
        canConfirm={data.name !== "" && data.description !== ""}
        actionLoading={isLoading}
      >
        <Container>
          <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="view_CreateProjectCalendar_label">
            <Typography component={'span'}> {t('views.calendar_page.modal.create_project_calendar.name')} </Typography>
            <span>*</span>
          </abbr>
          <TextField
            id="calendar-name"
            variant="outlined"
            size="small"
            value={data.name}
            onChange={({ target }) => handleChangeData('name', target.value)}
          />
          <abbr title={t('IDS_WP_REQUIRED_LABEL')} className="view_CreateProjectCalendar_label">
            <Typography component={'span'}> {t('views.calendar_page.modal.create_project_calendar.name')} </Typography>
            <span>*</span>
          </abbr>
          <TextField
            id="calendar-descrtiption"
            value={data.description}
            size="small"
            variant="outlined"
            className="input_text"
            multiline
            rows={7}
            fullWidth
            onChange={({ target }) => handleChangeData('description', target.value)}
          />
        </Container>
      </CustomModal>
    </>
  )
}

export default UpdateProjectCalendar;