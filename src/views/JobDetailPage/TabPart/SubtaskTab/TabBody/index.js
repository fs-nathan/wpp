import { InputBase } from '@material-ui/core';
import { mdiSend } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
// import avatar from '../../../../../assets/avatar.jpg';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { postSubTask, searchSubTask } from '../../../../../actions/taskDetail/taskDetailActions';
import ColorTypo from '../../../../../components/ColorTypo';
import SearchInput from '../../../../../components/SearchInput';
import colorPal from '../../../../../helpers/colorPalette';
import NoDataPlaceHolder from '../../NoDataPlaceHolder';
import AllSubtaskList from './AllSubtaskList';
import { ButtonIcon } from './AllSubtaskListItem';
import FinishedSubtaskList from './FinishedSubtaskList';
import './styles.scss';


const Container = styled.div`
  padding: 0 0 50px 0;
`;


const TextTitle = styled(ColorTypo)`
  font-size: 16px;
  color: ${colorPal['gray'][0]};
  margin-left: 30pxreact-beautiful-dnd
`

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
        {isNoSubTask ? <NoDataPlaceHolder
          src="/images/no-subtask.png"
          title="Chưa có công việc con được khởi tạo Click + để tạo mới công việc con"
        ></NoDataPlaceHolder>
          :
          <React.Fragment>
            <TextTitle className="subTaskBody--title">Đang thực hiện({uncompleteSubTasks.length})</TextTitle>
            <AllSubtaskList {...props} />
            <TextTitle className="subTaskBody--title">Đã hoàn thành({completeSubTasks.length})</TextTitle>
            <FinishedSubtaskList {...props} />
          </React.Fragment>}
      </Container>
    </Scrollbars>
  )
}

export default TabBody;
