import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import { CREATE_GROUP_TASK, CustomEventDispose, CustomEventListener, GET_ALL_GROUP_TASK, LIST_GROUP_TASK, UPDATE_GROUP_TASK } from 'constants/events';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

function CreateNewOrUpdateGroupTask({
  open, setOpen,
  curGroupTask,
  setOpenModal,
  handleCreateOrUpdateGroupTask,
  doReload,
  projectId,
}) {

  const { t } = useTranslation();

  const [name, setName, errorName] = useRequiredString('', 100);
  const [description, setDescription] = useMaxlenString('', 200);

  React.useEffect(() => {
    if (curGroupTask) {
      setName(get(curGroupTask, 'name'));
      setDescription(get(curGroupTask, 'description'));
    }
    // eslint-disable-next-line
  }, [curGroupTask]);

  const [activeLoading, setActiveLoading] = React.useState(false);
  const [activeMask, setActiveMask] = React.useState(-1);

  React.useEffect(() => {
    setActiveLoading((!(activeMask === 3 || activeMask === -1)));
    if (activeMask === 3) {
      setOpen(false);
      setOpenModal(false, true)
      setName('');
      setDescription('');
    }
    // eslint-disable-next-line
  }, [activeMask]);

  React.useEffect(() => {
    const fail = () => {
      setActiveMask(-1);
    };
    const success = () => {
      setActiveMask(3);
      doReload();
    }
    if (curGroupTask) {
      CustomEventListener(UPDATE_GROUP_TASK.SUCCESS, success);
      CustomEventListener(UPDATE_GROUP_TASK.FAIL, fail);
    } else {
      CustomEventListener(CREATE_GROUP_TASK.SUCCESS, success);
      CustomEventListener(CREATE_GROUP_TASK.FAIL, fail);
    }
    return () => {
      if (curGroupTask) {
        CustomEventDispose(UPDATE_GROUP_TASK.SUCCESS, success);
        CustomEventDispose(UPDATE_GROUP_TASK.FAIL, fail);
      } else {
        CustomEventDispose(CREATE_GROUP_TASK.SUCCESS, success);
        CustomEventDispose(CREATE_GROUP_TASK.FAIL, fail);
      }
    }
    // eslint-disable-next-line
  }, [projectId, curGroupTask]);

  React.useEffect(() => {
    const success = bit => () => {
      setActiveMask(oldMask => oldMask | (1 << bit));
    };
    const fail = () => {
      setActiveMask(-1);
    };
    CustomEventListener(LIST_GROUP_TASK.SUCCESS, success(0));
    CustomEventListener(GET_ALL_GROUP_TASK.SUCCESS, success(1));
    CustomEventListener(LIST_GROUP_TASK.FAIL, fail);
    CustomEventListener(GET_ALL_GROUP_TASK.FAIL, fail);
    return () => {
      CustomEventListener(LIST_GROUP_TASK.SUCCESS, success(0));
      CustomEventListener(GET_ALL_GROUP_TASK.SUCCESS, success(1));
      CustomEventListener(LIST_GROUP_TASK.FAIL, fail);
      CustomEventListener(GET_ALL_GROUP_TASK.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectId, curGroupTask]);

  return (
    <CustomModal
      title={curGroupTask ? t("DMH.VIEW.PP.MODAL.CUGT.U_TITLE") : t("DMH.VIEW.PP.MODAL.CUGT.C_TITLE")}
      open={open}
      setOpen={setOpen}
      canConfirm={!errorName}
      onConfirm={() => {
        handleCreateOrUpdateGroupTask(name, description)
        setActiveMask(0);
      }}
      onCancle={() => setOpen(false)}
      activeLoading={activeLoading}
      manualClose={true}
      height={"mini"}
    >
      <CustomTextbox
        label={t("DMH.VIEW.PP.MODAL.CUGT.NAME")}
        value={name}
        onChange={value => setName(value)}
        fullWidth
        required={true}
      />
      <CustomTextbox
        label={t("DMH.VIEW.PP.MODAL.CUGT.DESC")}
        value={description}
        onChange={value => setDescription(value)}
        fullWidth
        multiline={true}
      />
    </CustomModal>
  )
}

export default CreateNewOrUpdateGroupTask;