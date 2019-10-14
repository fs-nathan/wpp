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
`;

const RightHeader = styled.div`
  margin-left: auto;
  & > *:last-child {
    margin-left: 20px;
  }
`;

function DepartmentUserTable({ detailRoom, doDetailRoom }) {

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
            <HeaderButtonGroup handleSearchChange={newSearchPatern => setSearchPatern(newSearchPatern)}/>
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
