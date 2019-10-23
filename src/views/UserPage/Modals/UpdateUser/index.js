import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { 
  FormControl, InputLabel, Select, MenuItem, TextField 
} from '@material-ui/core';
import ColorTypo from '../../../../components/ColorTypo';
import ErrorBox from '../../../../components/ErrorBox';
import LoadingBox from '../../../../components/LoadingBox';
import CustomModal from '../../../../components/CustomModal';
import { listRoom } from '../../../../actions/room/listRoom';
import { listPosition } from '../../../../actions/position/listPosition';
import { listMajor } from '../../../../actions/major/listMajor';
import { listLevel } from '../../../../actions/level/listLevel';
import { updateUser } from '../../../../actions/user/updateUser';
import { connect } from 'react-redux';
import _ from 'lodash';

const StyledFormControl = styled(FormControl)`
  min-width: 300px;
`;

function UpdateUser({ updatedUser, open, setOpen, listRoom, listPosition, listMajor, listLevel, doListRoom, doListPosition, doListMajor, doListLevel, updateUser, doUpdateUser }) {

  const { t } = useTranslation();
  const { data: { rooms }, error: listRoomError, laoding: listRoomLoading } = listRoom;
  const { data: { positions }, error: listPositionError, laoding: listPositionLoading } = listPosition;
  const { data: { majors }, error: listMajorError, laoding: listMajorLoading } = listMajor;
  const { data: { levels }, error: listLevelError, laoding: listLevelLoading } = listLevel;

  const [room, setRoom] = React.useState(_.find(rooms, { id: _.get(updatedUser, 'room_id', '') }));
  const [position, setPosition] = React.useState(_.find(positions, { id: _.get(updatedUser, 'position_id', '') }));
  const [major, setMajor] = React.useState(_.find(majors, { id: _.get(updatedUser, 'major_id', '') }));
  const [level, setLevel] = React.useState(_.find(levels, { id: _.get(updatedUser, 'level_id', '') }));
  const [description, setDescription] = React.useState(_.get(updatedUser, 'description', ''));
  
  const loading = listRoomLoading || listPositionLoading || listMajorLoading || listLevelLoading;
  const error = listRoomError || listPositionError || listMajorError || listLevelError;

  React.useEffect(() => {
    doListRoom();
    doListPosition();
    doListMajor();
    doListLevel()
  }, [doListRoom, doListPosition, doListMajor, doListLevel]);

  function handleUpdateUser(evt) {
    doUpdateUser({
      userId: _.get(updatedUser, 'id'),
      roomId: _.get(room, 'id'),
      positionId: _.get(position, 'id'),
      majorId: _.get(major, 'id'),
      levelId: _.get(level, 'id'),
      description,
    });
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title={_.get(updatedUser, 'name', '')}
        onConfirm={() => handleUpdateUser()}
      >
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!loading && error === null && (
          <React.Fragment>
            <StyledFormControl fullWidth>
              <InputLabel htmlFor='room-select'>
                {t("views.user_page.modals.update_user.room_select")}
              </InputLabel>
              <Select
                value={room}
                renderValue={room => _.get(room, 'name', '')}
                onChange={evt => setRoom(evt.target.value)}
                inputProps={{
                  name: 'room',
                  id: 'room-select',
                }}
              >
                {rooms.map(room => (
                  <MenuItem value={room} key={room.id}>{_.get(room, 'name', '')}</MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <InputLabel htmlFor='position-select'>
                {t("views.user_page.modals.update_user.position_select")}
              </InputLabel>
              <Select
                value={position}
                renderValue={position => _.get(position, 'name', '')}
                onChange={evt => setPosition(evt.target.value)}
                inputProps={{
                  name: 'position',
                  id: 'position-select',
                }}
              >
                {positions.map(position => (
                  <MenuItem value={position} key={position.id}>{_.get(position, 'name', '')}</MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <InputLabel htmlFor='level-select'>
                {t("views.user_page.modals.update_user.level_select")}
              </InputLabel>
              <Select
                value={level}
                renderValue={level => _.get(level, 'name', '')}
                onChange={evt => setLevel(evt.target.value)}
                inputProps={{
                  name: 'level',
                  id: 'level-select',
                }}
              >
                {levels.map(level => (
                  <MenuItem value={level} key={level.id}>{_.get(level, 'name', '')}</MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <InputLabel htmlFor='major-select'>
                {t("views.user_page.modals.update_user.major_select")}
              </InputLabel>
              <Select
                value={major}
                renderValue={major => _.get(major, 'name', '')}
                onChange={evt => setMajor(evt.target.value)}
                inputProps={{
                  name: 'major',
                  id: 'major-select',
                }}
              >
                {majors.map(major => (
                  <MenuItem value={major} key={major.id}>{_.get(major, 'name', '')}</MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <TextField 
              id='description'
              label={t("views.user_page.modals.update_user.description")}
              value={description}
              onChange={evt => setDescription(evt.target.value)}
              multiline
              rowsMax={4}
              fullWidth
              helperText={<ColorTypo component='span' color='red'>{t("views.user_page.modals.update_user.description_helper", { max_count: 500 })}</ColorTypo>}
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
