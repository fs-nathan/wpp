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
import { listRoom } from '../../../../actions/room/listRoom';
import { connect } from 'react-redux';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import _ from 'lodash';

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

function AllUsersTable({ listRoom, doListRoom, expand, handleExpand, handleSubSlide }) {

  const { t } = useTranslation();
  const [searchPatern, setSearchPatern] = React.useState('');
  const { data: { rooms }, loading, error } = listRoom;

  React.useEffect(() => {
    doListRoom();
  }, [doListRoom]);

  return (
    <Container>
      <Header>
        {loading && <LoadingBox />}
        {error !== null && <ErrorBox />}
        {!loading && error === null && (
          <React.Fragment>
            <div>
              <ColorTypo color='green' uppercase>
                &#9733; {t('views.user_page.right_part.users_table.table_title')}
              </ColorTypo>
              <ColorTypo variant='caption'>
                {t('views.user_page.right_part.users_table.total_user_count', { 
                  user_count: _.reduce(rooms, (totalNumber, room) => {
                    totalNumber += _.get(room, 'number_member', 0);
                    return totalNumber; 
                  }, 0) 
                })} <ColorTypo component='span' variant='caption' color='blue'>{t('views.user_page.right_part.users_table.upgrade_sublabel')}</ColorTypo>
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
                {t('views.user_page.right_part.users_table.create_account_label')}
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
    listRoom: state.room.listRoom,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListRoom: () => dispatch(listRoom()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllUsersTable);
