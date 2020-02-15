import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, OutlinedInput } from '@material-ui/core';
import ColorTypo from '../../../../components/ColorTypo';
import CustomSelect from '../../../../components/CustomSelect';
import ErrorBox from '../../../../components/ErrorBox';
import LoadingBox from '../../../../components/LoadingBox';
import CustomModal from '../../../../components/CustomModal';
import { useMaxlenString } from '../../../../hooks';
import { get, find } from 'lodash';
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
}) {

  const { t } = useTranslation();

  const [room, setRoom] = React.useState(null);
  const [position, setPosition] = React.useState(null);
  const [major, setMajor] = React.useState(null);
  const [level, setLevel] = React.useState(null);
  const [description, setDescription, errorDescription] = useMaxlenString('', 500);

  React.useEffect(() => {
    if (updatedUser) {
      setRoom(find(options.rooms, { id: get(updatedUser, 'room_id') }));
      setPosition(find(options.positions, { id: get(updatedUser, 'position_id') }));
      setMajor(find(options.majors, { id: get(updatedUser, 'major_id') }));
      setLevel(find(options.levels, { id: get(updatedUser, 'level_id') }));
      setDescription(get(updatedUser, 'description', ''));
    }
  }, [updatedUser]);

  return (
    <React.Fragment>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title={get(updatedUser, 'name', '')}
        canConfirm={!errorDescription}
        onConfirm={() => handleUpdateUser(
          get(updatedUser, 'id'), 
          get(room, 'id'),
          get(position, 'id'),
          get(major, 'id'),
          get(level, 'id'),
          description
        )}
      >
        {options.loading && <LoadingBox />}
        {options.error !== null && <ErrorBox />}
        {!options.loading && options.error === null && (
          <React.Fragment>
            <StyledFormControl fullWidth>
              <label htmlFor='room-select'>
                {t("views.user_page.modals.update_user.room_select")}
              </label>
              <CustomSelect
                options={
                  options.rooms.map(room => ({
                      value: get(room, 'id'),
                      label: get(room, 'name', ''),
                    })
                  )}
                value={{
                  value: get(room, 'id'),
                  label: get(room, 'name', '')
                }}
                onChange={({ value: roomId }) => setRoom(find(options.rooms, { id: roomId }))}
              />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <label htmlFor='position-select'>
                {t("views.user_page.modals.update_user.position_select")}
              </label>
              <CustomSelect
                options={
                  options.positions.map(position => ({
                      value: get(position, 'id'),
                      label: get(position, 'name', ''),
                    })
                  )}
                value={{
                  value: get(position, 'id'),
                  label: get(position, 'name', ''),
                }}
                onChange={({ value: positionId }) => setPosition(find(options.positions, { id: positionId }))}
              />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <label htmlFor='level-select'>
                {t("views.user_page.modals.update_user.level_select")}
              </label>
              <CustomSelect
                options={
                  options.levels.map(level => ({
                      value: get(level, 'id'),
                      label: get(level, 'name', ''),
                    })
                  )}
                value={{
                  value: get(level, 'id'),
                  label: get(level, 'name', ''),
                }}
                onChange={({ value: levelId }) => setLevel(find(options.levels, { id: levelId }))}
              />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <label htmlFor='major-select'>
                {t("views.user_page.modals.update_user.major_select")}
              </label>
              <CustomSelect
                options={
                  options.majors.map(major => ({
                      value: get(major, 'id'),
                      label: get(major, 'name', ''),
                    })
                  )}
                value={{
                  value: get(major, 'id'),
                  label: get(major, 'name', ''),
                }}
                onChange={({ value: majorId }) => setMajor(find(options.majors, { id: majorId }))}
              />
            </StyledFormControl>
            <StyledFormControl fullWidth>
              <label htmlFor='major-select'>
                Mô tả công việc
              </label>
              <OutlinedInput 
                id='description'
                value={description}
                onChange={evt => setDescription(evt.target.value)}
                multiline
                margin="normal"
                variant="outlined"
                rowsMax={4}
                fullWidth
                helperText={
                  <ColorTypo component='span' color='red'>
                    {get(errorDescription, 'message', '')}
                  </ColorTypo>
                }
              />
            </StyledFormControl>
          </React.Fragment>
        )}
      </CustomModal>
    </React.Fragment>
  )
}

export default UpdateUser;
