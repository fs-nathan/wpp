import { FormControl, MenuItem, TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomModal from '../../../../components/CustomModal';
import CustomTextbox from '../../../../components/CustomTextbox';
import ErrorBox from '../../../../components/ErrorBox';
import { useMaxlenString } from '../../../../hooks';
import './style.scss';

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_Member_UpdateUser_Modal___form-control ${className}`}
    {...props}
  />;

const CustomTextField = ({ className = '', ...props }) =>
  <TextField
    className={`view_Member_UpdateUser_Modal___text-field ${className}`}
    {...props}
  />;

function UpdateUser({
  updatedUser,
  open, setOpen,
  options,
  handleUpdateUser,
}) {

  const { t } = useTranslation();

  const [room, setRoom] = React.useState(null);
  const [position, setPosition] = React.useState(null);
  const [major, setMajor] = React.useState(null);
  const [level, setLevel] = React.useState(null);
  const [description, setDescription, errorDescription] = useMaxlenString('', 500);

  React.useEffect(() => {
    if (updatedUser) {
      setRoom(get(updatedUser, 'room_id'));
      setPosition(get(updatedUser, 'position_id'));
      setMajor(get(updatedUser, 'major_id'));
      setLevel(get(updatedUser, 'level_id'));
      setDescription(get(updatedUser, 'description', ''));
    }
    // eslint-disable-next-line
  }, [updatedUser]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={get(updatedUser, 'name', '')}
      canConfirm={!errorDescription}
      onConfirm={() => handleUpdateUser(
        get(updatedUser, 'id'),
        room,
        position,
        major,
        level,
        description,
      )}
      loading={options.loading}
    >
      {options.error !== null
        ? <ErrorBox />
        : <>
          <StyledFormControl fullWidth>
            <CustomTextField
              select
              variant="outlined"
              label={t("DMH.VIEW.MP.MODAL.UPT.ROOM")}
              value={room}
              onChange={evt => setRoom(evt.target.value)}
            >
              {options.rooms.map(room =>
                <MenuItem key={get(room, 'id')} value={get(room, 'id')}>
                  {get(room, 'name')}
                </MenuItem>
              )}
            </CustomTextField>
          </StyledFormControl>
          <StyledFormControl fullWidth>
            <CustomTextField
              select
              variant="outlined"
              label={t("DMH.VIEW.MP.MODAL.UPT.POSITION")}
              value={position}
              onChange={evt => setPosition(evt.target.value)}
            >
              {options.positions.map(position =>
                <MenuItem key={get(position, 'id')} value={get(position, 'id')}>
                  {get(position, 'name')}
                </MenuItem>
              )}
            </CustomTextField>
          </StyledFormControl>
          <StyledFormControl fullWidth>
            <CustomTextField
              select
              variant="outlined"
              label={t("DMH.VIEW.MP.MODAL.UPT.LEVEL")}
              value={level}
              onChange={evt => setLevel(evt.target.value)}
            >
              {options.levels.map(level =>
                <MenuItem key={get(level, 'id')} value={get(level, 'id')}>
                  {get(level, 'name')}
                </MenuItem>
              )}
            </CustomTextField>
          </StyledFormControl>
          <StyledFormControl fullWidth>
            <CustomTextField
              select
              variant="outlined"
              label={t("DMH.VIEW.MP.MODAL.UPT.MAJOR")}
              value={major}
              onChange={evt => setMajor(evt.target.value)}
            >
              {options.majors.map(major =>
                <MenuItem key={get(major, 'id')} value={get(major, 'id')}>
                  {get(major, 'name')}
                </MenuItem>
              )}
            </CustomTextField>
          </StyledFormControl>
          <CustomTextbox
            value={description}
            label={t("DMH.VIEW.MP.MODAL.UPT.DESC")}
            onChange={value => setDescription(value)}
            helperText={get(errorDescription, 'message', '')}
          />
        </>
      }
    </CustomModal>
  )
}

export default UpdateUser;
