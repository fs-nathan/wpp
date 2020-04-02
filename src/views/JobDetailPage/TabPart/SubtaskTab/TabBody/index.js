import { InputBase } from '@material-ui/core';
import { mdiSend } from '@mdi/js';
import Icon from '@mdi/react';
import { postSubTask, searchSubTask } from 'actions/taskDetail/taskDetailActions';
import ColorTypo from 'components/ColorTypo';
import SearchInput from 'components/SearchInput';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import SubTaskDetailDialog from '../SubTaskDetailDialog';
import AllSubtaskList from './AllSubtaskList';
import { ButtonIcon } from './AllSubtaskListItem';
import FinishedSubtaskList from './FinishedSubtaskList';
import './styles.scss';

const Container = styled.div`
  padding: 0 0 50px 0;
`;

const NewWork = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  border-top: 1px solid rgba(0, 0, 0, .1);
  align-item: center;
  margin-bottom: 12px;

`
const InputText = styled(InputBase)`
  padding-left: 16px;
  font-size: 16px;
  align-item: center;
  width: 100%;
`
const Div = styled.div`
  margin: 10px 20px;
`

function TabBody(props) {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const uncompleteSubTasks = useSelector(state => state.taskDetail.subTask.uncompleteSubTasks);
  const completeSubTasks = useSelector(state => state.taskDetail.subTask.completeSubTasks);
  const isNoSubTask = (uncompleteSubTasks.length + completeSubTasks.length) === 0;
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const setStateSubTask = (e) => {
    // let newData = JSON.parse(JSON.stringify(data))
    // newData.name = e.target.value/
    // setData(newData)
    setName(e.target.value)
  }

  const createSubTask = (taskId, name) => {
    dispatch(postSubTask({ task_id: taskId, name }))
    setName("")
  }
  const searchSubTaskTabPart = (e) => {
    dispatch(searchSubTask(e.target.value))
  }
  function onClickItem(item) {
    setSelectedItem(item)
    setOpen(true)
  }
  return (
    <Scrollbars className="subTaskBody"
      renderView={props => <div {...props} className="subTaskBody--container" />}
      autoHide autoHideTimeout={500} autoHideDuration={200}>
      <Container>
        {props.isClicked ?
          <NewWork>
            <InputText
              inputProps={{ 'aria-label': 'naked' }}
              placeholder={'Nhập tên công việc...'}
              onChange={setStateSubTask}
              value={name}
            />
            <ButtonIcon
              style={{ paddingBottom: 9, marginRight: 14 }}
              onClick={() => {
                createSubTask(taskId, name)
              }}>
              <abbr title="Thêm">
                <Icon path={mdiSend} size={1} color={'gray'} />
              </abbr>
            </ButtonIcon>
          </NewWork>
          :
          <Div>
            <SearchInput
              placeholder={'Nhập từ khóa'}
              onChange={e => searchSubTaskTabPart(e)}
            />
          </Div>
        }
        {isNoSubTask ?
          <NoDataPlaceHolder
            src="/images/no-subtask.png"
            title="Chưa có công việc con được khởi tạo Click + để tạo mới công việc con"
          />
          :
          <React.Fragment>
            <ColorTypo className="subTaskBody--title">Đang thực hiện({uncompleteSubTasks.length})</ColorTypo>
            <AllSubtaskList {...props} setSelectedItem={onClickItem} />
            <ColorTypo className="subTaskBody--title">Đã hoàn thành({completeSubTasks.length})</ColorTypo>
            <FinishedSubtaskList {...props} setSelectedItem={onClickItem} />
          </React.Fragment>}
        <SubTaskDetailDialog
          isOpen={open}
          setOpen={setOpen}
          item={selectedItem}
        >

        </SubTaskDetailDialog>
      </Container>
    </Scrollbars>
  )
}

export default TabBody;
