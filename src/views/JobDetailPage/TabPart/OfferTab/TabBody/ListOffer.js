import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { searchOffer } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';
import CustomListItem from './CustomListItem';

const StyledList = styled.ul`
  margin-top: 20px;
  padding-inline-start: 0 !important;
  list-style-type: none;
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