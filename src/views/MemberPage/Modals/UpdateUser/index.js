import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormControl, TextField } from '@material-ui/core';
import ColorTypo from '../../../../components/ColorTypo';
import CustomSelect from '../../../../components/CustomSelect';
import ErrorBox from '../../../../components/ErrorBox';
import LoadingBox from '../../../../components/LoadingBox';
import CustomModal from '../../../../components/CustomModal';
import { useRequiredString } from '../../../../hooks';
import { listRoom } from '../../../../actions/room/listRoom';
import { listPosition } from '../../../../actions/position/listPosition';
import { listMajor } from '../../../../actions/major/listMajor';
import { listLevel } from '../../../../actions/level/listLevel';
import { updateUser } from '../../../../actions/user/updateUser';
import { connect } from 'react-redux';
import { get, find } from 'lodash';

const StyledFormControl = styled(FormControl)`
  min-width: 300px;
  max-width: 100%;
  & > * {
    margin-bottom: 10px;
    font-size: 12px;
  }
`;

function UpdateUser({ updatedUser, open, setOpen, listRoom, listPosition, listMajor, listLevel, doUpdateUser }) {

  const { t } = useTranslation();
  const { data: { rooms }, error: listRoomError, laoding: listRoomLoading } = listRoom;
  const { data: { positions }, error: listPositionError, laoding: listPositionLoading } = listPosition;
  const { data: { majors }, error: listMajorError, laoding: listMajorLoading } = listMajor;
  const { data: { levels }, error: listLevelError, laoding: listLevelLoading } = listLevel;

  const [room, setRoom] = React.useState(find(rooms, { id: get(updatedUser, 'room_id', '') }));
  const [position, setPosition] = React.useState(find(positions, { id: get(updatedUser, 'position_id', '') }));
  const [major, setMajor] = React.useState(find(majors, { id: get(updatedUser, 'major_id', '') }));
  const [level, setLevel] = React.useState(find(levels, { id: get(updatedUser, 'level_id', '') }));
  const [description, setDescription, errorDescription] = useRequiredString(get(updatedUser, 'description', ''), 500);
  
  const loading = listRoomLoading || listPositionLoading || listMajorLoading || listLevelLoading;
  const error = listRoomError || listPositionError || listMajorError || listLevelError;

  React.useEffect(() => {
    setDescription(get(updatedUser, 'description', ''));
  }, [updatedUser, setDescription]);

  React.useEffect(() => {
    setRoom(find(rooms, { id: get(updatedUser, 'room_id', '') }));
  }, [rooms, updatedUser]);

  React.useEffect(() => {
    setPosition(find(positions, { id: get(updatedUser, 'position_id', '') }));
  }, [positions, updatedUser]);

  React.useEffect(() => {
    setMajor(find(majors, { id: get(updatedUser, 'major_id', '') }));
  }, [majors, updatedUser]);

  React.useEffect(() => {
    setLevel(find(levels, { id: get(updatedUser, 'level_id', '') }));
  }, [levels, updatedUser]);

  function handleUpdateUser(evt) {
    doUpdateUser({
      userId: get(updatedUser, 'id'),
      roomId: get(room, 'id'),
      positionId: get(position, 'id'),
      majorId: get(major, 'id'),
      levelId: get(level, 'id'),
      description,
    });
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title={get(updatedUser, 'name', '')}
        canConfirm={!errorDescription}
        onConfirm={() => handleUpdateUser()}
      >
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!loading && error === null && (
          <React.Fragment>
            <StyledFormControl fullWidth>
              <label htmlFor='room-select'>
                {t("views.user_page.modals.update_user.room_select")}
              </label>
              <CustomSelect
                options={
                  rooms.map(room => ({
                      value: get(room, 'id'),
                      label: get(room, 'name', ''),
                    })
                  )}
                value={{
                  value: get(room, 'id'),
                  label: get(room, 'name', '')
                }}
                onChange={({ value: roomId }) => setRoom(find(rooms, { id: roomId }))}
              />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <label htmlFor='position-select'>
                {t("views.user_page.modals.update_user.position_select")}
              </label>
              <CustomSelect
                options={
                  positions.map(position => ({
                      value: get(position, 'id'),
                      label: get(position, 'name', ''),
                    })
                  )}
                value={{
                  value: get(position, 'id'),
                  label: get(position, 'name', ''),
                }}
                onChange={({ value: positionId }) => setPosition(find(positions, { id: positionId }))}
              />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <label htmlFor='level-select'>
                {t("views.user_page.modals.update_user.level_select")}
              </label>
              <CustomSelect
                options={
                  levels.map(level => ({
                      value: get(level, 'id'),
                      label: get(level, 'name', ''),
                    })
                  )}
                value={{
                  value: get(level, 'id'),
                  label: get(level, 'name', ''),
                }}
                onChange={({ value: levelId }) => setLevel(find(levels, { id: levelId }))}
              />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <label htmlFor='major-select'>
                {t("views.user_page.modals.update_user.major_select")}
              </label>
              <CustomSelect
                options={
                  majors.map(major => ({
                      value: get(major, 'id'),
                      label: get(major, 'name', ''),
                    })
                  )}
                value={{
                  value: get(major, 'id'),
                  label: get(major, 'name', ''),
                }}
                onChange={({ value: majorId }) => setMajor(find(majors, { id: majorId }))}
              />
            </StyledFormControl>
            <TextField 
              id='description'
              value={description}
              onChange={evt => setDescription(evt.target.value)}
              multiline
              margin="normal"
              variant="outlined"
              rowsMax={4}
              label='Mô tả công việc'
              fullWidth
              helperText={
                <ColorTypo component='span' color='red'>
                  {get(errorDescription, 'message', '')}
                </ColorTypo>
              }
            />
          </React.Fragment>
        )}
      </CustomModal>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listRoom: state.room.listRoom,
    listLevel: state.level.listLevel,
    listMajor: state.major.listMajor,
    listPosition: state.position.listPosition,
    updateUser: state.user.updateUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doListRoom: () => dispatch(listRoom()),
    doListLevel: () => dispatch(listLevel()),
    doListMajor: () => dispatch(listMajor()),
    doListPosition: () => dispatch(listPosition()),
    doUpdateUser: ({ userId, roomId, levelId, majorId, positionId, description }) => dispatch(updateUser({ userId, roomId, levelId, majorId, positionId, description })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateUser);
