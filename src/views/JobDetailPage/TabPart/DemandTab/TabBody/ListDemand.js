import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import { deleteCommand, updateCommand, searchDemand } from '../../../../../actions/taskDetail/taskDetailActions';
import DemandModal from '../DemandModal';
import ModalDeleteConfirm from '../../ModalDeleteConfirm';
import SearchInput from '../../../../../components/SearchInput';
import CustomListItem from './CustomListItem';

const StyledList = styled.ul`
  margin-top: 20px;
  padding-inline-start: 0 !important;
  list-style-type: none;
  & > li {
    padding: 8px 0;
  }
`;

const ListDemand = props => {
  const dispatch = useDispatch();
  const taskId = useSelector(taskIdSelector);
  const [open, setOpen] = React.useState(false);
  const [isEditDemand] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState({
    content: '',
    type: -1
  });
  const handleClickEditItem = item => {
    setSelectedItem(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
    dispatch(deleteCommand({ command_id:selectedItem.id, task_id:taskId }))
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
  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder="Nhập từ khóa..."
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
              {...props}
            />
          );
        })}
      </StyledList>

      {/* modal chi dao quyet dinh */}
      <DemandModal
        isOpen={open}
        handleClose={handleClose}
        // handleOpen={handleClickOpen}
        isEditDemand={isEditDemand}
        item={selectedItem}
        confirmUpdateCommand={confirmUpdateCommand}
      />
      <ModalDeleteConfirm
        confirmDelete={confirmDelete}
        isOpen={isOpenDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        handleOpenModalDelete={handleOpenModalDelete}
        {...props}
      />
    </React.Fragment>
  );
};

export default ListDemand