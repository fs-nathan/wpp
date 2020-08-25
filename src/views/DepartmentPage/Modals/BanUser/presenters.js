import AlertModal from 'components/AlertModal';
import { BAN_USER_FROM_GROUP, CustomEventDispose, CustomEventListener, DETAIL_ROOM, GET_USER_OF_ROOM, LIST_ROOM, LIST_USER_OF_GROUP } from 'constants/events';
import React from 'react';
import { useTranslation } from 'react-i18next';

function BanUser({
  open, setOpen,
  handleBanUserFromGroup,
  doReloadRoom,
  roomId,
}) {

  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(-1);

  React.useEffect(() => {
    setActiveLoading((activeMask === 3 || activeMask === -1) ? false : true);
    if (activeMask === 3) {
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [activeMask]);

  React.useEffect(() => {
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(BAN_USER_FROM_GROUP.SUCCESS, doReloadRoom);
    CustomEventListener(BAN_USER_FROM_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(BAN_USER_FROM_GROUP.SUCCESS, doReloadRoom);
      CustomEventDispose(BAN_USER_FROM_GROUP.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [roomId]);

  React.useEffect(() => {
    const success = (bit) => () => {
      setActiveMask(oldMask => oldMask | (1 << bit));
    };
    const fail = () => {
      setActiveMask(-1);
    };
    if (roomId === null) {
      CustomEventListener(LIST_ROOM.SUCCESS, success(0));
      CustomEventListener(LIST_USER_OF_GROUP.SUCCESS, success(1));
      CustomEventListener(LIST_ROOM.FAIL, fail);
      CustomEventListener(LIST_USER_OF_GROUP.FAIL, fail);
    } else {
      CustomEventListener(DETAIL_ROOM.SUCCESS, success(0));
      CustomEventListener(GET_USER_OF_ROOM.SUCCESS, success(1));
      CustomEventListener(DETAIL_ROOM.FAIL, fail);
      CustomEventListener(GET_USER_OF_ROOM.FAIL, fail);
    }
    return () => {
      if (roomId === null) {
        CustomEventDispose(LIST_ROOM.SUCCESS, success(0));
        CustomEventDispose(LIST_USER_OF_GROUP.SUCCESS, success(1));
        CustomEventDispose(LIST_ROOM.FAIL, fail);
        CustomEventDispose(LIST_USER_OF_GROUP.FAIL, fail);
      } else {
        CustomEventDispose(DETAIL_ROOM.SUCCESS, success(0));
        CustomEventDispose(GET_USER_OF_ROOM.SUCCESS, success(1));
        CustomEventDispose(DETAIL_ROOM.FAIL, fail);
        CustomEventDispose(GET_USER_OF_ROOM.FAIL, fail);
      }
    }
    // eslint-disable-next-line
  }, [roomId]);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content={t('DMH.VIEW.DP.RIGHT.UT.ALERT')}
      onConfirm={() => {
        handleBanUserFromGroup();
        setActiveMask(0);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  )
}

export default BanUser;
