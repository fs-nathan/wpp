import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchOfferTabPart = (e) => {
    dispatch(searchOffer(e.target.value))
  }
  return (
    <React.Fragment>
      <div className="memberTabBody--search">
        <SearchInput
          fullWidth
          placeholder={t('LABEL_CHAT_TASK_NHAP_TU_KHOA')}
          onChange={e => searchOfferTabPart(e)}
        />
      </div>
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