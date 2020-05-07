import AlertModal from 'components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_ROOM, LIST_ROOM } from 'constants/events';
import React from 'react';
import { useTranslation } from 'react-i18next';

function RoomDelete({
  open, setOpen,
  handleDeleteRoom,
  doReloadRoom,
}) {

  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(DELETE_ROOM.SUCCESS, doReloadRoom);
    CustomEventListener(DELETE_ROOM.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_ROOM.SUCCESS, doReloadRoom);
      CustomEventDispose(DELETE_ROOM.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_ROOM.SUCCESS, success);
    CustomEventListener(LIST_ROOM.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_ROOM.SUCCESS, success);
      CustomEventDispose(LIST_ROOM.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content={t('DMH.VIEW.DP.LEFT.INFO.ALERT')}
      onConfirm={() => {
        handleDeleteRoom();
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  )
}

export default RoomDelete;
