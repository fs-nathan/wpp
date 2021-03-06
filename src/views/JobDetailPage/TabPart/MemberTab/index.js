import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';
import styled from 'styled-components'
import {useDispatch} from "react-redux";
import {threadChatCreatePrivateReset} from "../../../../actions/taskDetail/taskDetailActions";
import { getMember } from 'actions/taskDetail/taskDetailActions';
import { useSelector } from 'react-redux';

const Header = styled(TabHeader)`
  grid-area: header;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 999;
`
function MemberTab({ show, setShow }) {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  React.useEffect(() => {
    dispatch(threadChatCreatePrivateReset());
  }, [dispatch]);

  React.useEffect(() => {
    if (show === 8) {
      dispatch(getMember({ task_id: taskId, group_by_role: true }))
    }
  }, [show]);

  return (
    <Slide in={show === 8}  mountOnEnter unmountOnExit>
      <div className="container-tabpart">
        <Header setShow={setShow} />
        <TabBody />
      </div>
    </Slide>
  )
}

export default MemberTab;
