import React from 'react';
import styled from 'styled-components';
import SearchInput from '../../../../../components/SearchInput';
import { useDispatch } from 'react-redux';
import { searchOffer } from '../../../../../actions/taskDetail/taskDetailActions';
import CustomListItem from './CustomListItem';

const StyledList = styled.ul`
  margin-top: 20px;
  padding-inline-start: 0 !important;
  list-style-type: none;
  & > li {
    padding: 8px 0 20px 0;
    border-bottom: 1px solid #dedede;
    margin: 17px 0;
  }
`;

const ListOffer = (props) => {
  const dispatch = useDispatch();
  const searchOfferTabPart = (e) => {
    dispatch(searchOffer(e.target.value))
  }
  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder="Nhập từ khóa"
        onChange={e => searchOfferTabPart(e)}
      />
      <StyledList>
        {props.offer.map((item) => {
          return (
            <CustomListItem
              {...props}
              key={item.id}
              offer={item}
              handleClickDetail={props.onClickDetail}
              handleClickOpen={() => {
                props.handleClickEditItem(item)
              }}
              handleOpenModalDelete={() => {
                props.handleOpenModalDelete(item)
              }}
              handleClickClose={() => props.handleClickClose()} />
          )
        })}
      </StyledList>
    </React.Fragment>
  );
}

export default ListOffer