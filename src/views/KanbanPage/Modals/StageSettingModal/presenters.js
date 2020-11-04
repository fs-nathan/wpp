import React from 'react';
import CustomModal from 'components/CustomModal';
import CustomAvatar from 'components/CustomAvatar';
import TitleSectionModal from 'components/TitleSectionModal';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { mdiPlusCircle } from "@mdi/js";
import Icon from '@mdi/react';
import './style.scss';
import 'views/CalendarPage/views/Modals/CreatePersonalRemind/style.scss';

const Title = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_StageSetting___title ${className}`}
    {...props}
  />

const SubTitle = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_StageSetting___sub-title ${className}`}
    {...props}
  />

const ManagersBox = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_StageSetting___managers ${className}`}
    {...props}
  />

const Manager = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_StageSetting___manager ${className}`}
    {...props}
  />

function StageSetting({
  open, setOpen,
  stageName,
  groupTask,
  managers,
  bgColor,
  index,
  handleOpenModal,
}) {

  const { t } = useTranslation();

  function toLowerCase(str) {
    if (typeof(str) === "string") return str.toLowerCase();
    else return "";
  }

  return (
    <React.Fragment>
      <CustomModal
        className="view_CreatPeronsalRemind_container"
        title={`${t("IDS_WP_SETUP")} ${stageName}`}
        open={open}
        setOpen={setOpen}
        canConfirm={true}
        onConfirm={() => setOpen(false)}
        onCancle={() => setOpen(false)}
        loading={false}
        activeLoading={false}
        manualClose={true}
      >
        <SubTitle>{`${stageName} ${index}`}</SubTitle>
        <Title>{get(groupTask, 'name', '')}</Title>
        <TitleSectionModal label={`${t("IDS_WP_MANAGER")} ${toLowerCase(stageName)}`} isRequired />
        <ManagersBox className="remind_setting_userAssignBox">
          {managers.map((manager, idx) => (
            <Manager className="remind_setting_userAssignItem" key={idx}>
              <CustomAvatar style={{ width: 20, height: 20 }} src={get(manager, 'avatar')} alt="manager" />
              <span>{get(manager, 'name')}</span>
            </Manager>
          ))}
          <Button
            color="primary"
            startIcon={<Icon path={mdiPlusCircle} size={0.8} color={bgColor.color} />}
            onClick={() => handleOpenModal('ADD_MANAGER')}
            className="remind_setting_userAssignBox_buttonAdd"
          >
            <span className="remind_setting_userAssignBox_buttonAdd_title">{t('IDS_WP_COMMON_ADD')}</span>
          </Button>
        </ManagersBox>
      </CustomModal>
    </React.Fragment>
  )
}

export default StageSetting;
