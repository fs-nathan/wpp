import { deleteCommand, searchDemand, updateCommand } from 'actions/taskDetail/taskDetailActions';
import AlertModal from 'components/AlertModal';
import SearchInput from 'components/SearchInput';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { taskIdSelector } from '../../../selectors';
import DemandModal from '../DemandModal';
import CustomListItem from './CustomListItem';
import DemandDetail from './DemandDetail';

const StyledList = styled.ul`
  margin-top: 20px;
  padding-inline-start: 0 !important;
  list-style-type: none;
  & > li {
    padding: 8px 0;
  }
`;

const ListDemand = props => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const [open, setOpen] = React.useState(false);
  const [isEditDemand] = React.useState(true);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({
    content: '',
    type: -1
  });
  const handleClickEditItem = item => {
    setSelectedItem(item);
    setOpen(true);
  };

  const [isOpenDelete, setOpenDelete] = React.useState(false);
  const handleOpenModalDelete = item => {
    setOpenDelete(true);
    setSelectedItem({ ...item, command_id: item.id });
    // setAnchorEl(null);
  };
  const handleCloseModalDelete = () => {
    setOpenDelete(false);
  };
  const confirmDelete = () => {
    // console.log('tempSelectedItem', taskId)
    dispatch(deleteCommand({ command_id: selectedItem.id, task_id: taskId }))
  };
  const confirmUpdateCommand = ({ id, content, type }) => {
    dispatch(
      updateCommand({
        command_id: id,
        content,
        type,
        taskId
      })
    )
  };
  const searchDemandTabPart = e => {
    dispatch(searchDemand(e.target.value))
  };

  function onClickDetail(item) {
    return () => {
      setSelectedItem({ ...item, offer_id: item.id })
      setOpenDetail(true)
    }
  }
  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder={t('LABEL_CHAT_TASK_NHAP_TU_KHOA')}
        onChange={e => searchDemandTabPart(e)}
      />
      <StyledList>
        {props.activeArr.map((item, index) => {
          return (
            <CustomListItem
              activeArr={item}
              key={index}
              isDemand={item.type !== 0}
              handleClickOpen={() => handleClickEditItem(item)}
              handleOpenModalDelete={() => handleOpenModalDelete(item)}
              item={item}
              onClickDetail={onClickDetail(item)}
              {...props}
            />
          );
        })}
      </StyledList>

      {/* modal chi dao quyet dinh */}
      <DemandModal
        isOpen={open}
        setOpen={setOpen}
        isEditDemand={isEditDemand}
        item={selectedItem}
        confirmUpdateCommand={confirmUpdateCommand}
      />
      <AlertModal
        open={isOpenDelete}
        setOpen={setOpenDelete}
        content={t('IDS_WP_ALERT_CONTENT')}
        onConfirm={confirmDelete}
      />
      <DemandDetail
        isOpen={openDetail}
        setOpen={setOpenDetail}
        item={selectedItem}
      />
    </React.Fragment>
  );
};

export default ListDemand