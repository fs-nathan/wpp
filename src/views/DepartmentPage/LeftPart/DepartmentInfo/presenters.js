import React from 'react';
import { get, isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import ColorButton from '../../../../components/ColorButton';
import CustomAvatar from '../../../../components/CustomAvatar';
import {
  Container,
  SubContainer,
  ActionBox
} from '../../../../components/CustomDetailBox';
import { mdiChevronLeft } from '@mdi/js';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import './style.scss';

const LogoBox = ({ className = '', ...props }) => <div className={`view_Department_Info___logo-box ${className}`} {...props} />;

const IntroBox = ({ className = '', ...props }) => <div className={`view_Department_Info___intro-box ${className}`} {...props} />;

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
        title={t('views.user_page.left_part.department_info.modal_title')}
      >
        <LogoBox>
          <CustomAvatar style={{ width: 60, height: 60 }} alt="avatar" />
          <ColorTypo uppercase bold color="green" variant="h6">
            {t('views.user_page.left_part.department_info.default')}
          </ColorTypo>
        </LogoBox>
      </LeftSideContainer>
    </React.Fragment>
  );
};

export const NormalDepartment = ({ 
  room, 
  departmentId,
  handleDeleteRoom, handleGoBack,
  handleOpenModal,
}) => {
  
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {isNil(room.error) 
      ? (
        <LeftSideContainer
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: handleGoBack,
            tooltip: 'Quay lại'
          }}
          title={t('views.user_page.left_part.department_info.modal_title')}
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
                    Số nhân sự: {get(room.detail, 'number_member', 0)} thành viên
                  </ColorTypo>
                </LogoBox>
                <ColorTypo uppercase bold color="gray">
                  {t('views.user_page.left_part.department_info.intro')}
                </ColorTypo>
                <IntroBox>
                  <ColorTextField value={get(room.detail, 'description', '')} />
                </IntroBox>
              </SubContainer>
            </div>
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
                {t('views.user_page.left_part.department_info.update')}
              </ColorButton>
              <ColorButton
                onClick={() => 
                  handleOpenModal('ALERT', {
                    content: "Bạn chắc chắn muốn xóa bộ phận?",
                    onConfirm: () => handleDeleteRoom(departmentId)
                  })
                }
                variant="text"
                variantColor="red"
                size="small"
                fullWidth
              >
                {t('views.user_page.left_part.department_info.delete')}
              </ColorButton>
            </ActionBox>
          </Container>
        </LeftSideContainer>
      ) : <ErrorBox />}
    </React.Fragment>
  );
};