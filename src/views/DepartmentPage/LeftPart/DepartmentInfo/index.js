import React from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import ColorButton from '../../../../components/ColorButton';
import CustomAvatar from '../../../../components/CustomAvatar';
import { mdiChevronLeft } from '@mdi/js';
import { connect } from 'react-redux';
import { detailRoom } from '../../../../actions/room/detailRoom';
import { deleteRoom } from '../../../../actions/room/deleteRoom';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import AlertModal from '../../../../components/AlertModal';
import { CustomEventListener, CustomEventDispose, DELETE_ROOM } from '../../../../constants/events.js';
import CreateDepartment from '../../Modals/CreateDepartment';
import { Context as UserPageContext } from '../../index';

const Container = styled.div`
  padding: 0 16px;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-columns: auto; 
`;

const LogoBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const IntroBox = styled.div`
  flex-grow: 1;
`;

const ActionBox = styled.div`
  margin-top: 8px;
  padding: 8px 0 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  & > * {
    text-transform: none;
    justify-content: flex-start;
    & > span:last-child {
      display: none;
    }
    background-color: #fff;
    &:hover {
      background-color: #fff;
    }
  }
`;

function DefaultDepartment({ subSlide, handleSubSlide, subSlideComp: SubSlideComp }) {
  
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {subSlide && <SubSlideComp handleSubSlide={handleSubSlide} />}
      {!subSlide && (
        <LeftSideContainer
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => history.push('/departments')
          }}
          title={t('views.user_page.left_part.department_info.modal_title')}
        >
          <LogoBox>
            <CustomAvatar style={{ width: 60, height: 60 }} alt='avatar' />
            <ColorTypo uppercase bold color='green' variant='h6'>
              {t('views.user_page.left_part.department_info.default')}
            </ColorTypo>
          </LogoBox>
        </LeftSideContainer>
      )}
    </React.Fragment>
  );
}

function NormalDepartment({ detailRoom, doDeleteRoom, subSlide, handleSubSlide, subSlideComp: SubSlideComp }) {
  
  const { setDepartmentId } = React.useContext(UserPageContext);
  const { t } = useTranslation();
  const { departmentId } = useParams();
  const history = useHistory();
  const { data: { room }, error, loading } = detailRoom;
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  React.useEffect(() => {
    setDepartmentId(departmentId);
  }, [setDepartmentId, departmentId]);

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push('/departments');
    };

    CustomEventListener(DELETE_ROOM, historyPushHandler);
    
    return () => {
      CustomEventDispose(DELETE_ROOM, historyPushHandler);
    };
  }, [history]);

  function handleDeleteDepartment(departmentId) {
    doDeleteRoom({ 
      roomId: departmentId,
    });
  }
  
  return (
    <React.Fragment>
      {subSlide && <SubSlideComp handleSubSlide={handleSubSlide} />}
      {!subSlide && (
        <>
          {error !== null && (<ErrorBox />)}
          {error === null && (
            <LeftSideContainer
              leftAction={{
                iconPath: mdiChevronLeft,
                onClick: () => history.push('/departments')
              }}
              title={t('views.user_page.left_part.department_info.modal_title')}
              loading={{
                bool: loading,
                component: () => <LoadingBox />,
              }}
            > 
              <Container>
                <div>
                  <LogoBox>
                    <CustomAvatar style={{ width: 60, height: 60 }} src={get(room, 'icon')} alt='avatar' />
                    <ColorTypo uppercase bold color='green' variant='h6'>
                      {get(room, 'name', '')}
                    </ColorTypo>
                    <ColorTypo>
                      {t('views.user_page.left_part.department_info.member_count', { member_count: get(room, 'number_member', '') })}
                    </ColorTypo>
                  </LogoBox>
                  <ColorTypo uppercase bold color='gray'>
                    {t('views.user_page.left_part.department_info.intro')}
                  </ColorTypo>
                  <IntroBox>
                    <ColorTextField
                      value={get(room, 'description', '')}  
                    />
                  </IntroBox>
                </div>
                <ActionBox>
                  <ColorButton onClick={() => setOpenUpdateModal(true)} variant='text' size='small' fullWidth>
                    {t('views.user_page.left_part.department_info.update')}
                  </ColorButton>
                  <ColorButton onClick={() => setAlert(true)} variant='text' variantColor='red' size='small' fullWidth>
                    {t('views.user_page.left_part.department_info.delete')}
                  </ColorButton>
                </ActionBox>
              </Container>
              <CreateDepartment updateDepartment={room} open={openUpdateModal} setOpen={setOpenUpdateModal} />
              <AlertModal
                open={alert}
                setOpen={setAlert}
                content={t('views.user_page.left_part.department_info.alert_content')}
                onConfirm={() => handleDeleteDepartment(departmentId)}
              />
            </LeftSideContainer>
          )}
        </>
      )}
    </React.Fragment>
  )
}

function DepartmentInfo({ ...rest }) {  
  const { departmentId } = useParams();
  if (departmentId === 'default') {
    return <DefaultDepartment {...rest} />;
  } else {
    return <NormalDepartment {...rest} />
  }
}

const mapStateToProps = state => {
  return {
    detailRoom: state.room.detailRoom,
    deleteRoom: state.room.deleteRoom,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDetailRoom: ({ roomId }, quite) => dispatch(detailRoom({ roomId }, quite)),
    doDeleteRoom: ({ roomId }) => dispatch(deleteRoom({ roomId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentInfo);
