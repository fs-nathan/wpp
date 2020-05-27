import { FormControl } from '@material-ui/core';
import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import MySelect from 'components/MySelect';
import { CustomEventDispose, CustomEventListener, DETAIL_USER, LIST_USER_OF_GROUP, UPDATE_USER } from 'constants/events';
import { useMaxlenString } from 'hooks';
import { find, get, isNil } from 'lodash';
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
  doReloadUser,
}) {

  const { t } = useTranslation();

  const [room, setRoom] = React.useState(null);
  const [position, setPosition] = React.useState(null);
  const [major, setMajor] = React.useState(null);
  const [level, setLevel] = React.useState(null);
  const [description, setDescription] = useMaxlenString('', 500);
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(-1);

  React.useEffect(() => {
    setActiveLoading((activeMask === 3 || activeMask === -1) ? false : true);
    if (activeMask === 3) {
      setOpen(false);
      setRoom(null);
      setPosition(null);
      setMajor(null);
      setLevel(null);
      setDescription('');
    }
    // eslint-disable-next-line
  }, [activeMask]);

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
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(UPDATE_USER.SUCCESS, doReloadUser);
    CustomEventListener(UPDATE_USER.FAIL, fail);
    return () => {
      CustomEventDispose(UPDATE_USER.SUCCESS, doReloadUser);
      CustomEventDispose(UPDATE_USER.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [updatedUser]);

  React.useEffect(() => {
    const success = (bit) => () => {
      setActiveMask(oldMask => oldMask | (1 << bit));
    };
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(DETAIL_USER.SUCCESS, success(0));
    CustomEventListener(LIST_USER_OF_GROUP.SUCCESS, success(1));
    CustomEventListener(DETAIL_USER.FAIL, fail);
    CustomEventListener(LIST_USER_OF_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(DETAIL_USER.SUCCESS, success(0));
      CustomEventDispose(LIST_USER_OF_GROUP.SUCCESS, success(1));
      CustomEventDispose(DETAIL_USER.FAIL, fail);
      CustomEventDispose(LIST_USER_OF_GROUP.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [updatedUser]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={get(updatedUser, 'name', '')}
      canConfirm={!isNil(room) && !isNil(position) && !isNil(major) && !isNil(level)}
      onConfirm={() => {
        handleUpdateUser(
          get(updatedUser, 'id'),
          room,
          position,
          major,
          level,
          description,
        );
        setActiveMask(0);
      }}
      onCancle={() => setOpen(false)}
      loading={options.loading}
      activeLoading={activeLoading}
      manualClose={true}
    >
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
        className='view_Member_UpdateUser_Modal___text-box'
        value={description}
        label={t("DMH.VIEW.MP.MODAL.UPT.DESC")}
        onChange={newDescription => setDescription(newDescription)}
        multiline={true}
      />
    </CustomModal>
  )
}

export default UpdateUser;
