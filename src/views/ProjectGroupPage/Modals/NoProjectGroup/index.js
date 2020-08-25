import { Button } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomModal from '../../../../components/CustomModal';
import CreateProjectGroupModal from '../CreateProjectGroup';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_ProjectGroup_No_Project_Modal___container ${className}`}
    {...props}
  />;

const StyledButton = ({ className = '', ...props }) =>
  <Button
    className={`view_ProjectGroup_No_Project_Modal___button ${className}`}
    {...props}
  />;

function NoProjectGroup({ open, setOpen }) {

  const { t } = useTranslation();
  const [group, setGroup] = React.useState(false);
  const colors = useSelector(state => state.setting.colors);
  const bgColor = colors.find(item => item.selected === true);

  return (
    <>
      <CustomModal
        title={t(`DMH.VIEW.PGP.MODAL.NOPG.TITLE`)}
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        height='short'
      >
        <Container>
          <span>{t("DMH.VIEW.PGP.MODAL.NOPG.LINE_1")}</span>
          <span>{t("DMH.VIEW.PGP.MODAL.NOPG.LINE_2")}</span>
          <StyledButton
            style={{
              backgroundColor: bgColor.color,
              color: 'white',
            }}
            onClick={evt => {
              setGroup(true);
              setOpen(false);
            }}
          >
            {t("DMH.VIEW.PGP.MODAL.NOPG.BTN")}
          </StyledButton>
        </Container>
      </CustomModal>
      <CreateProjectGroupModal open={group} setOpen={setGroup} />
    </>
  )
}

export default NoProjectGroup;
