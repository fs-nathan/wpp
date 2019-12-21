import React, { useEffect } from 'react';
// import styled from 'styled-components';
import ListPart from './ListPart';
import ChatPart from './ChatPart';
import TabPart from './TabPart';
import { connect } from 'react-redux';
import * as taskDetailAction from '../../actions/taskDetail/taskDetailActions'
import '../JobDetailPage/index.scss'

export const WrapperContext = React.createContext(null)
const Wrapper = WrapperContext.Provider

// const Container = styled.div`
//   height: 100%;
//   display: grid;
//   grid-template-rows: auto;
//   grid-template-columns: minmax(200px, 27%) minmax(400px, 44%) minmax(200px, 29%);
//   grid-template-areas: 
//     "list chat tab";
// `;

function JobDetailPage(props) {
    useEffect(() => {
        // props.getProjectGroup()
        props.getProjectListBasic()
        console.log("log thuw")
        // props.getDetailProject(props.projectId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getDataByProjectId = () => {
        props.getRoleTask()
        props.getListGroupTaskByProjectId(props.projectId)
        if (props.projectId !== "")
            props.getListTaskDetailByProjectId(props.projectId)
    }

    const getDataByTaskId = () => {
        props.getSubTaskByTaskId(props.taskId)
        props.getRemindByTaskId(props.taskId)
        props.getOfferByTaskId(props.taskId)
        props.getCommandByTaskId(props.taskId)
        props.getImageByTaskId(props.taskId)
        props.getFileByTaskId(props.taskId)
        props.getLinkByTaskId(props.taskId)
        props.getLocationByTaskId(props.taskId)
        props.getTaskDetailByTaskId(props.taskId)
        props.getMemberByTaskId(props.taskId)
        props.getMemberNotAssignedByTaskId(props.taskId)
        props.getTrackingTime(props.taskId)
    }

    useEffect(getDataByTaskId, [props.taskId])
    useEffect(getDataByProjectId, [props.projectId])

    return (

        <Wrapper value={{ ...props }}>
            <div className="container" >
                <ListPart {...props} />
                <ChatPart {...props} />
                <TabPart {...props} />
            </div>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    // console.log('state project group::::', state.taskDetail.commonTaskDetail.projectListBasic);
    return {
        // offer
        offer: state.taskDetail.taskOffer.offer,

        pendingItems: state.taskDetail.taskOffer.pendingItems,
        approvedItems: state.taskDetail.taskOffer.approvedItems,
        // remind
        remind: state.taskDetail.taskRemind.remind,
        // subtask
        uncompleteSubTasks: state.taskDetail.subTask.uncompleteSubTasks,
        completeSubTasks: state.taskDetail.subTask.completeSubTasks,
        // media
        image: state.taskDetail.media.image,
        file: state.taskDetail.media.file,
        link: state.taskDetail.media.links,
        // command
        command: state.taskDetail.taskCommand.command,
        commandItems: state.taskDetail.taskCommand.commandItems,
        decisionItems: state.taskDetail.taskCommand.decisionItems,
        // fake ID
        taskId: state.taskDetail.commonTaskDetail.activeTaskId,
        projectId: state.taskDetail.commonTaskDetail.activeProjectId,
        // location
        location: state.taskDetail.location.locations,
        // task Detail
        detailTask: state.taskDetail.detailTask.taskDetails,
        listTaskDetail: state.taskDetail.listDetailTask.listTaskDetail,
        // list group task
        listGroupTask: state.taskDetail.listGroupTask.listGroupTask,
        // member 
        member: state.taskDetail.taskMember.member,
        memberNotAssigned: state.taskDetail.taskMember.memberNotAssigned,
        userRoles: state.taskDetail.taskMember.user_roles,

        listTime: state.taskDetail.trackingTime.listTime,
        // project group
        projectGroup: state.taskDetail.commonTaskDetail.projectGroups,
        // project detail
        projectDetail: state.taskDetail.commonTaskDetail.projectDetail,
        // project list basic
        projectListBasic: state.taskDetail.commonTaskDetail.projectListBasic,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // sub-task
        getSubTaskByTaskId: taskId => dispatch(taskDetailAction.getSubTask({ taskId })),
        postSubTaskByTaskId: (taskId, name) => dispatch(taskDetailAction.postSubTask({ task_id: taskId, name })),
        updateSubTaskByTaskId: (subTaskId, name, taskId) => dispatch(taskDetailAction.updateSubTask({ sub_task_id: subTaskId, name, taskId })),
        deleteSubTaskByTaskId: (subTaskId, taskId) => dispatch(taskDetailAction.deleteSubTask({ sub_task_id: subTaskId, taskId: taskId })),
        completeSubTaskByTaskId: (subTaskId, taskId) => dispatch(taskDetailAction.completeSubTask({ sub_task_id: subTaskId, taskId: taskId })),
        // remind
        getRemindByTaskId: taskId => dispatch(taskDetailAction.getRemind({ taskId })),
        createRemindWithTimeDetail: (data) => dispatch(taskDetailAction.postRemindWithTimeDetail(data)),
        createRemindWithDurationDetail: (data) => dispatch(taskDetailAction.postRemindDuration(data)),
        updateRemindWithTimeDetail: ({data, taskId}) => dispatch(taskDetailAction.updateRemindWithTimeDetail({data, taskId})),
        updateRemindWithDurationDetail: ({data, taskId}) => dispatch(taskDetailAction.updateRemindWithDuration({data, taskId})),
        deleteRemindWByRemindId: (remindId, taskId) => dispatch(taskDetailAction.deleteRemind({ remind_id: remindId, taskId: taskId })),
        // offer
        getOfferByTaskId: taskId => dispatch(taskDetailAction.getOffer({ taskId })),
        createOfferByTaskId: ({data, taskId}) => dispatch(taskDetailAction.createOffer({data, taskId})),
        deleteOfferByTaskId: (deleteId, taskId) => dispatch(taskDetailAction.deleteOffer({ offer_id: deleteId, taskId: taskId })),
        updateOfferById: ({offerId, content, taskId}) => dispatch(taskDetailAction.updateOffer({offerId, content, taskId})),
        uploadDocumentToOfferById: (data, cb, taskId) => dispatch(taskDetailAction.uploadDocumentToOffer(data, cb, taskId)),
        deleteDocumentToOfferById: (data, cb, taskId) => dispatch(taskDetailAction.deleteDocumentToOffer(data, cb, taskId)),
        handleOfferById: (data, taskId) => dispatch(taskDetailAction.handleOffer(data, taskId)),
        // command 
        getCommandByTaskId: task_id => dispatch(taskDetailAction.getCommand({ task_id })),
        createCommandByTaskId: (task_id, content, type) => { dispatch(taskDetailAction.createCommand({ task_id, content, type })) },
        updateCommandByTaskId: (id, content, type, taskId) => { dispatch(taskDetailAction.updateCommand({ command_id: id, content, type, taskId })) },
        deleteCommandByCommandId: (command_id, taskId) => dispatch(taskDetailAction.deleteCommand({ command_id, taskId })),
        // Media Image File Link
        getImageByTaskId: taskId => dispatch(taskDetailAction.getImage({ taskId })),
        getFileByTaskId: taskId => dispatch(taskDetailAction.getFileTabPart({ taskId })),
        getLinkByTaskId: taskId => dispatch(taskDetailAction.getLinkTabPart({ taskId })),
        // Location
        getLocationByTaskId: taskId => dispatch(taskDetailAction.getLocationTabPart({ taskId })),
        // Task Detail - cot phai
        getTaskDetailByTaskId: taskId => dispatch(taskDetailAction.getTaskDetailTabPart({ taskId })),
        // update Priority
        updateTaskPriority: (task_id, priority) => dispatch(taskDetailAction.updatePriority({ task_id, priority })),
        // Member
        getMemberByTaskId: task_id => dispatch(taskDetailAction.getMember({ task_id })),
        getMemberNotAssignedByTaskId: task_id => dispatch(taskDetailAction.getMemberNotAssigned({ task_id })),
        createMemberToTask: (task_id, member_id) => dispatch(taskDetailAction.createMember({ task_id, member_id })),
        deleteMemberToTask: (task_id, member_id) => dispatch(taskDetailAction.deleteMember({ task_id, member_id })),
        // Member Priority
        getGroupPermission: () => dispatch(taskDetailAction.getPermission()),
        updateGroupPermission: (data) => dispatch(taskDetailAction.updatePermission(data)),
        // Member Role
        createRoleTask: (name, description) => dispatch(taskDetailAction.createRole({ name, description })),
        updateRoleTask: (user_role_id, name, description) => dispatch(taskDetailAction.updateRole({ user_role_id, name, description })),
        deleteRoleTask: (user_role_id) => dispatch(taskDetailAction.deleteRole({ user_role_id })),
        getRoleTask: () => dispatch(taskDetailAction.getRole()),

        //time
        getTrackingTime: task_id => dispatch(taskDetailAction.getTrackingTime(task_id)),
        updateTimeDuration: dataTime => dispatch(taskDetailAction.updateTimeDuration(dataTime)),
        // List Task Detail
        getListTaskDetailByProjectId: projectId => dispatch(taskDetailAction.getListTaskDetail({ project_id: projectId })),
        createJobByProjectId: (data) => dispatch(taskDetailAction.createTask(data)),
        //  List Group Task
        getListGroupTaskByProjectId: projectId => dispatch(taskDetailAction.getListGroupTask({ project_id: projectId })),
        //edit name and description task
        updateNameDescriptionTask: data => dispatch(taskDetailAction.updateNameDescriptionTask(data)),
        // get project group
        // getProjectGroup: () => dispatch(taskDetailAction.getProjectGroup()),
        getDetailProject: (project_id) => dispatch(taskDetailAction.getProjectDetail(project_id)),
        chooseProject: (project) => dispatch(taskDetailAction.chooseProject(project)),
        chooseTask: (task) => dispatch(taskDetailAction.chooseTask(task)),
        filterTaskByType: (id) => dispatch(taskDetailAction.filterTaskByType(id)),
        searchTask: (data) => { dispatch(taskDetailAction.searchTask(data)) },
        getProjectListBasic: () => dispatch(taskDetailAction.getProjectListBasic()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(JobDetailPage);