import { FormControl } from '@material-ui/core';
import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import MySelect from 'components/MySelect';
import { CustomEventDispose, CustomEventListener, UPDATE_USER } from 'constants/events';
import { useMaxlenString } from 'hooks';
import { find, get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_Member_UpdateUser_Modal___form-control ${className}`}
    {...props}
  />;

function UpdateUser({
  updatedUser,
  open, setOpen,
  options,
  handleUpdateUser,
  activeLoading,
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

  React.useEffect(() => {
    const successClose = () => {
      setOpen(false);
      setRoom(null);
      setPosition(null);
      setMajor(null);
      setLevel(null);
      setDescription('');
    };
    CustomEventListener(UPDATE_USER, successClose);
    return () => CustomEventDispose(UPDATE_USER, successClose);
    // eslint-disable-next-line
  }, []);

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
      onCancle={() => setOpen(false)}
      loading={options.loading}
      activeLoading={activeLoading}
      manualClose={true}
    >
      <>
        <StyledFormControl fullWidth>
          <MySelect
            label={t("DMH.VIEW.MP.MODAL.UPT.ROOM")}
            options={options.rooms.map(room => ({
              label: get(room, 'name'),
              value: get(room, 'id'),
            }))}
            value={{
              label: get(find(options.rooms, { id: room }), 'name'),
              value: room,
            }}
            onChange={({ value: roomId }) => setRoom(roomId)}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <MySelect
            label={t("DMH.VIEW.MP.MODAL.UPT.POSITION")}
            options={options.positions.map(position => ({
              label: get(position, 'name'),
              value: get(position, 'id'),
            }))}
            value={{
              label: get(find(options.positions, { id: position }), 'name'),
              value: position,
            }}
            onChange={({ value: positionId }) => setPosition(positionId)}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <MySelect
            label={t("DMH.VIEW.MP.MODAL.UPT.LEVEL")}
            options={options.levels.map(level => ({
              label: get(level, 'name'),
              value: get(level, 'id'),
            }))}
            value={{
              label: get(find(options.levels, { id: level }), 'name'),
              value: level,
            }}
            onChange={({ value: levelId }) => setLevel(levelId)}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <MySelect
            label={t("DMH.VIEW.MP.MODAL.UPT.MAJOR")}
            options={options.majors.map(major => ({
              label: get(major, 'name'),
              value: get(major, 'id'),
            }))}
            value={{
              label: get(find(options.majors, { id: major }), 'name'),
              value: major,
            }}
            onChange={({ value: majorId }) => setMajor(majorId)}
          />
        </StyledFormControl>
        <CustomTextbox
          value={description}
          label={t("DMH.VIEW.MP.MODAL.UPT.DESC")}
          onChange={value => setDescription(value)}
          helperText={get(errorDescription, 'message', '')}
        />
      </>
    </CustomModal>
  )
}

export default UpdateUser;
