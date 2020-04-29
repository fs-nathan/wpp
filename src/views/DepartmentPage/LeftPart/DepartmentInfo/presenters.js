import { mdiChevronLeft } from '@mdi/js';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ColorButton from '../../../../components/ColorButton';
import ColorTypo from '../../../../components/ColorTypo';
import CustomAvatar from '../../../../components/CustomAvatar';
import { ActionBox, Container, SubContainer } from '../../../../components/CustomDetailBox';
import CustomTextbox from '../../../../components/CustomTextbox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import LoadingBox from '../../../../components/LoadingBox';
import './style.scss';

const LogoBox = ({ className = '', ...props }) => <div className={`view_Department_Info___logo-box ${className}`} {...props} />;

const StyledTextbox = ({ className = '', ...props }) =>
  <CustomTextbox
    className={`view_Department_Info___textbox ${className}`}
    {...props}
  />;

export const DefaultDepartment = ({
  handleGoBack,
}) => {

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <LeftSideContainer
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: handleGoBack,
        }}
        title={t('DMH.VIEW.DP.LEFT.INFO.TITLE')}
      >
        <LogoBox>
          <CustomAvatar style={{ width: 60, height: 60 }} alt="avatar" />
          <ColorTypo uppercase bold color="green" variant="h6">
            {t('DMH.VIEW.DP.LEFT.INFO.DEFAULT')}
          </ColorTypo>
        </LogoBox>
      </LeftSideContainer>
    </React.Fragment>
  );
};

export const NormalDepartment = ({
  viewPermissions,
  room,
  departmentId,
  handleDeleteRoom, handleGoBack,
  handleOpenModal,
}) => {

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <LeftSideContainer
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: handleGoBack,
          tooltip: t('DMH.VIEW.DP.LEFT.INFO.BACK')
        }}
        title={t('DMH.VIEW.DP.LEFT.INFO.TITLE')}
        loading={{
          bool: room.loading,
          component: () => <LoadingBox />
        }}
      >
        <Container>
          <div>
            <SubContainer>
              <LogoBox>
                <CustomAvatar
                  style={{ width: 60, height: 60 }}
                  src={get(room.detail, 'icon')}
                  alt="avatar"
                />
                <ColorTypo uppercase bold color="green" variant="h6">
                  {get(room.detail, 'name', '')}
                </ColorTypo>
                <ColorTypo>
                  {t('DMH.VIEW.DP.LEFT.INFO.NUM_MEM', { members: get(room.detail, 'number_member', 0) })}
                </ColorTypo>
              </LogoBox>
              <ColorTypo uppercase bold color="gray">
                {t('DMH.VIEW.DP.LEFT.INFO.INFO')}
              </ColorTypo>
              <StyledTextbox
                value={get(room.detail, 'description', '')}
                isReadOnly={true}
                maxHeight={200}
              />
            </SubContainer>
          </div>
          {get(viewPermissions.permissions, 'can_modify', false) ? (
            <ActionBox>
              <ColorButton
                onClick={() =>
                  handleOpenModal('UPDATE', {
                    updateDepartment: room.detail
                  })
                }
                variant="text"
                size="small"
                fullWidth
              >
                {t('DMH.VIEW.DP.LEFT.INFO.BTN.UPT')}
              </ColorButton>
              {get(room.detail, 'can_delete', false) && (
                <ColorButton
                  onClick={() =>
                    handleOpenModal('ALERT', {
                      content: t('DMH.VIEW.DP.LEFT.INFO.ALERT'),
                      onConfirm: () => handleDeleteRoom(departmentId)
                    })
                  }
                  variant="text"
                  variantColor="red"
                  size="small"
                  fullWidth
                >
                  {t('DMH.VIEW.DP.LEFT.INFO.BTN.DEL')}
                </ColorButton>
              )}
            </ActionBox>
          ) : null}
        </Container>
      </LeftSideContainer>
    </React.Fragment>
  );
};