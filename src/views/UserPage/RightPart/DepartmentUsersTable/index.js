import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Icon from '@mdi/react';
import {
  mdiPlus,
} from '@mdi/js';
import ColorTypo from '../../../../components/ColorTypo';
import HeaderButtonGroup from './HeaderButtonGroup';
import ColorButton from '../../../../components/ColorButton';
import TableMain from './TableMain';
import { detailRoom } from '../../../../actions/room/detailRoom';
import { connect } from 'react-redux';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import _ from 'lodash';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  grid-area: right;
`;

const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 10;
`;

const RightHeader = styled.div`
  margin-left: auto;
  & > *:last-child {
    margin-left: 20px;
  }
`;

function DefaultUserTable({ expand, handleExpand, handleSubSlide }) {

  const [searchPatern, setSearchPatern] = React.useState('');

  return (
    <Container>
      <Header>
        <div>
          <ColorTypo color='green' uppercase>
            &#9733; Mặc định
          </ColorTypo>
        </div>
        <RightHeader>
          <HeaderButtonGroup 
            handleSearchChange={newSearchPatern => setSearchPatern(newSearchPatern)}
            expand={expand}
            handleExpand={handleExpand}
            handleSubSlide={handleSubSlide}
          />
          <ColorButton 
            size='small'
            variantColor='orange' 
            variant='contained'
            startIcon={
              <Icon path={mdiPlus} size={0.8} color={'#fff'} />
            }
          >
            Tạo tài khoản
          </ColorButton>
        </RightHeader> 
      </Header>
      <TableMain searchPatern={searchPatern} />
    </Container>
  );
}

function NormalUserTable({ detailRoom, doDetailRoom, expand, handleExpand, handleSubSlide  }) {

  const { t } = useTranslation();
  const { departmentId } = useParams();
  const [searchPatern, setSearchPatern] = React.useState('');
  const { data: { room }, loading, error } = detailRoom;

  React.useEffect(() => {
    doDetailRoom({
      roomId: departmentId,
    });
  }, [doDetailRoom, departmentId]);

  return (
    <Container>
      <Header>
      {loading && <LoadingBox />}
      {error !== null && <ErrorBox />}
      {!loading && error === null && (
        <React.Fragment>
          <div>
            <ColorTypo color='green' uppercase>
              &#9733; {_.get(room, 'name', '')}
            </ColorTypo>
            <ColorTypo variant='caption'>
              {t('views.user_page.right_part.users_table.total_user_count', { user_count: _.get(room, 'number_member', 0) })}
            </ColorTypo>
          </div>
          <RightHeader>
            <HeaderButtonGroup 
              handleSearchChange={newSearchPatern => setSearchPatern(newSearchPatern)}
              expand={expand}
              handleExpand={handleExpand}
              handleSubSlide={handleSubSlide}
            />
            <ColorButton 
              size='small'
              variantColor='orange' 
              variant='contained'
              startIcon={
                <Icon path={mdiPlus} size={0.8} color={'#fff'} />
              }
            >
              Tạo tài khoản
            </ColorButton>
          </RightHeader> 
        </React.Fragment>
      )}
      </Header>
      <TableMain searchPatern={searchPatern} />
    </Container>
  )
}

function DepartmentUserTable({ ...rest }) {
  const { departmentId } = useParams();

  if (departmentId === 'default') {
    return <DefaultUserTable { ...rest }/>
  } else {
    return <NormalUserTable {...rest} />
  }
}

const mapStateToProps = state => {
  return {
    detailRoom: state.room.detailRoom,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doDetailRoom: ({ roomId }) => dispatch(detailRoom({ roomId })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentUserTable);
